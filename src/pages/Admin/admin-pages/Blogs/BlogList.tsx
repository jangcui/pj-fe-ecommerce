import classNames from 'classnames/bind'
import ForwardTable from 'antd/lib/table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'

import { BiEdit } from 'react-icons/bi'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/store/store'
import { BlogType } from '~/types/blogStage'
import { getBlogs, toggleBlogToTrashBin } from '~/features/blogs/blogService'
import ModalCustom from '~/components/ModalCustom/ModalCustom'

const cx = classNames.bind(styles)

interface DataType extends BlogType {
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
      title: 'Title',
      dataIndex: 'description',
   },
   {
      title: 'Description',
      dataIndex: 'description',
   },
   {
      title: 'Num Views',
      dataIndex: 'numViews',
   },
   {
      title: 'Action',
      dataIndex: 'action',
   },
]

function BlogsList() {
   const dispatch = useDispatch<AppDispatch>()

   const blogState = useSelector((state: RootState) => state.blogs.blogs)

   const [blogId, setBlogId] = useState<string>('')
   const [open, setOpen] = useState(false)

   const showModal = (value?: string) => {
      setOpen(true)
      if (value) {
         setBlogId(value)
      }
   }

   const hideModal = () => {
      setOpen(false)
   }
   const handleDelete = async (id: string) => {
      hideModal()
      await dispatch(toggleBlogToTrashBin(id))
      await dispatch(getBlogs())
      toast.success('Deleted!')
   }
   ////////////////////////////
   useEffect(() => {
      dispatch(getBlogs())
   }, [dispatch])

   const data1: DataType[] = []
   for (let i = 0; i < blogState.length; i++) {
      data1.push({
         key: i + 1,
         title: blogState[i].title,
         description: blogState[i].description,
         category: blogState[i].category,
         numViews: blogState[i].numViews,
         action: (
            <>
               <Button text to={`/admin/blog/${blogState[i]._id}`}>
                  <BiEdit className={cx('icon')} />
               </Button>
               <Button text onClick={() => showModal(blogState[i]._id)}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
            </>
         ),
      })
   }
   return (
      <div className={cx('wrapper')}>
         <h1>Blogs List</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <ForwardTable columns={columns} dataSource={data1} />
            </div>{' '}
            <ModalCustom
               title={'This product will be add to trash bin?'}
               open={open}
               onOk={() => handleDelete(blogId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default BlogsList
