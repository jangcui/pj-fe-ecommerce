import classNames from 'classnames/bind'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '~/layouts/components/Button/Button'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { AppDispatch, RootState } from '~/store/store'
import { BlogType } from '~/types/blogStage'
import { deleteBlog, getBlogs } from '~/features/blogs/blogService'
import ModalCustom from '~/components/ModalCustom/ModalCustom'
import { toast } from 'react-toastify'

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
      await dispatch(deleteBlog(id))
      await dispatch(getBlogs())
      toast.success('Deleted!')
   }
   ////////////////////////////
   useEffect(() => {
      dispatch(getBlogs())
   }, [dispatch])

   const data1: DataType[] = []
   for (let i = 0; i < blogState.length; i++) {
      if (blogState[i].role !== 'admin') {
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
   }
   return (
      <div className={cx('wrapper')}>
         <h1>Blogs List</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>{' '}
            <ModalCustom
               title={'This blog will be delete?'}
               open={open}
               onOk={() => handleDelete(blogId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default BlogsList
