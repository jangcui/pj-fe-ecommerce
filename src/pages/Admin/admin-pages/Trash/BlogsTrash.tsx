import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { BsArrowReturnLeft } from 'react-icons/bs'
import { TiDelete } from 'react-icons/ti'
import ForwardTable from 'antd/lib/table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import ModalCustom from '~/components/ModalCustom'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { deleteBlog, toggleBlogToTrashBin } from '~/features/blogs/blogService'
import { geBlogsTrash } from '~/features/trashBin/trashBinService'
import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/store/store'
import { BlogType } from '~/types/blogStage'

const cx = classNames.bind(styles)

interface DataType extends BlogType {
   key: React.Key
   action: JSX.Element
   deadline: string
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
      title: 'Category',
      dataIndex: 'category',
   },
   {
      title: 'Num Views',
      dataIndex: 'numViews',
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

function BlogsTrash() {
   const dispatch = useDispatch<AppDispatch>()
   const trashState = useSelector((state: RootState) => state.trashBin.blogs)
   const [blogId, setBlogId] = useState<string>('')
   const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
   const [openModalReturn, setOpenModalReturn] = useState<boolean>(false)

   useEffect(() => {
      dispatch(geBlogsTrash())
   }, [dispatch])

   const showModalDelete = (value?: string) => {
      setOpenModalDelete(true)
      if (value) {
         setBlogId(value)
      }
   }
   const showModalReturn = (value?: string) => {
      setOpenModalReturn(true)
      if (value) {
         setBlogId(value)
      }
   }

   const handleDelete = async (id: string) => {
      setOpenModalDelete(false)
      await dispatch(deleteBlog(id))
      setTimeout(() => {
         dispatch(geBlogsTrash())
         toast.success('Delete!')
      }, 100)
   }

   const handleReturn = async (id?: string) => {
      if (id) {
         setOpenModalReturn(false)
         await dispatch(toggleBlogToTrashBin(id))
         setTimeout(() => {
            dispatch(geBlogsTrash())
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
         title: trashState[i].title,
         category: trashState[i].category,
         numViews: trashState[i].numViews,
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
         <h1>Blogs Trash</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <ForwardTable columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'Delete Now?'}
               open={openModalDelete}
               onOk={() => handleDelete(blogId)}
               onCancel={() => setOpenModalDelete(false)}
            />
            <ModalCustom
               title={'Remove from Trash Bin?'}
               open={openModalReturn}
               onOk={() => handleReturn(blogId)}
               onCancel={() => setOpenModalReturn(false)}
            />
         </div>
      </div>
   )
}

export default BlogsTrash
