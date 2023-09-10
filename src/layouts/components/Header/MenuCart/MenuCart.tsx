import classNames from 'classnames/bind'
import { useSelector, useDispatch } from 'react-redux'
import { TiShoppingCart } from 'react-icons/ti'
import debounce from 'lodash.debounce'
import { useNavigate } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import { useState } from 'react'

import styles from './MenuCart.module.scss'
import Button from '~/components/Button'
import Image from '~/components/Image'
import images from '~/assets/images'
import { AppDispatch, RootState } from '~/redux/store/store'
import { getCart, removeProductFromCart } from '~/redux/features/user/cart/cartService'

const cx = classNames.bind(styles)

function MenuCart() {
   const dispatch = useDispatch<AppDispatch>()
   const { productList, totalPrice } = useSelector((state: RootState) => state.cartData)
   const [openMenu, setOpenMenu] = useState<boolean>(false)
   const navigate = useNavigate()

   const handleRemoveProduct = debounce(async (data: string) => {
      await dispatch(removeProductFromCart(data))
      await dispatch(getCart())
   }, 800)

   return (
      <>
         <div className={cx('wrap-icon')}>
            <Button className={cx('btn')} onClick={() => setOpenMenu(true)}>
               <TiShoppingCart className={cx('icon')} />
               <span className={cx('sub-quantity', 'd-block d-sm-none ')}>
                  {productList?.length ? productList?.length : 0}
               </span>
            </Button>
            <div className={cx('option-content', 'd-none d-sm-flex')}>
               <span className={cx('quantity')}>{productList?.length ? productList?.length : 0}</span>
               <p className="fs-4 d-flex m-0">
                  <span> ${totalPrice ? totalPrice : 0}</span>
               </p>
            </div>
         </div>

         <div className={cx('cart-overlay', openMenu && 'open')}>
            <Button text className={cx('btn-overlay', 'col')} onClick={() => setOpenMenu(false)}></Button>
            <div className={cx('cart-content', 'col-8 col-sm-6')}>
               <h2 className="text-center fs-4 mt-1">
                  {' '}
                  Contact: <i className="text-decoration-underline">tungphan12h@gmail.com</i>
               </h2>
               <Button text className={cx('btn-close')} onClick={() => setOpenMenu(false)}>
                  <GrClose />
               </Button>
               <div className={cx('product-detail')}>
                  {productList.length > 0 ? (
                     productList.map((data, index) => (
                        <div key={index} className={cx('product', 'row d-flex justify-content-between')}>
                           <Button
                              text
                              to={`/product/${data?.productId?.slug}`}
                              className="col d-flex justify-content-between"
                           >
                              <div className="col-12 row">
                                 <div className="col-4 p-0 d-flex justify-content-center align-items-center">
                                    <Image
                                       className={cx('img')}
                                       src={data?.productId?.image ? data?.productId?.image : images.errorImage}
                                    />
                                 </div>
                                 <div className="col p-0">
                                    <h3 className={cx('title')}>{data?.productId?.title}</h3>
                                    {data?.productId?.price_after_discount ? (
                                       <div className="d-flex gap-2 mb-2" style={{ color: '#99a2aa' }}>
                                          <s className="fs-4 ms-2">${data?.productId?.price.toFixed(2)}</s>{' '}
                                          <span className="fs-4 fw-bolder" style={{ color: '#dd551b' }}>
                                             ${data?.productId?.price_after_discount.toFixed(2)}
                                          </span>
                                       </div>
                                    ) : (
                                       <p className="fs-4 mb-0 ms-2">${data?.productId?.price.toFixed(2)}</p>
                                    )}
                                    <div className="col-12 ms-4 row align-items-center">
                                       <div
                                          className={cx('color', '')}
                                          style={{ backgroundColor: data?.color?.title ? data?.color?.title : ' ' }}
                                       ></div>
                                       <i className="col fw-bold">X{data.quantity}</i>
                                    </div>
                                 </div>
                              </div>
                           </Button>
                           <div className="col-1 d-flex align-items-center justify-content-center p-0">
                              <Button
                                 text
                                 className={cx('btn-delete')}
                                 onClick={() => handleRemoveProduct(data?._id as string)}
                              >
                                 <AiFillDelete className={cx('icon-delete')} />
                              </Button>
                           </div>
                        </div>
                     ))
                  ) : (
                     <h1 className="fs-2 fw-bold text-center mt-3">Your cart is currently empty.</h1>
                  )}
               </div>
               <div className={cx('summary')}>
                  <div className="w-100  row justify-content-between">
                     <span className="col text-center fs-4 fs-xl-3 fw-bold"> Total Items:</span>
                     <span className="col text-center fs-4 fs-xl-3 fw-bold"> Sub Total:</span>
                  </div>
                  <div className="w-100  row justify-content-between">
                     <span className="col text-center fs-3 ">{productList.length}</span>
                     <span className="col text-center fs-3 ">${totalPrice}</span>
                  </div>
               </div>
               <div className={cx('view-cart', 'w-100 d-flex justify-content-center gap-4')}>
                  {productList.length > 0 ? (
                     <>
                        <Button
                           primary
                           className="col-5 p-3 px-4"
                           onClick={() => {
                              navigate('/cart')
                              setOpenMenu(false)
                           }}
                        >
                           Go To Cart
                        </Button>
                        <Button
                           primary
                           className="col-5 p-3 px-4"
                           onClick={() => {
                              navigate('/checkout')
                              setOpenMenu(false)
                           }}
                        >
                           Check Out
                        </Button>
                     </>
                  ) : (
                     <Button
                        primary
                        className="col-10 p-3 px-4"
                        onClick={() => {
                           navigate('/product')
                           setOpenMenu(false)
                        }}
                        rightIcon={<BsArrowRight className="fs-3" />}
                     >
                        Go To Shopping
                     </Button>
                  )}
               </div>
            </div>
         </div>
      </>
   )
}

export default MenuCart
