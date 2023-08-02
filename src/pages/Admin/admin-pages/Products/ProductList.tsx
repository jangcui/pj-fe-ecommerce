import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import ForwardTable from 'antd/lib/table/Table'
import { useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { toast } from 'react-toastify'

import styles from './Products.module.scss'
import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/store/store'
import { ParamsType } from '~/types/paramsStage'
import ModalCustom from '~/components/ModalCustom'
import { getProducts, toggleProductToTrashBin } from '~/features/products/productsService'

const cx = classNames.bind(styles)

interface DataType {
   key: React.Key
   action: JSX.Element
   title: string
   slug?: string
   brand: string
   category: string
   sold?: number
   price: number
}

const columns: any = [
   {
      title: 'SNo',
      dataIndex: 'key',
   },
   {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a: any, b: any) => a.title.length - b.title.length,
   },
   {
      title: 'Slug',
      dataIndex: 'slug',
      sorter: (a: any, b: any) => a.slug.length - b.slug.length,
   },

   {
      title: 'Brand',
      dataIndex: 'brand',
   },
   {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a: any, b: any) => a.category.length - b.category.length,
   },

   {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a: any, b: any) => a.price - b.price,
   },
   {
      title: 'Sold',
      dataIndex: 'sold',
   },
   {
      title: 'Action',
      dataIndex: 'action',
   },
]
const params: ParamsType = {}
function ProductList() {
   const dispatch = useDispatch<AppDispatch>()
   const productData = useSelector((state: RootState) => state.products.productList)
   const [productId, setProductId] = useState<string>('')

   useEffect(() => {
      dispatch(getProducts(params))
   }, [dispatch])

   const [open, setOpen] = useState(false)

   const showModal = (value?: string) => {
      setOpen(true)
      if (value) {
         setProductId(value)
      }
   }

   const hideModal = () => {
      setOpen(false)
   }
   const handleDelete = async (id: string) => {
      hideModal()
      await dispatch(toggleProductToTrashBin(id))
      setTimeout(() => {
         dispatch(getProducts(params))
         toast.success('Product added to trash bin!')
      }, 100)
   }
   const data1: DataType[] = []
   for (let i = 0; i < productData.length; i++) {
      data1.push({
         key: i + 1,
         title: productData[i]?.title,
         slug: productData[i]?.slug,
         brand: productData[i]?.brand,
         category: productData[i]?.category,
         sold: productData[i]?.sold,
         price: productData[i]?.price,
         action: (
            <>
               <Button text to={`/admin/product/${productData[i]?.slug}`}>
                  <BiEdit className={cx('icon')} />
               </Button>
               <Button text onClick={() => showModal(productData[i]?._id)}>
                  <AiFillDelete className={cx('icon')} />
               </Button>
            </>
         ),
      })
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Product List</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <ForwardTable columns={columns} dataSource={data1} />
            </div>
            <ModalCustom
               title={'This blog will be add to trash bin?'}
               open={open}
               onOk={() => handleDelete(productId)}
               onCancel={hideModal}
            />
         </div>
      </div>
   )
}

export default ProductList
