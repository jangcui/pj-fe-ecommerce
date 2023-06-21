import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import ProductPrice from './ProductPrice'
import Button from '~/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'
import { getCarts } from '~/features/customers/customerService'
import config from '~/config/config'
import styles from './CartPage.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
const cx = classNames.bind(styles)

function CartPage() {
   const dispatch = useDispatch<AppDispatch>()
   const { cartList, totalPrice, user } = useSelector((state: RootState) => state.customer)
   const navigate = useNavigate()
   useEffect(() => {
      dispatch(getCarts())
   }, [dispatch])

   useEffect(() => {
      if (!user) {
         navigate('/login')
      } else {
         dispatch(getCarts())
      }
   }, [user, navigate, dispatch])

   return (
      <>
         <ChangeTitle title={'Cart'} />
         <BreadCrumb title={'Cart'} />
         <div className={cx('wrapper')}>
            <div className={cx('section')}>
               <div className={cx('block')}>
                  <h3>Product</h3>
                  <h3>Price</h3>
               </div>
               <div className={cx('block')}>
                  <h3>Quantity</h3>
                  <h3>Total</h3>
               </div>
            </div>{' '}
            ,
            {cartList &&
               cartList?.map((data, index) => {
                  return (
                     <div key={index}>
                        <ProductPrice data={data} />
                     </div>
                  )
               })}
            <div className={cx('section')}>
               <div className={cx('country')}>
                  <Button to={config.routes.home} primary className={cx('btn-foot')}>
                     Country Shopping
                  </Button>
                  <p className={cx('text-foot')}>Order special introduction</p>
               </div>
               {totalPrice !== 0 && (
                  <div className={cx('sum')}>
                     <div className={cx('text-foot')}>
                        Subtotal: <span>${totalPrice}</span>
                     </div>
                     <p className={cx('text-foot')}>Taxes and shipping calculated and checkout</p>
                     <Button to={config.routes.checkout} primary className={cx('btn-foot')}>
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
