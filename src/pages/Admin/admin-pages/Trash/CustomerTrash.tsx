import classNames from 'classnames/bind'

import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ModalCustom from '~/components/ModalCustom/ModalCustom'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { deleteAUser, toggleCustomerToTrashBin } from '~/features/admin/adminService'
import { getCustomersTrash } from '~/features/trashBin/trashBinService'
import Button from '~/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'

const cx = classNames.bind(styles)

interface DataType {
   key: React.Key
   name: string
   email: string
   mobile: string
   deadline: string
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
      title: 'Auto Delete',
      dataIndex: 'deadline',
   },
   {
      title: 'Action',
      dataIndex: 'action',
   },
]

function CustomerTrash() {
   const dispatch = useDispatch<AppDispatch>()
   const trashState = useSelector((state: RootState) => state.trashBin.customers)
   const [userId, setUserId] = useState<string>('')

   const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
   const [openModalReturn, setOpenModalReturn] = useState<boolean>(false)

   useEffect(() => {
      dispatch(getCustomersTrash())
   }, [dispatch])

   const showModalDelete = (value?: string) => {
      setOpenModalDelete(true)
      if (value) {
         setUserId(value)
      }
   }
   const showModalReturn = (value?: string) => {
      setOpenModalReturn(true)
      if (value) {
         setUserId(value)
      }
   }

   const handleDelete = async (id: string) => {
      setOpenModalDelete(false)
      await dispatch(deleteAUser(id))
      setTimeout(() => {
         dispatch(getCustomersTrash())
      }, 100)
   }

   const handleReturn = async (id?: string) => {
      if (id) {
         setOpenModalReturn(false)
         await dispatch(toggleCustomerToTrashBin(id))
         setTimeout(() => {
            dispatch(getCustomersTrash())
            toast.success('Remove!')
         }, 100)
      }
   }
   const data1: DataType[] = []
   for (let i = 0; i < trashState.length; i++) {
      const currentDate: Date = new Date()
      const deleteDate = new Date(trashState[i]?.deleteDate)
      const deadline = Math.floor((deleteDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24))

      data1.push({
         key: i + 1,
         name: ` ${trashState[i].fist_name} ${trashState[i].last_name} `,
         email: trashState[i].email,
         mobile: trashState[i].mobile,
         blocked: `${trashState[i].isBlocked}`,
         deadline: `After ${deadline} days`,
         action: (
            <>
               <Button text onClick={() => showModalReturn(trashState[i]._id)}>
                  <BsArrowReturnLeft style={{ width: '24px', height: '24px', marginRight: '10px' }} />
               </Button>
               <Button text onClick={() => showModalDelete(trashState[i]._id)}>
                  <TiDelete className={cx('icon')} style={{ width: '30px', height: '30px' }} />
               </Button>
            </>
         ),
      })
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Customers Trash</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'Delete Now?'}
               open={openModalDelete}
               onOk={() => handleDelete(userId)}
               onCancel={() => setOpenModalDelete(false)}
            />
            <ModalCustom
               title={'Remove from Trash Bin?'}
               open={openModalReturn}
               onOk={() => handleReturn(userId)}
               onCancel={() => setOpenModalReturn(false)}
            />
         </div>
      </div>
   )
}

export default CustomerTrash
