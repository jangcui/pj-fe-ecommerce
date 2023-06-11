import classNames from 'classnames/bind'
import { Table } from 'antd'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import Button from '~/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'
import { deleteOrder, getAllOrders, updateOrderStatus } from '~/features/admin/adminService'
import { BsTrashFill } from 'react-icons/bs'

const cx = classNames.bind(styles)

interface DataType {
   key: React.Key
   name: string
   amount: number
   dPrice: number
   product: JSX.Element
   status: string
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

function OrderList() {
   const dispatch = useDispatch<AppDispatch>()
   const { orderList } = useSelector((state: RootState) => state.auth)

   useEffect(() => {
      dispatch(getAllOrders())
   }, [dispatch])

   const data1: DataType[] = []
   for (let i = 0; i < orderList?.length; i++) {
      data1.push({
         key: i,
         name: orderList[i].user.fist_name + ' ' + orderList[i].user.last_name || '',
         product: (
            <>
               <Button text to={`/admin/order/${orderList[i]._id}`}>
                  <p style={{ color: '#0d6efd', fontStyle: 'italic', textDecoration: 'underLine' }}>Go to product</p>
               </Button>
            </>
         ),
         amount: orderList[i]?.orderItems.length,
         dPrice: orderList[i]?.total_price_after_discount,
         status: `${orderList[i]?.order_status}`,
         date: new Date(orderList[i].createdAt as Date)
            .toLocaleString('vi-VN', {
               hour: '2-digit',
               minute: '2-digit',
               second: '2-digit',
               hour12: true,
               year: 'numeric',
               month: '2-digit',
               day: '2-digit',
            })
            .replace(' ', ', '),
         action: (
            <>
               <select
                  name=""
                  id=""
                  onChange={(e) => handleUpdateStatusOrder(orderList[i]?._id || '', e.target.value)}
                  className="form-control form-select"
                  defaultValue={orderList[i].order_status}
               >
                  <option value="Ordered">Ordered </option>
                  <option value="Processed">Processed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
               </select>
            </>
         ),
      })
   }
   const handleUpdateStatusOrder = (id: string, status: string) => {
      dispatch(updateOrderStatus({ id: id, order_status: status }))
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

export default OrderList
