import classNames from 'classnames/bind'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getEnquiries } from '~/features/enquiry/enquirySlice'
import { useEffect } from 'react'
import Button from '~/layouts/components/Button/Button'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { AppDispatch, RootState } from '~/store/store'
import { EnquiryType } from '~/types/enquiryState'
const cx = classNames.bind(styles)

interface DataType extends EnquiryType {
   key: React.Key
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
      title: 'Email',
      dataIndex: 'email',
   },
   {
      title: 'Mobile',
      dataIndex: 'mobile',
   },

   {
      title: 'Status',
      dataIndex: 'status',
   },
   {
      title: 'Action',
      dataIndex: 'action',
   },
]

function Enquires() {
   const dispatch = useDispatch<AppDispatch>()
   const enquiryState = useSelector((state: RootState) => state.enquiries.enquiry)
   useEffect(() => {
      dispatch(getEnquiries())
   }, [])

   const data1: DataType[] = []
   for (let i = 0; i < enquiryState.length; i++) {
      if (enquiryState[i].role !== 'admin') {
         data1.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            mobile: enquiryState[i].mobile,
            status: (
               <>
                  <select className={cx('select-form')}>
                     <option>Set Status</option>
                  </select>
               </>
            ),
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
   }
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
