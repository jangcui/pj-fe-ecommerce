import classNames from 'classnames/bind'

import styles from '~/components/StyleModule/AdminStyle.module.scss'

const cx = classNames.bind(styles)
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '~/components/Button/Button'
import { AiFillDelete } from 'react-icons/ai'
import { StuffType } from '~/types/stuffStage'
import { AppDispatch, RootState } from '~/store/store'
import ModalCustom from '~/components/ModalCustom/ModalCustom'
import { toast } from 'react-toastify'
import { deleteColor, getColors } from '~/features/colors/colorService'
import { BiEdit } from 'react-icons/bi'

interface DataType extends StuffType {
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
      dataIndex: 'title',
   },
   {
      title: 'Action',
      dataIndex: 'action',
   },
]

function ColorList() {
   const dispatch = useDispatch<AppDispatch>()
   const colorState = useSelector((state: RootState) => state.colors.stuff)
   const [colorId, setColorId] = useState<string>('')

   const [open, setOpen] = useState(false)

   useEffect(() => {
      dispatch(getColors())
   }, [dispatch])

   const showModal = (value?: string) => {
      setOpen(true)
      if (value) {
         setColorId(value)
      }
   }

   const hideModal = () => {
      setOpen(false)
   }
   const handleDelete = (id: string) => {
      dispatch(deleteColor(id))
      hideModal()
      setTimeout(() => {
         dispatch(getColors())
      }, 200)
      toast.success('Deleted!')
   }

   const data1: DataType[] = []
   for (let i = 0; i < colorState.length; i++) {
      data1.push({
         key: i + 1,
         title: colorState[i].title,
         action: (
            <>
               <Button text to={`/admin/color/${colorState[i]._id}`}>
                  <BiEdit className={cx('icon')} />
               </Button>
               <Button text onClick={() => showModal(colorState[i]._id)}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
            </>
         ),
      })
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Color List</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'This brand will be delete?'}
               open={open}
               onOk={() => handleDelete(colorId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default ColorList
