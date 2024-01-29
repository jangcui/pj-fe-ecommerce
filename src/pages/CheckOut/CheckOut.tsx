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

import * as httpRequest from '~/utils/httpRequest'
import Image from '~/components/Image/Image'
import config from '~/routes/config/config'
import { AppDispatch, RootState } from '~/redux/store'
import images from '~/assets/images'
import logo from '~/assets/images/logo.png'
import InputCustom from '~/components/InputCustom'
import { getCart } from '~/redux/features/user/cart/cartService'
import { OrderType, checkOut, createOrder } from '~/redux/features/user/order/orderService'
import { openModalLogin } from '~/redux/features/modals/modalSlice'

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

const SHIPPING_FEE = 5 // $$$

function CheckOut() {
   const dispatch = useDispatch<AppDispatch>()
   const { isLogin, user } = useSelector((state: RootState) => state.auth)
   const { productList, totalPrice } = useSelector((state: RootState) => state.cartData)
   const [price, setPrice] = useState<number>(0)
   const [isLoading, setIsLoading] = useState<boolean>(false)
   const [orderItem, setOrderItem] = useState<OrderType[]>([])

   const navigate = useNavigate()

   useEffect(() => {
      const itemOrder = productList?.map((item) => ({
         productId: item.product?._id,
         colorId: item.color._id,
         quantity: item.quantity,
         total: item.total,
      }))
      setOrderItem([...itemOrder])
   }, [])

   useEffect(() => {
      const total = orderItem?.reduce((total, selectedItem) => total + selectedItem.total, 0)
      setPrice(total)
   }, [orderItem])

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
         if (!isLogin) {
            dispatch(openModalLogin())
            toast.info('Please login fist')
         } else {
            setIsLoading(true)
            await handleCheckOut()
         }
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
      const result = await dispatch(checkOut({ amount: price + SHIPPING_FEE }))
      if (!result) {
         toast.error('Some thing went wrong, please try again')
         return
      }
      console.log('result:', result)

      const { id: order_id, currency } = result.payload.order
      setIsLoading(false)

      const options = {
         key: 'rzp_test_ROJNShWydm5owR',
         amount: price + SHIPPING_FEE,
         currency: currency,
         name: 'E-commerce.',
         description: 'Test Transaction',
         image: { logo },
         order_id: order_id,
         handler: async function (response: any) {
            const data = {
               order_creation_id: order_id,
               razor_pay_payment_id: response.razorpay_payment_id,
               razor_pay_order_id: response.razorpay_order_id,
            }
            await httpRequest.post('user/payment-verify', data)
            const result = await dispatch(
               createOrder({
                  total_price: price + SHIPPING_FEE,
                  total_price_after_discount: price + SHIPPING_FEE,
                  shippingInfo: formik.values,
                  orderItems: orderItem,
                  paymentInfo: data,
               }),
            )
            console.log('result::', result)
            if (result.payload.success === true) {
               formik.resetForm()
               navigate('/order')
               dispatch(getCart())
            }
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
                              <option value="Hanoi">Ha Noi</option>
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
                     {productList.length > 0 ? (
                        productList?.map((item, index) => (
                           <label id={`checkbox-${orderItem[index]?.productId}`} className={cx('info')} key={index}>
                              <div className={cx('wrap-img')}>
                                 <Image
                                    src={item?.product?.thumb ? item?.product?.thumb : images.errorImage}
                                    className={cx('img')}
                                 />
                                 <span className={cx('count')}>{item.quantity}</span>
                                 <span className={cx('wrap-name')}>
                                    <p className={cx('name-prod')}>{item.product?.title}</p>
                                    <p className={cx('color')} style={{ backgroundColor: item.color.title }}></p>
                                    {item?.product?.discountCode ? (
                                       <>
                                          <s className="fs-4">${item?.product?.price}</s>{' '}
                                          <span className="fs-4 fw-bold" style={{ color: '#dd551b' }}>
                                             ${item?.product?.price_after_discount}
                                          </span>
                                       </>
                                    ) : (
                                       <p className="fs-4">${item?.product?.price}</p>
                                    )}
                                 </span>{' '}
                              </div>
                              <span className={cx('price')}>${item.total}</span>

                              <div className="form-check ms-4">
                                 <input
                                    checked={orderItem.some(
                                       (productOrder) =>
                                          productOrder.productId === item?.product?._id &&
                                          productOrder.colorId === item?.color?._id,
                                    )}
                                    onChange={(event) => {
                                       if (event.target.checked) {
                                          const order = {
                                             productId: item?.product?._id,
                                             colorId: item.color._id,
                                             quantity: item.quantity,
                                             total: item.total,
                                          }
                                          setOrderItem([order, ...orderItem])
                                       } else {
                                          setOrderItem((prev) =>
                                             prev.filter(
                                                (value) =>
                                                   value.productId !== item?.product?._id &&
                                                   value.colorId !== item?.color?._id,
                                             ),
                                          )
                                       }
                                    }}
                                    className="form-check-input fs-2 "
                                    type="checkbox"
                                    value=""
                                    id={`checkbox-${orderItem[index]?.productId}`}
                                 />
                              </div>
                           </label>
                        ))
                     ) : (
                        <h1 className="fs-2 fw-bold text-center mt-3">Your cart is currently empty.</h1>
                     )}
                  </div>
                  <div className={cx('calculate')}>
                     <div className={cx('field')}>
                        <span className={cx('type')}>Subtotal</span>
                        <span className={cx('price')}>${price}</span>
                     </div>{' '}
                     <div className={cx('field')}>
                        <span className={cx('type')}>Shipping</span>
                        <span className={cx('price')}>${SHIPPING_FEE}</span>
                     </div>
                  </div>
                  <div className={cx('field')}>
                     <b className={cx('type')}>Total:</b>
                     <b className={cx('price')}>${price + SHIPPING_FEE}</b>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default CheckOut
