import classNames from 'classnames/bind'
import { Table } from 'antd'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import Button from '~/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'
import { useNavigate, useParams } from 'react-router-dom'
import { getAOrder } from '~/features/admin/adminService'

const cx = classNames.bind(styles)
interface DataType {
   key: React.Key
   name: string
   amount: number | any
   product: JSX.Element
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

function Order() {
   const dispatch = useDispatch<AppDispatch>()
   // const orderState = useSelector((state: RootState) => state.orders.order)

   // const navigate = useNavigate()
   // const { orderId } = useParams()

   // useEffect(() => {
   //    if (orderId !== undefined) {
   //       dispatch(getAOrder('6418838bd2090623d32d3a35'))
   //    } else {
   //       dispatch(resetOrderState())
   //    }
   // }, [dispatch, orderId])

   return (
      <div className={cx('wrapper')}>
         <h1>View Order </h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>{/* <Table columns={columns} dataSource={data1} /> */}</div>
         </div>
      </div>
   )
}

export default Order
