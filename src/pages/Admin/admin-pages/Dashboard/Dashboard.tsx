import classNames from 'classnames/bind'
import { BsArrowDownRight, BsArrowUpRight, BsArrowRight } from 'react-icons/bs'
import { Column } from '@ant-design/plots'
import { Table } from 'antd'

import styles from './Dashboard.module.scss'
const cx = classNames.bind(styles)

interface DataType {
   key: React.Key
   name: string
   product: number
   status: string
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
      title: 'Products',
      dataIndex: 'product',
   },
   {
      title: 'Status',
      dataIndex: 'status',
   },
]

const data1: DataType[] = []
for (let i = 0; i < 46; i++) {
   data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: `London, Park Lane no. ${i}`,
   })
}
function Dashboard() {
   const data = [
      {
         type: 'Jan',
         sales: 38,
      },
      {
         type: 'Feb',
         sales: 52,
      },
      {
         type: 'Mar',
         sales: 61,
      },
      {
         type: 'Apr',
         sales: 145,
      },
      {
         type: 'May',
         sales: 48,
      },
      {
         type: 'Jun',
         sales: 38,
      },
      {
         type: 'July',
         sales: 38,
      },
      {
         type: 'August',
         sales: 38,
      },
      {
         type: 'Sep',
         sales: 38,
      },
      {
         type: 'Oct',
         sales: 38,
      },
      {
         type: 'Nov',
         sales: 38,
      },
   ]
   const config = {
      data,
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
            alias: 'Income',
         },
      },
   }

   return (
      <>
         <div className={cx('wrapper')}>
            <h1 className={cx('title')}>Dashboard</h1>
            <div className={cx('wrap-blocks')}>
               <div className={cx('block')}>
                  <h3>Total</h3>
                  <div className={cx('statistic')}>
                     <span className={cx('money')}> $1000 </span>
                     <span className={cx('content')}>
                        <span className={cx('percent', 'down')}>
                           {' '}
                           <BsArrowDownRight className={cx('icon')} />
                           32%
                        </span>
                        <p>Compared To April 2023</p>
                     </span>
                  </div>
               </div>{' '}
               <div className={cx('block')}>
                  <h3>Total</h3>
                  <div className={cx('statistic')}>
                     <span className={cx('money')}>$1000 </span>
                     <span className={cx('content')}>
                        <span className={cx('percent', 'up')}>
                           <BsArrowUpRight className={cx('icon')} /> 32%
                        </span>
                        <p>Compared To April 2023</p>
                     </span>
                  </div>
               </div>{' '}
               <div className={cx('block')}>
                  <h3>Total</h3>
                  <div className={cx('statistic')}>
                     <span className={cx('money')}>$1000 </span>
                     <span className={cx('content')}>
                        <span className={cx('percent')}>
                           {' '}
                           <BsArrowRight className={cx('icon')} />
                           32%
                        </span>
                        <p>Compared To April 2023</p>
                     </span>
                  </div>
               </div>
            </div>
            <div className={cx('chart')}>
               <h1>Income Statics</h1>
               <div className={cx('content')}>
                  <Column {...config} />
               </div>
            </div>
            <div className={cx('chart')}>
               <h1>Recent Orders</h1>
               <div className={cx('content')}>
                  <Table columns={columns} dataSource={data1} />
               </div>
            </div>
         </div>
      </>
   )
}

export default Dashboard
