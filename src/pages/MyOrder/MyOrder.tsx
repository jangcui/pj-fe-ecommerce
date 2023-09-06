import classNames from 'classnames/bind'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import moment from 'moment'

import styles from './MyOrder.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import { AppDispatch, RootState } from '~/redux/store/store'
import { TbMoodCry } from 'react-icons/tb'
import Button from '~/components/Button/Button'
import { getAllProducts } from '~/redux/features/products/productsService'
import { getMyOrder } from '~/redux/features/user/order/orderService'

const cx = classNames.bind(styles)

function MyOrder() {
   const dispatch = useDispatch<AppDispatch>()
   const { isLogin } = useSelector((state: RootState) => state.auth)
   const { orderList } = useSelector((state: RootState) => state.orderData)

   const navigate = useNavigate()

   useEffect(() => {
      if (!isLogin) {
         navigate('/login')
      } else {
         dispatch(getMyOrder())
      }
   }, [isLogin, navigate, dispatch])
   console.log(orderList)
   return (
      <>
         <ChangeTitle title={'Store'} />
         <BreadCrumb title={'Store'} />

         <div className={cx('wrapper', 'row w-100 d-flex justify-content-center mt-4')}>
            <div className="col-11">
               {orderList.length > 0 ? (
                  <table className="table table-bordered table-secondary">
                     <thead>
                        <tr>
                           <th scope="col">#</th>
                           <th scope="col">Products</th>
                           <th scope="col"> Order Date</th>
                           <th scope="col"> Total Price</th>
                           <th scope="col">Status</th>
                        </tr>
                     </thead>
                     <tbody>
                        {orderList?.map((item, index) => (
                           <tr key={index}>
                              <th>{index + 1}</th>
                              <th scope="row" className="col-5 p-2">
                                 {item?.productList?.map((product, index) => (
                                    <p key={index} className={cx('product')}>
                                       <Button
                                          text
                                          className={cx('action')}
                                          onClick={() => navigate(`/product/${product?.slug}`)}
                                       >
                                          {product?.title}
                                          <i className={cx('quantity')}>( x{product.quantity} ) </i>
                                       </Button>
                                    </p>
                                 ))}
                              </th>
                              <th>
                                 <i className={cx('date')}>{moment(item.date).format('HH:mm, DD/MM/YYYY')}</i>
                              </th>
                              <th>{item.total_price_after_discount.toFixed(2)} ( $ )</th>
                              <th>{item.status}</th>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               ) : (
                  <div className={cx('no-data')}>
                     <h1 className="d-flex justify-content-center ">
                        You have no order. <TbMoodCry className={cx('icon')} />
                     </h1>
                     <Button
                        primary
                        className={cx('btn-back')}
                        onClick={() => {
                           navigate('/product')
                           dispatch(getAllProducts({}))
                        }}
                     >
                        Go to shopping{' '}
                     </Button>
                  </div>
               )}
            </div>
         </div>
      </>
   )
}

export default MyOrder
