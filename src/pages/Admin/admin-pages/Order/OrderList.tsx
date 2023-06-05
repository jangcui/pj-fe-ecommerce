import classNames from 'classnames/bind'
import { Table } from 'antd'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import Button from '~/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'

const cx = classNames.bind(styles)
interface DataType {
   key: React.Key
   name?: string
   amount?: number
   product?: JSX.Element
   date?: string
   action?: JSX.Element
}

const columns: any = [
   {
      title: 'SNo',
      dataIndex: 'key',
   },
   {
      title: 'Name',
      dataIndex: 'name',
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

function OrderList() {
   const dispatch = useDispatch<AppDispatch>()
   const orderState = useSelector((state: RootState) => state.auth.orderList)

   // useEffect(() => {
   //    dispatch(getAllOrders())
   // }, [dispatch])

   // const data1: DataType[] = []
   // for (let i = 0; i < orderState.length; i++) {
   //    data1.push({
   //       key: i + 1,
   //       name: orderState[i]?.orderBy?.fist_name + ' ' + orderState[i]?.orderBy?.last_name,
   //       product: (
   //          <>
   //             <Button text to={`/admin/order/${orderState[i]._id}`}>
   //                <p className={cx('order-text')}> View User Order</p>
   //             </Button>
   //          </>
   //       ),
   //       amount: orderState[i]?.paymentIntent?.amount,
   //       date: new Date(orderState[i]?.createdAt as Date)
   //          .toLocaleString('vi-VN', {
   //             hour: '2-digit',
   //             minute: '2-digit',
   //             second: '2-digit',
   //             hour12: true,
   //             year: 'numeric',
   //             month: '2-digit',
   //             day: '2-digit',
   //          })
   //          .replace(' ', ', '),
   //       action: (
   //          <>
   //             <Button text to={'/'}>
   //                <AiFillDelete className={cx('icon')} />
   //             </Button>
   //             <Button text to={'/'}>
   //                <BiEdit className={cx('icon')} />
   //             </Button>
   //          </>
   //       ),
   //    })
   // }

   return (
      <div className={cx('wrapper')}>
         <h1>Orders</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>{/* <Table columns={columns} dataSource={data1} /> */}</div>
         </div>
      </div>
   )
}

export default OrderList
