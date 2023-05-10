import classNames from 'classnames/bind'

import styles from '~/components/StyleModule/AdminStyle.module.scss'

const cx = classNames.bind(styles)
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '~/layouts/components/Button/Button'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { AppDispatch, RootState } from '~/store/store'
import { StuffType } from '~/types/stuffStage'
import { deleteProdCate, getProdCates } from '~/features/prodCategories/productCateService'
import { toast } from 'react-toastify'
import ModalCustom from '~/components/ModalCustom/ModalCustom'

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
      sorter: (a: any, b: any) => a.title.length - b.title.length,
   },
   {
      title: 'Action',
      dataIndex: 'action',
   },
]

function Categories() {
   const dispatch = useDispatch<AppDispatch>()
   const prodCateState = useSelector((state: RootState) => state.prodCates.stuff)
   const [blogCateId, setColorId] = useState<string>('')

   useEffect(() => {
      dispatch(getProdCates())
   }, [dispatch])

   const [open, setOpen] = useState(false)

   const showModal = (value?: string) => {
      setOpen(true)
      if (value) {
         setColorId(value)
      }
   }

   const hideModal = () => {
      setOpen(false)
   }
   const handleDelete = async (id?: string) => {
      hideModal()
      await dispatch(deleteProdCate(id))
      setTimeout(() => {
         dispatch(getProdCates())
         toast.success('Deleted!')
      }, 100)
   }
   const data1: DataType[] = []
   for (let i = 0; i < prodCateState.length; i++) {
      data1.push({
         key: i + 1,
         title: prodCateState[i].title,
         action: (
            <>
               <Button text to={`/admin/category/${prodCateState[i]._id}`}>
                  <BiEdit className={cx('icon')} />
               </Button>
               <Button text onClick={() => showModal(prodCateState[i]._id)}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
            </>
         ),
      })
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Categories</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'This brand will be delete?'}
               open={open}
               onOk={() => handleDelete(blogCateId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default Categories
