import classNames from 'classnames/bind'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '~/layouts/components/Button/Button'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { AppDispatch, RootState } from '~/store/store'
import { StuffType } from '~/types/stuffStage'
import { deleteBlogCate, getBlogCates } from '~/features/blogCategories/blogCateService'
import { toast } from 'react-toastify'
import ModalCustom from '~/components/ModalCustom/ModalCustom'
const cx = classNames.bind(styles)

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

function BlogCateList() {
   const dispatch = useDispatch<AppDispatch>()
   const blogCateState = useSelector((state: RootState) => state.blogCates.stuff)

   useEffect(() => {
      dispatch(getBlogCates())
   }, [dispatch])

   const [blogCateId, setColorId] = useState<string>('')

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
      await dispatch(deleteBlogCate(id))
      setTimeout(() => {
         dispatch(getBlogCates())
         toast.success('Deleted!')
      }, 100)
   }

   const data1: DataType[] = []
   for (let i = 0; i < blogCateState.length; i++) {
      data1.push({
         key: i + 1,
         title: blogCateState[i].title,
         action: (
            <>
               <Button text to={`/admin/blog-category/${blogCateState[i]._id}`}>
                  <BiEdit className={cx('icon')} />
               </Button>
               <Button text onClick={() => showModal(blogCateState[i]._id)}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
            </>
         ),
      })
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Blogs Categories </h1>
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

export default BlogCateList
