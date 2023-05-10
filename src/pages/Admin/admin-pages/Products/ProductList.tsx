import classNames from 'classnames/bind'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getProducts } from '~/features/products/productsSlice'
import styles from './Products.module.scss'
import Button from '~/layouts/components/Button/Button'
import { AiFillDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { AppDispatch, RootState } from '~/store/store'
import { ProductType } from '~/types/productStage'

const cx = classNames.bind(styles)

interface DataType extends ProductType {
   key: React.Key
   action: JSX.Element
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

function ProductList() {
   const dispatch = useDispatch<AppDispatch>()
   const productData = useSelector((state: RootState) => state.products.product)
   const params = {
      sort: true,
   }
   useEffect(() => {
      dispatch(getProducts(params))
   }, [])

   const data1: DataType[] = []
   for (let i = 0; i < productData.length; i++) {
      if (productData[i].role !== 'admin') {
         data1.push({
            key: i + 1,
            title: productData[i].title,
            slug: productData[i].slug,
            brand: productData[i].brand,
            category: productData[i].category,
            sold: productData[i].sold,
            price: productData[i].price,
            action: (
               <>
                  <Button text to={'/'}>
                     <AiFillDelete className={cx('icon')} />
                  </Button>
                  <Button text to={'/'}>
                     <BiEdit className={cx('icon')} />
                  </Button>
               </>
            ),
         })
      }
   }

   return (
      <div className={cx('wrapper')}>
         <h1>Product List</h1>
         <div className={cx('chart')}>
            <div className={cx('content')}>
               <Table columns={columns} dataSource={data1} />
            </div>
         </div>
      </div>
   )
}

export default ProductList
