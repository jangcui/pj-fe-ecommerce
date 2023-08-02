import classNames from 'classnames/bind'

import { toast } from 'react-toastify'
import ForwardTable from 'antd/lib/table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Button from '~/components/Button/Button'
import { TiDelete } from 'react-icons/ti'
import { BsArrowReturnLeft } from 'react-icons/bs'

import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { AppDispatch, RootState } from '~/store/store'
import { ItemType } from '~/types/itemStage'
import ModalCustom from '~/components/ModalCustom'
import { getProductTrash } from '~/features/trashBin/trashBinService'
import { deleteProduct, toggleProductToTrashBin } from '~/features/products/productsService'

const cx = classNames.bind(styles)

interface DataType extends ItemType {
   key: React.Key
   action: JSX.Element
   category?: string
   brand?: string
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
      title: 'Brand',
      dataIndex: 'brand',
   },
   {
      title: 'Category',
      dataIndex: 'category',
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

function ProductsTrash() {
   const dispatch = useDispatch<AppDispatch>()
   const trashState = useSelector((state: RootState) => state.trashBin.products)
   const [productId, setProductId] = useState<string>('')

   const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
   const [openModalReturn, setOpenModalReturn] = useState<boolean>(false)

   useEffect(() => {
      dispatch(getProductTrash())
   }, [dispatch])

   const showModalDelete = (value?: string) => {
      setOpenModalDelete(true)
      if (value) {
         setProductId(value)
      }
   }
   const showModalReturn = (value?: string) => {
      setOpenModalReturn(true)
      if (value) {
         setProductId(value)
      }
   }
   const handleDelete = async (id: string) => {
      setOpenModalDelete(false)
      await dispatch(deleteProduct(id))
      setTimeout(() => {
         dispatch(getProductTrash())
         toast.success('Delete!')
      }, 100)
   }

   const handleReturn = async (id?: string) => {
      if (id) {
         setOpenModalReturn(false)
         await dispatch(toggleProductToTrashBin(id))
         setTimeout(() => {
            dispatch(getProductTrash())
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
         brand: trashState[i].brand,
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
         <h1>Products Trash</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <ForwardTable columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'Delete Now?'}
               open={openModalDelete}
               onOk={() => handleDelete(productId)}
               onCancel={() => setOpenModalDelete(false)}
            />
            <ModalCustom
               title={'Remove from Trash Bin?'}
               open={openModalReturn}
               onOk={() => handleReturn(productId)}
               onCancel={() => setOpenModalReturn(false)}
            />
         </div>
      </div>
   )
}

export default ProductsTrash
