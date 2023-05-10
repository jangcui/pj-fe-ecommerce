import classNames from 'classnames/bind'
import { Table } from 'antd'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import Button from '~/layouts/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'
import { getOrders } from '~/features/orders/ordersSlice'

const cx = classNames.bind(styles)
interface DataType {
   key: React.Key
   title: string
   amount: number
   product: any
   date: string
   action: JSX.Element
}

const columns: any = [
   {
      title: 'SNo',
      dataIndex: 'key',
   },
   {
      title: 'Name',
      dataIndex: 'title',
   },
   {
      title: 'Product',
      dataIndex: 'product',
   },

   {
      title: 'Amount',
      dataIndex: 'amount',
   },
   {
      title: 'Date',
      dataIndex: 'date',
   },
   {
      title: 'Action',
      dataIndex: 'action',
   },
]

function Order() {
   const dispatch = useDispatch<AppDispatch>()
   const orderState = useSelector((state: RootState) => state.orders.order)

   useEffect(() => {
      dispatch(getOrders())
   }, [])

   const data1: DataType[] = []
   for (let i = 0; i < orderState.length; i++) {
      data1.push({
         key: i + 1,
         title: orderState[i].orderBy.fist_name + ' ' + orderState[i].orderBy.last_name,
         product: orderState[i].products.map((product, index: number) => (
            <ul key={index}>
               <li>
                  <p>{product.product.title}</p>
               </li>
            </ul>
         )),
         amount: orderState[i].paymentIntent.amount,
         date: new Date(orderState[i].createdAt).toLocaleString(),
         action: (
            <>
               <Button text to={'/'}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
               <Button text to={'/'}>
                  <BiEdit className={cx('icon')} />
               </Button>
            </>
         ),
      })
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Orders</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
         </div>
      </div>
   )
}

export default Order
