import classNames from 'classnames/bind'
import styles from './CheckOut.module.scss'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import * as httpRequest from '~/untils/httpRequest'
import Image from '~/components/Image/Image'
import config from '~/routes/config/config'
import { AppDispatch, RootState } from '~/redux/store'
import images from '~/assets/images'
import logo from '~/assets/images/logo.png'
import InputCustom from '~/components/InputCustom'
import { emptyCart, getCart } from '~/redux/features/user/cart/cartService'
import { OrderType, checkOut, createOrder } from '~/redux/features/user/order/orderService'

const cx = classNames.bind(styles)

const checkOutSchema = Yup.object().shape({
   first_name: Yup.string().required('First name is required'),
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
   const { isLogin, user } = useSelector((state: RootState) => state.auth)
   const { productList, totalPrice } = useSelector((state: RootState) => state.cartData)
   const [shippingPrice, setShippingPrice] = useState<number>(5)
   const [isLoading, setIsLoading] = useState<boolean>(false)

   const navigate = useNavigate()

   const [orderItem, setOrderItem] = useState<OrderType[]>([])

   useEffect(() => {
      if (!isLogin) {
         navigate('/login')
      } else {
         dispatch(getCart())
      }
   }, [isLogin, navigate, dispatch])

   useEffect(() => {
      const itemOrder = productList?.map((item) => ({
         productId: item.productId?._id,
         color: item.color._id,
         quantity: item.quantity,
         price: item.price,
      }))
      setOrderItem([...itemOrder])
   }, [productList])

   const formik = useFormik({
      initialValues: {
         first_name: user.first_name,
         last_name: user.last_name,
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
      const result = await dispatch(checkOut({ amount: totalPrice + shippingPrice }))
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
                  shippingInfo: formik.values,
                  orderItems: orderItem,
                  paymentInfo: data,
               }),
            )
            if (result.payload.success === true) {
               formik.resetForm()
               navigate('/order')
               dispatch(emptyCart())
               dispatch(getCart())
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
         <div className={cx('wrapper', 'row w-100 m-0 justify-content-center')}>
            <div className={cx('container', 'col-12 row flex-md-row row-cols-1 row-cols-md-2 flex-column-reverse ')}>
               <div className="col p-5">
                  <form className={cx('detail')} onSubmit={formik.handleSubmit}>
                     <Button
                        className={cx('btn-back', 'mb-4')}
                        to={config.routes.cart}
                        text
                        leftIcon={<BsArrowLeft className={cx('icon')} />}
                     >
                        Back to cart
                     </Button>
                     <h2 className="fs-2 fw-bold mb-5">Check Out</h2>
                     <div className="mb-4">
                        <select
                           className="form-select fs-3"
                           name=""
                           value={formik.values.country}
                           onChange={formik.handleChange('country')}
                           onBlur={formik.handleBlur('country')}
                        >
                           <option value="">Select</option>
                           <option value="VietNam">VietNam</option>
                           <option value="China">China</option>
                           <option value="Japan">Japan</option>
                        </select>

                        {formik.touched.country && formik.errors.country ? (
                           <span className={cx('error')}>{formik.errors.country}</span>
                        ) : null}
                     </div>

                     <div className="row row-cols-2 mb-4">
                        <div className="col px-1">
                           <InputCustom
                              value={formik.values.first_name}
                              onChange={formik.handleChange('first_name')}
                              onBlur={formik.handleBlur('first_name')}
                              className={cx('input')}
                              placeholder={'First Name'}
                           />

                           {formik.touched.first_name && formik.errors.first_name ? (
                              <span className={cx('error')}>{formik.errors.first_name}</span>
                           ) : null}
                        </div>
                        <div className="col px-1">
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

                     <div className="mb-4">
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
                     <div className="mb-4">
                        <InputCustom
                           value={formik.values.other || ''}
                           onChange={formik.handleChange('other')}
                           onBlur={formik.handleBlur('other')}
                           className={cx('input')}
                           placeholder={'Apartment, Suite, ect,...'}
                        />
                     </div>

                     <div className="row row-cols-3 mb-4">
                        <div className="col">
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
                        <div className="col">
                           <select
                              className={cx('btn-select')}
                              name=""
                              value={formik.values.state}
                              onChange={formik.handleChange('state')}
                              onBlur={formik.handleBlur('state')}
                           >
                              <option value="">---Select Country---</option>
                              <option value="Hanoi">Ha Nội</option>
                              <option value="HoChiMinh">Ho Chi Minh</option>
                              <option value="ThaiBinh">Thai Binh</option>
                           </select>

                           {formik.touched.state && formik.errors.state ? (
                              <span className={cx('error')}>{formik.errors.state}</span>
                           ) : null}
                        </div>

                        <div className="col">
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

                     <div className="row mb-4 mt-5 d-flex justify-content-between">
                        <div className="col-8 ">
                           <Button to={config.routes.home} primary className={cx('btn-country')}>
                              Country to shipping
                           </Button>
                        </div>
                        <div className="col-3 text-center">
                           <Button type={'submit'} primary className={cx('btn-country')} lazyLoad={isLoading}>
                              Order
                           </Button>
                        </div>
                     </div>
                  </form>
               </div>
               <div className={cx('product', 'col p-5')}>
                  <div className={cx('wrap-product')}>
                     {productList &&
                        productList?.map((item, index) => (
                           <div className={cx('info')} key={index}>
                              <div className={cx('wrap-img')}>
                                 <Image
                                    src={item?.productId?.image ? item?.productId?.image : images.errorImage}
                                    className={cx('img')}
                                 />
                                 <span className={cx('count')}>{item.quantity}</span>
                                 <span className={cx('wrap-name')}>
                                    <p className={cx('name-prod')}>{item.productId?.title}</p>
                                    <p className={cx('color')} style={{ backgroundColor: item.color.title }}></p>
                                    {item?.productId?.discountCode ? (
                                       <>
                                          <s className="fs-4">${item?.productId?.price}</s>{' '}
                                          <span className="fs-4 fw-bold" style={{ color: '#dd551b' }}>
                                             ${item?.productId?.price_after_discount.toFixed(2)}
                                          </span>
                                       </>
                                    ) : (
                                       <p className="fs-4">${item?.productId?.price}</p>
                                    )}
                                 </span>
                              </div>
                              <span className={cx('price')}>
                                 $
                                 {item?.productId?.discountCode
                                    ? item?.productId?.price_after_discount * item.quantity
                                    : item?.productId?.price * item.quantity}
                              </span>
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
