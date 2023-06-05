import classNames from 'classnames/bind'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '~/components/Button/Button'
import { AiFillEye, AiFillDelete } from 'react-icons/ai'
import { AppDispatch, RootState } from '~/store/store'
import { EnquiryType } from '~/types/enquiryState'
import ModalCustom from '~/components/ModalCustom/ModalCustom'
import { toast } from 'react-toastify'
import { deleteEnquiry, getEnquiries, updateStatusEnquiry } from '~/features/enquiry/enquiryService'
const cx = classNames.bind(styles)

interface DataType extends EnquiryType {
   key: React.Key
   action: JSX.Element
   select: JSX.Element
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
      dataIndex: 'select',
   },
   {
      title: 'Action',
      dataIndex: 'action',
   },
]

function Enquires() {
   const dispatch = useDispatch<AppDispatch>()
   const enquiryState = useSelector((state: RootState) => state.enquiries.enquiries)
   const [enqId, setEnqId] = useState<string>('')

   useEffect(() => {
      dispatch(getEnquiries())
   }, [dispatch])

   const [open, setOpen] = useState(false)

   const showModal = (value?: string) => {
      setOpen(true)
      if (value) {
         setEnqId(value)
      }
   }

   const hideModal = () => {
      setOpen(false)
   }
   const handleDelete = (id: string) => {
      dispatch(deleteEnquiry(id))
      hideModal()
      setTimeout(() => {
         dispatch(getEnquiries())
         toast.success('Deleted!')
      }, 300)
   }
   const setEnquiryStatus = (id: string, value: string) => {
      const data = { id: id, status: value }
      dispatch(updateStatusEnquiry(data))
   }
   const data1: DataType[] = []
   for (let i = 0; i < enquiryState.length; i++) {
      if (enquiryState[i].role !== 'admin') {
         data1.push({
            key: i + 1,
            name: enquiryState[i].name,
            email: enquiryState[i].email,
            mobile: enquiryState[i].mobile,
            select: (
               <>
                  <select
                     defaultValue={enquiryState[i].status ? enquiryState[i].status : 'Submitted'}
                     onChange={(e) => setEnquiryStatus(enquiryState[i]._id, e.target.value)}
                  >
                     <option value="Contacted">Contacted</option>
                     <option value="Submitted">Submitted</option>
                     <option value="In progress">In progress</option>
                     <option value="Resolved">Resolved</option>
                  </select>
               </>
            ),
            action: (
               <>
                  <Button text to={`/admin/enquiry/${enquiryState[i]._id}`}>
                     <AiFillEye className={cx('icon')} />
                  </Button>
                  <Button text onClick={() => showModal(enquiryState[i]._id)}>
                     <AiFillDelete className={cx('icon')} />
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
            <ModalCustom
               title={'This enquiry will be delete?'}
               open={open}
               onOk={() => handleDelete(enqId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default Enquires
