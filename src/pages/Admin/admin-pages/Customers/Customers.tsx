import classNames from 'classnames/bind'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
const cx = classNames.bind(styles)
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '~/store/store'
import { getUsers, toggleCustomerToTrashBin } from '~/features/admin/adminService'
import Button from '~/components/Button/Button'
import ModalCustom from '~/components/ModalCustom/ModalCustom'
import { toast } from 'react-toastify'
import { AiFillDelete } from 'react-icons/ai'

interface DataType {
   key: React.Key
   name: string
   email: string
   mobile: string
   blocked: string
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
   {
      title: 'Action',
      dataIndex: 'action',
   },
]

function Customers() {
   const dispatch = useDispatch<AppDispatch>()

   const userState = useSelector((state: RootState) => state.auth.userList)
   const [blogId, setBlogId] = useState<string>('')
   const [open, setOpen] = useState(false)
   const showModal = (value?: string) => {
      setOpen(true)
      if (value) {
         setBlogId(value)
      }
   }
   useEffect(() => {
      dispatch(getUsers())
   }, [dispatch])
   const hideModal = () => {
      setOpen(false)
   }
   const handleDelete = async (id: string) => {
      hideModal()
      await dispatch(toggleCustomerToTrashBin(id))
      toast.success('Deleted!')
      await dispatch(getUsers())
   }

   const data1: DataType[] = []
   if (userState) {
      for (let i = 0; i < userState.length; i++) {
         if (userState[i].role !== 'admin') {
            data1.push({
               key: i + 1,
               name: ` ${userState[i].fist_name} ${userState[i].last_name} `,
               email: userState[i].email,
               mobile: userState[i].mobile,
               blocked: `${userState[i].isBlocked}`,
               action: (
                  <>
                     {/* <Button text to={`/admin/blog/${userState[i]._id}`}>
                        <BiEdit className={cx('icon')} />
                     </Button> */}
                     <Button text onClick={() => showModal(userState[i]._id)}>
                        <AiFillDelete className={cx('icon')} />
                     </Button>
                  </>
               ),
            })
         }
      }
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Customers</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'Remove from trash bin?'}
               open={open}
               onOk={() => handleDelete(blogId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default Customers
