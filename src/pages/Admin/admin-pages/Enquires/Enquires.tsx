import classNames from 'classnames/bind'

import styles from './Enquires.module.scss'
const cx = classNames.bind(styles)
import { Table } from 'antd'

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

function Enquires() {
   return (
      <div className={cx('wrapper')}>
         <h1>Enquires</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
         </div>
      </div>
   )
}

export default Enquires
