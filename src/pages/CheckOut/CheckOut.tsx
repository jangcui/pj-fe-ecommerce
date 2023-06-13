import classNames from 'classnames/bind'
import styles from './CheckOut.module.scss'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import * as httpRequest from '~/untils/httpRequest'
import Image from '~/components/Image/Image'
import config from '~/config/config'
import { AppDispatch, RootState } from '~/store/store'
import { checkout, createOrder, emptyCart, getCarts } from '~/features/customers/customerService'
import images from '~/assets/images'
import logo from '~/assets/images/logo.png'
import InputCustom from '~/components/InputCustom/InputCustom'
import { ShippingInfo } from '~/types/orderStage'
const cx = classNames.bind(styles)

interface OrderType {
   productId: string
   color: string
   quantity: number
   price: number
}

const checkOutSchema = Yup.object().shape({
   first_name: Yup.string().required('Fist name is required'),
   last_name: Yup.string().required('Last name is required'),
   address: Yup.string().required('Address is required'),
   city: Yup.string().required('City is required'),
   state: Yup.string().required('State is required'),
   other: Yup.string(),
   pin_code: Yup.number().positive().integer().required('Pin code is required'),
   country: Yup.string().required('Country is required'),
})

function CheckOut() {
   const dispatch = useDispatch<AppDispatch>()
   const { cartList, totalPrice, user } = useSelector((state: RootState) => state.customer)
   const [shippingPrice, setShippingPrice] = useState<number>(5)
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const navigate = useNavigate()
   const [shippingInfo, setShippingInfo] = useState<ShippingInfo>()
   const [orderItem, setOrderItem] = useState<OrderType[]>([])

   useEffect(() => {
      if (!user) {
         navigate('/login')
      } else {
         dispatch(getCarts())
      }
   }, [user, navigate, dispatch])

   useEffect(() => {
      const itemOrder = cartList?.map((item) => ({
         productId: item.productId?._id || '',
         color: item.color?._id || '',
         quantity: item.quantity || 0,
         price: item.productId?.price || 0,
      }))
      console.log(itemOrder), setOrderItem(itemOrder)
   }, [cartList])

   const formik = useFormik({
      initialValues: {
         first_name: '',
         last_name: '',
         other: '',
         address: '',
         city: '',
         state: '',
         pin_code: '',
         country: '',
      },
      validationSchema: checkOutSchema,
      onSubmit: async () => {
         setIsLoading(true)
         await handleCheckOut()
      },
   })
   useEffect(() => {
      setShippingInfo({ ...formik.values })
   }, [formik.values])

   function loadScript(src: any) {
      return new Promise((resolve) => {
         const script = document.createElement('script')
         script.src = src
         script.onload = () => {
            resolve(true)
         }
         script.onerror = () => {
            resolve(false)
         }
         document.body.appendChild(script)
      })
   }

   const handleCheckOut = async () => {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      if (!res) {
         alert('Razorpay SDK failed to load. Are you online?')
         return
      }
      const result = await dispatch(checkout({ amount: totalPrice + shippingPrice }))
      if (!result) {
         toast.error('Some thing went wrong, please try again')
         return
      }
      const { amount, id: order_id, currency } = result.payload.order

      const options = {
         key: 'rzp_test_ROJNShWydm5owR',
         amount: amount,
         currency: currency,
         name: 'Digitic.',
         description: 'Test Transaction',
         image: { logo },
         order_id: order_id,
         handler: async function (response: any) {
            const data = {
               order_creation_id: order_id,
               razor_pay_payment_id: response.razorpay_payment_id,
               razor_pay_order_id: response.razorpay_order_id,
            }
            await httpRequest.post('user/order/payment-verify', data)
            const result = await dispatch(
               createOrder({
                  total_price: totalPrice,
                  total_price_after_discount: totalPrice,
                  shippingInfo: shippingInfo ? shippingInfo : formik.values,
                  orderItems: orderItem,
                  paymentInfo: data,
               }),
            )
            if (result.payload.success === true) {
               formik.resetForm()
               navigate('/order')
               dispatch(emptyCart())
               dispatch(getCarts())
            }
            setIsLoading(false)
         },
         prefill: {
            name: 'Tung Phan',
            email: 'majdjtu@gmail.com',
            contact: '+84 84 666 9107',
         },
         notes: {
            address: 'Tung Phan Office',
         },
         theme: {
            color: '#61dafb',
         },
      }
      const paymentObject: any = new window.Razorpay(options)
      paymentObject.open()
   }
   return (
      <>
         <ChangeTitle title={'Check out'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <form className={cx('detail')} onSubmit={formik.handleSubmit}>
                  <div className={cx('btn-back')}>
                     <Button to={config.routes.cart} text leftIcon={<BsArrowLeft className={cx('icon')} />}>
                        Back to cart
                     </Button>
                  </div>
                  <h2 className={cx('title')}> Dev Corner</h2>
                  <h3> Contact Information</h3>
                  <p className={cx('email')}>Tung Phan (tungphan12h@gmail.com)</p>
                  <div>
                     <select
                        className={cx('btn-select')}
                        name=""
                        value={formik.values.country}
                        onChange={formik.handleChange('country')}
                        onBlur={formik.handleBlur('country')}
                     >
                        <option value="">---Select Country---</option>
                        <option value="VietNam">VietNam</option>
                     </select>

                     {formik.touched.country && formik.errors.country ? (
                        <span className={cx('error')}>{formik.errors.country}</span>
                     ) : null}
                  </div>
                  <div className={cx('wrap-input')}>
                     <div className={cx('input-field')}>
                        <InputCustom
                           value={formik.values.first_name}
                           onChange={formik.handleChange('first_name')}
                           onBlur={formik.handleBlur('first_name')}
                           className={cx('input')}
                           placeholder={'Fist Name'}
                        />

                        {formik.touched.first_name && formik.errors.first_name ? (
                           <span className={cx('error')}>{formik.errors.first_name}</span>
                        ) : null}
                     </div>
                     <div className={cx('input-field')}>
                        <InputCustom
                           value={formik.values.last_name}
                           onChange={formik.handleChange('last_name')}
                           onBlur={formik.handleBlur('last_name')}
                           className={cx('input')}
                           placeholder={'Last Name'}
                        />

                        {formik.touched.last_name && formik.errors.last_name ? (
                           <span className={cx('error')}>{formik.errors.last_name}</span>
                        ) : null}
                     </div>
                  </div>
                  <div>
                     <InputCustom
                        value={formik.values.address}
                        onChange={formik.handleChange('address')}
                        onBlur={formik.handleBlur('address')}
                        className={cx('input')}
                        placeholder={'Address'}
                     />

                     {formik.touched.address && formik.errors.address ? (
                        <span className={cx('error')}>{formik.errors.address}</span>
                     ) : null}
                  </div>
                  <InputCustom
                     value={formik.values.other || ''}
                     onChange={formik.handleChange('other')}
                     onBlur={formik.handleBlur('other')}
                     className={cx('input')}
                     placeholder={'Apartment, Suite, ect,...'}
                  />

                  <div className={cx('wrap-input')}>
                     <div className={cx('input-field')}>
                        <InputCustom
                           value={formik.values.city}
                           onChange={formik.handleChange('city')}
                           onBlur={formik.handleBlur('city')}
                           className={cx('input')}
                           placeholder={'City'}
                        />

                        {formik.touched.city && formik.errors.city ? (
                           <span className={cx('error')}>{formik.errors.city}</span>
                        ) : null}
                     </div>
                     <div>
                        <select
                           className={cx('btn-select')}
                           name=""
                           value={formik.values.state}
                           onChange={formik.handleChange('state')}
                           onBlur={formik.handleBlur('state')}
                        >
                           <option value="">---Select Country---</option>
                           <option value="Hanoi">Ha Nội</option>
                           <option value="HoChiMinh">Hồ Chí Minh</option>
                           <option value="ThaiBinh">Thái Bình</option>
                        </select>

                        {formik.touched.state && formik.errors.state ? (
                           <span className={cx('error')}>{formik.errors.state}</span>
                        ) : null}
                     </div>

                     <div className={cx('input-field')}>
                        <InputCustom
                           value={formik.values.pin_code}
                           onChange={formik.handleChange('pin_code')}
                           onBlur={formik.handleBlur('pin_code')}
                           className={cx('input')}
                           placeholder={'Pin Code'}
                        />
                        {formik.touched.pin_code && formik.errors.pin_code ? (
                           <span className={cx('error')}>{formik.errors.pin_code}</span>
                        ) : null}
                     </div>
                  </div>
                  <div className={cx('wrap-input')}>
                     <Button to={config.routes.home} primary className={cx('btn-country')}>
                        Country to shipping
                     </Button>
                     <Button type={'submit'} primary className={cx('btn-country')} lazyLoad={isLoading}>
                        Order
                     </Button>
                  </div>
               </form>
               <div className={cx('product')}>
                  <div className={cx('wrap-product')}>
                     {cartList &&
                        cartList?.map((item, index) => (
                           <div className={cx('info')} key={index}>
                              <div className={cx('wrap-img')}>
                                 <Image
                                    src={
                                       item?.productId?.images?.[0]?.url
                                          ? item?.productId?.images?.[0]?.url
                                          : images.errorImage
                                    }
                                    className={cx('img')}
                                 />
                                 <span className={cx('count')}>{item.quantity}</span>
                                 <span className={cx('wrap-name')}>
                                    <p className={cx('name-prod')}>{item.productId?.title}</p>
                                    <p dangerouslySetInnerHTML={{ __html: item.productId?.description as string }}></p>
                                    <p className={cx('color')} style={{ backgroundColor: item.color?.title }}></p>
                                 </span>
                              </div>
                              <span className={cx('price')}>${item.productId?.price} </span>
                           </div>
                        ))}
                  </div>
                  <div className={cx('calculate')}>
                     <div className={cx('field')}>
                        <span className={cx('type')}>Subtotal</span>
                        <span className={cx('price')}>${totalPrice}</span>
                     </div>{' '}
                     <div className={cx('field')}>
                        <span className={cx('type')}>Shipping</span>
                        <span className={cx('price')}>${shippingPrice}</span>
                     </div>
                  </div>
                  <div className={cx('field')}>
                     <b className={cx('type')}>Total:</b>
                     <b className={cx('price')}>${(totalPrice as number) + shippingPrice}</b>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default CheckOut
