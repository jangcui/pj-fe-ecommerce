import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { BsArrowLeft } from 'react-icons/bs'

import ProductPrice from './ProductPrice'
import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/redux/store'
import styles from './CartPage.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'

const cx = classNames.bind(styles)

function CartPage() {
   const dispatch = useDispatch<AppDispatch>()
   const { productList, totalPrice } = useSelector((state: RootState) => state.cartData)
   const { isLogin, isLoading } = useSelector((state: RootState) => state.auth)

   const navigate = useNavigate()

   useEffect(() => {
      if (isLogin === false && isLoading === false) {
         navigate('/login')
      } else {
         return
      }
   }, [isLogin, navigate, dispatch, isLoading])

   return (
      <>
         <ChangeTitle title={'Cart'} />
         <BreadCrumb title={'Cart'} />
         <div className={cx('wrapper', 'w-100 row m-0 justify-content-center')}>
            <div className={cx('title', 'row row-cols-2 gy-2 mt-0 justify-content-between')}>
               <div className="col-8 d-flex justify-content-between">
                  <h3 className="ms-5">Product</h3>
                  <h3 className="d-none d-md-block">Price</h3>
               </div>
               <div className="col-3 d-flex justify-content-end justify-content-md-between ">
                  <h3 className="d-none d-md-block">Quantity</h3>
                  <h3 className="me-5 me-md-0">Total</h3>
               </div>
            </div>
            {productList &&
               productList?.map((data, index) => {
                  return (
                     <div key={index} className={cx('title', 'row row-cols-2 gy-2 mt-0 justify-content-between')}>
                        <ProductPrice data={data} />
                     </div>
                  )
               })}
            <div className={cx('title', 'row row-cols-2 gy-2  mt-0')}>
               <div className={cx('country', 'col-12 col-md-8')}>
                  <Button leftIcon={<BsArrowLeft />} onClick={() => navigate('/product')} primary className={cx('btn')}>
                     Country Shopping
                  </Button>
               </div>
               {totalPrice !== 0 && (
                  <div className="row col-12 col-md-4 mt-5 mt-md-0 ">
                     <div className={cx('text', 'col text-center text-md-end ')}>
                        Subtotal: <span className="fs-1 fw-bold ms-3">${totalPrice}</span>
                     </div>
                     <Button onClick={() => navigate('/checkout')} primary className={cx('btn')}>
                        Check out
                     </Button>
                  </div>
               )}
            </div>
         </div>
      </>
   )
}

export default CartPage
