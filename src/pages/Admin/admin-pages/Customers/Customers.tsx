import classNames from 'classnames/bind'

import styles from './Customers.module.scss'

const cx = classNames.bind(styles)
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '~/features/customers/customerSlice'
import { useEffect } from 'react'
import { AppDispatch, RootState } from '~/store/store'
import { UserType } from '~/types/userStage'

interface DataType extends UserType {
   key: React.Key
   name: string
   blocked: string
}

const columns: any = [
   {
      title: 'SNo',
      dataIndex: 'key',
   },
   {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
   },
   {
      title: 'Mobile',
      dataIndex: 'mobile',
   },
   {
      title: 'Blocked',
      dataIndex: 'blocked',
   },
]

function Customers() {
   const dispatch = useDispatch<AppDispatch>()

   const userState = useSelector((state: RootState) => state.customer.user)
   useEffect(() => {
      dispatch(getUsers())
   }, [])

   const data1: DataType[] = []
   for (let i = 0; i < userState.length; i++) {
      if (userState[i].role !== 'admin') {
         data1.push({
            key: i + 1,
            name: userState[i].fist_name + ' ' + userState[i].last_name,
            email: userState[i].email,
            mobile: userState[i].mobile,
            blocked: `${userState[i].isBlocked}`,
         })
      }
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Customers</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
         </div>
      </div>
   )
}

export default Customers
