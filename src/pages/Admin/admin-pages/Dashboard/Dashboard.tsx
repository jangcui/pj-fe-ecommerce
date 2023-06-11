import classNames from 'classnames/bind'
import { BsArrowDownRight, BsArrowUpRight, BsArrowRight, BsArrowReturnLeft, BsTrashFill } from 'react-icons/bs'
import { Column } from '@ant-design/plots'
import { Table } from 'antd'

import styles from './Dashboard.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { useEffect, useState } from 'react'
import { deleteOrder, getAllOrders, getMonthlyOrders, getYearlyOrders } from '~/features/admin/adminService'
import Button from '~/components/Button/Button'
const cx = classNames.bind(styles)

interface DataType {
   key: React.Key
   name: string
   price: number
   dPrice: number
   product: number
   status: string
   // action: JSX.Element
}
type DataIncomeType = {
   type?: string
   income?: number
   sales?: number
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
      title: 'Product Count',
      dataIndex: 'product',
   },
   {
      title: 'Total Price',
      dataIndex: 'price',
   },
   {
      title: 'Total Price After Discount',
      dataIndex: 'dPrice',
   },
   {
      title: 'Status',
      dataIndex: 'status',
   },
   // {
   //    title: 'Action',
   //    dataIndex: 'action',
   // },
]

function Dashboard() {
   const dispatch = useDispatch<AppDispatch>()
   const { monthlyIncome, yearlyIncome, orderList } = useSelector((state: RootState) => state.auth)
   const [dataMonthlyAmount, setDateMonthlyAmount] = useState<DataIncomeType[]>([])
   const [dataMonthlyCount, setDateMonthlyCount] = useState<DataIncomeType[]>([])
   const [dataOrders, setDataOrders] = useState<DataType[]>([])

   useEffect(() => {
      dispatch(getMonthlyOrders())
      dispatch(getYearlyOrders())
      dispatch(getAllOrders())
   }, [dispatch])
   console.log(orderList)
   useEffect(() => {
      const monthNames = [
         'January',
         'February',
         'March',
         'April',
         'May',
         'June',
         'July',
         'August',
         'September',
         'October',
         'November',
         'December',
      ]
      const data = []
      const monthlyOrderCounts = []
      for (let index = 0; index < monthlyIncome?.length; index++) {
         const el: any = monthlyIncome[index]
         data.push({
            type: monthNames[el?._id?.month],
            income: el?.amount,
         })
         monthlyOrderCounts.push({
            type: monthNames[el?._id?.month],
            sales: el?.count,
         })
      }

      const data1: DataType[] = []
      for (let i = 0; i < orderList?.length; i++) {
         data1.push({
            key: i,
            name: orderList[i].user.fist_name + ' ' + orderList[i].user.last_name || '',
            product: orderList[i]?.orderItems?.length,
            price: orderList[i]?.total_price,
            dPrice: orderList[i]?.total_price_after_discount,
            status: `${orderList[i]?.order_status}`,
            // action: (
            //    <>
            //       <Button text onClick={() => handleDeleteOrder(orderList[i]?._id || '')}>
            //          <BsTrashFill style={{ width: '24px', height: '24px', marginRight: '10px' }} />
            //       </Button>
            //    </>
            // ),
         })
      }
      setDataOrders(data1)
      setDateMonthlyCount(monthlyOrderCounts)
      setDateMonthlyAmount(data)
   }, [monthlyIncome, orderList])

   // const handleDeleteOrder = async (id: string) => {
   //    await dispatch(deleteOrder(id))
   //    await dispatch(getAllOrders())
   // }
   const configMonthlyAmount = {
      data: dataMonthlyAmount,
      xField: 'type',
      yField: 'income',
      color: () => {
         return '#ffd333'
      },
      xAxis: {
         label: {
            autoHide: true,
            autoRotate: false,
         },
      },
      meta: {
         type: {
            alias: 'Months',
         },
         sales: {
            alias: 'Income',
         },
      },
   }
   console.log(dataMonthlyCount)
   const configMonthlyCount = {
      data: dataMonthlyCount,
      xField: 'type',
      yField: 'sales',
      color: () => {
         return '#ffd333'
      },
      xAxis: {
         label: {
            autoHide: true,
            autoRotate: false,
         },
      },
      meta: {
         type: {
            alias: 'Months',
         },
         sales: {
            alias: 'Sales',
         },
      },
   }
   return (
      <div className={cx('wrapper')}>
         <h1>Dashboard</h1>
         <div className={cx('wrap-blocks')}>
            <div className={cx('block')}>
               <p>Total Income:</p>
               <div className={cx('statistic')}>
                  <span className={cx('money')}> ${yearlyIncome[0]?.amount} </span>
                  <span className={cx('content')}>
                     <p>--Income in Last Year from Today--</p>
                  </span>
               </div>
            </div>{' '}
            <div className={cx('block')}>
               <p>Total Sales: </p>
               <div className={cx('statistic')}>
                  <span className={cx('money')}> {yearlyIncome[0]?.count}</span>
                  <span className={cx('content')}>
                     <p>--Sales in Last Year from Today--</p>
                  </span>
               </div>
            </div>{' '}
         </div>
         <div className="d-flex justify-content-between gap-3">
            <div className={cx('chart')}>
               <h1 className="text-center mb-3">Income Statics</h1>
               <Column {...configMonthlyAmount} />
            </div>
            <div className={cx('chart')}>
               <h1 className="text-center mb-3">Sales Statics</h1>
               <Column {...configMonthlyCount} />
            </div>
         </div>
         <div className="w-100 ">
            <h1 className="mb-5 ">Recent Orders</h1>
            <Table className="w-100" columns={columns} dataSource={dataOrders} />
         </div>
      </div>
   )
}

export default Dashboard
