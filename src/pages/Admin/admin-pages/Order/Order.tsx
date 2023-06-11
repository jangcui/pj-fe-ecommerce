import classNames from 'classnames/bind'
import { Table } from 'antd'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import Button from '~/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteOrder, getAOrder, getAllOrders } from '~/features/admin/adminService'
import { BsTrashFill } from 'react-icons/bs'

const cx = classNames.bind(styles)
interface DataType {
   name: string
   amount?: number
   product: JSX.Element
   price: JSX.Element
   color: JSX.Element
   brand: JSX.Element
   dPrice?: number
   status: string
}

const columns: any = [
   {
      title: 'User Order',
      dataIndex: 'name',
   },
   {
      title: 'Name Product',
      dataIndex: 'product',
   },
   {
      title: 'Color',
      dataIndex: 'color',
   },
   {
      title: 'Brand',
      dataIndex: 'brand',
   },

   {
      title: 'Price',
      dataIndex: 'price',
   },
   {
      title: 'Amount',
      dataIndex: 'amount',
   },
   {
      title: 'Total Price',
      dataIndex: 'dPrice',
   },
]

function Order() {
   const dispatch = useDispatch<AppDispatch>()
   const { order } = useSelector((state: RootState) => state.auth)
   const { orderId } = useParams()
   const data1: DataType[] = []

   useEffect(() => {
      if (orderId !== undefined) {
         dispatch(getAOrder(orderId))
      }
   }, [dispatch, orderId])

   data1.push({
      name: (order && order?.user.fist_name + ' ' + order?.user.last_name) || '',
      product: (
         <>
            {order?.orderItems.map((item, index) => (
               <ul key={index} className="list-unstyled">
                  <li style={{ fontWeight: '600' }}>{item.productId.title} </li>
               </ul>
            ))}
         </>
      ),
      brand: (
         <>
            {order?.orderItems.map((item, index) => (
               <ul key={index} className="list-unstyled">
                  <li style={{ fontWeight: '600' }}>{item.productId.brand} </li>
               </ul>
            ))}
         </>
      ),
      price: (
         <>
            {order?.orderItems.map((item, index) => (
               <ul key={index} className="list-unstyled">
                  <li style={{ fontWeight: '600' }}>{item.productId.price}</li>
               </ul>
            ))}
         </>
      ),
      color: (
         <>
            {order?.orderItems.map((item, index) => (
               <ul key={index} className="list-unstyled">
                  <li
                     style={{ backgroundColor: item.color.title, width: '16px', height: '16px', borderRadius: '100%' }}
                  >
                     {' '}
                  </li>
               </ul>
            ))}
         </>
      ),
      amount: order?.orderItems.length,
      status: `${order?.order_status}`,
      dPrice: order?.total_price_after_discount,
   })

   return (
      <div className={cx('wrapper')}>
         <h1>View Order </h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
         </div>
      </div>
   )
}

export default Order
