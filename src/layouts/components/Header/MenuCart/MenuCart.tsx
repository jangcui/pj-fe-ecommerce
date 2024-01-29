import classNames from 'classnames/bind'
import { useSelector } from 'react-redux'
import { TiShoppingCart } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { useState } from 'react'

import styles from './MenuCart.module.scss'
import Button from '~/components/Button'
import { RootState } from '~/redux/store/store'
import ProductCart from './ProductCart'

const cx = classNames.bind(styles)

function MenuCart() {
   const { productList, totalPrice, quantity } = useSelector((state: RootState) => state.cartData)
   const [openMenu, setOpenMenu] = useState<boolean>(false)

   const navigate = useNavigate()

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
               <h2 className="text-center fs-4 my-2">
                  {' '}
                  Contact: <i className="text-decoration-underline">tungphan12h@gmail.com</i>
               </h2>
               <Button text className={cx('btn-close')} onClick={() => setOpenMenu(false)}>
                  <GrClose />
               </Button>
               <div className={cx('product-detail')}>
                  {quantity > 0 ? (
                     productList.map((data, index) => (
                        <div key={index} className={cx('product')}>
                           <ProductCart data={data} />
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
                     <span className="col text-center fs-3 ">{quantity}</span>
                     <span className="col text-center fs-3 ">${totalPrice}</span>
                  </div>
               </div>
               <div className={cx('view-cart', 'w-100 d-flex justify-content-center gap-4')}>
                  {quantity > 0 ? (
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
                           secondary
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
