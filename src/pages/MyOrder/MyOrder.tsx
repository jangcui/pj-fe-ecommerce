import classNames from 'classnames/bind'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import moment from 'moment'

import styles from './MyOrder.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import { AppDispatch, RootState } from '~/store/store'
import { getMyOrder } from '~/features/customers/customerService'

const cx = classNames.bind(styles)

function MyOrder() {
   const dispatch = useDispatch<AppDispatch>()

   const { orderList, user } = useSelector((state: RootState) => state.customer)

   const navigate = useNavigate()

   useEffect(() => {
      if (!user) {
         navigate('/login')
      } else {
         dispatch(getMyOrder())
      }
   }, [user, navigate, dispatch])

   return (
      <>
         <ChangeTitle title={'Our Store'} />
         <BreadCrumb title={'Our Store'} />
         <div className={cx('wrapper')}>
            <div className={cx('row')}>
               <div className={cx('column')}>
                  <h4>Products</h4>
               </div>
               <div className={cx('column')}>
                  <h4>Order Date </h4>
               </div>
               <div className={cx('column')}>
                  <h4>Total Price</h4>
               </div>
               <div className={cx('column')}>
                  <h4>Status</h4>
               </div>
            </div>
            {orderList &&
               orderList?.map((item, index) => (
                  <div className={cx('row')} key={index}>
                     <div className={cx('column')}>
                        <ul className={cx('product-wrapper')}>
                           {item?.orderItems?.map((product, index) => (
                              <li className={cx('product')} key={index}>
                                 {product.productId.title}
                                 <i className={cx('quantity')}>(X{product.quantity}) </i>
                              </li>
                           ))}
                        </ul>
                     </div>
                     <div className={cx('column')}>
                        <span>
                           <i className={cx('date')}>{moment(item.createdAt).format('HH:mm, DD/MM/YYYY')}</i>
                        </span>
                     </div>
                     <div className={cx('column')}>
                        <span>
                           <b>{item.total_price}</b>( $ )
                        </span>
                     </div>
                     <div className={cx('column')}>
                        <span>{item.order_status}</span>
                     </div>
                  </div>
               ))}
         </div>
      </>
   )
}

export default MyOrder
