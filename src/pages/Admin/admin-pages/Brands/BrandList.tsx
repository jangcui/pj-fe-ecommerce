import classNames from 'classnames/bind'
import { toast } from 'react-toastify'
import ForwardTable from 'antd/lib/table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'

import Button from '~/components/Button'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { AppDispatch, RootState } from '~/store/store'
import { ItemType } from '~/types/itemStage'
import { deleteBrand, getBrands } from '~/features/brands/brandService'
import ModalCustom from '~/components/ModalCustom'
const cx = classNames.bind(styles)
interface DataType extends ItemType {
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

function BrandList() {
   const dispatch = useDispatch<AppDispatch>()
   const brandState = useSelector((state: RootState) => state.brands.itemList)

   const [brandId, setBrandId] = useState<string>('')
   const [open, setOpen] = useState(false)

   useEffect(() => {
      dispatch(getBrands())
   }, [dispatch])

   const showModal = (value?: string) => {
      setOpen(true)
      if (value) {
         setBrandId(value)
      }
   }

   const hideModal = () => {
      setOpen(false)
   }
   const handleDelete = (id: string) => {
      dispatch(deleteBrand(id))
      hideModal()
      setTimeout(() => {
         dispatch(getBrands())
         toast.success('Deleted!')
      }, 300)
   }
   const data1: DataType[] = []
   for (let i = 0; i < brandState.length; i++) {
      data1.push({
         key: i + 1,
         title: brandState[i].title,
         action: (
            <>
               <Button text to={`/admin/brand/${brandState[i]._id}`}>
                  <BiEdit className={cx('icon')} />
               </Button>
               <Button text onClick={() => showModal(brandState[i]._id)}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
            </>
         ),
      })
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Brand List</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <ForwardTable columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'This brand will be delete?'}
               open={open}
               onOk={() => handleDelete(brandId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default BrandList
