import classNames from 'classnames/bind'
import type { SelectProps } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Select as SelectMulti } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import * as Yup from 'yup'

import styles from './Products.module.scss'
import InputCustom from '~/components/InputCustom'
import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/store/store'
import { ItemType } from '~/types/itemStage'
import { uploadImgs } from '~/features/upload/uploadSlice'
import Image from '~/components/Image/Image'
import { ImgType } from '~/types/imageStage'
import { getBrands } from '~/features/brands/brandService'
import { getColors } from '~/features/colors/colorService'
import { getProdCates } from '~/features/prodCategories/productCateService'
import { createProduct, getAProduct, updateAProduct } from '~/features/products/productsService'
import { resetProductState } from '~/features/products/productsSlice'
import { ProductType } from '~/types/productStage'

const cx = classNames.bind(styles)

const productSchema = Yup.object().shape({
   title: Yup.string().required('Title is required'),
   description: Yup.string().required('Description is required'),
   brand: Yup.string().required('Brand is required'),
   tags: Yup.string().required('Tags is required'),
   category: Yup.string().required('Category is required'),
   price: Yup.number().positive().integer().required('Price is required'),
   quantity: Yup.number().positive().integer().required('Quantity is required'),
   color: Yup.array().required('Color is required'),
   images: Yup.array().required('Images is required'),
})

function Product() {
   const dispatch = useDispatch<AppDispatch>()

   const brandState = useSelector((state: RootState) => state.brands.itemList)
   const prodCateState = useSelector((state: RootState) => state.prodCates.itemList)
   const colorState = useSelector((state: RootState) => state.colors.itemList)
   const uploadState = useSelector((state: RootState) => state.uploads)
   const { product, isLoading } = useSelector((state: RootState) => state.products)

   const [color, setColor] = useState<string[]>([])
   const [imgConvert, setImgConvert] = useState<string[]>([])
   const [imgUrl, setImgUrl] = useState<ImgType[]>([])
   const [files, setFiles] = useState<File[]>([])

   const navigate = useNavigate()
   const { slug } = useParams()

   ///////////////////////////////////////
   useEffect(() => {
      dispatch(getBrands())
      dispatch(getProdCates())
      dispatch(getColors())
   }, [dispatch])

   useEffect(() => {
      if (slug !== undefined) {
         dispatch(getAProduct(slug))
      } else {
         setFiles([])
         setImgUrl([])
         setImgConvert([])
         dispatch(resetProductState())
         setColor([])
      }
   }, [slug, dispatch])

   useEffect(() => {
      if (product?.images) {
         setImgUrl(product?.images.map((item: ImgType) => item))
         setImgConvert(product?.images.map((item: ImgType) => item.url))
      }
   }, [product])
   const colorOpt: SelectProps['options'] = []
   colorState?.forEach((color) => {
      colorOpt.push({
         label: color?.title,
         value: color?._id,
      })
   })

   const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
         const url = reader.result as string
         setImgConvert((prev) => [...prev, url])
      }
      setFiles((prev) => [...prev, file])
   }, [])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         title: product?.title ? product?.title : '',
         description: product?.description ? product?.description : '',
         brand: product?.brand ? product?.brand : '',
         tags: product?.tags ? product?.tags : '',
         price: product?.price ? product?.price : 0,
         quantity: product?.quantity ? product?.quantity : 0,
         category: product?.category ? product?.category : '',
         color: product.color && slug !== undefined ? color : [''],
         images: product.images ? product?.images : [],
         price_after_discount: 0,
      },
      validationSchema: productSchema,
      onSubmit: async (values: ProductType) => {
         if (files && files.length > 0) {
            const response = await dispatch(uploadImgs(files))
            const imgValue = await response.payload
            formik.values.images = [...imgUrl, ...imgValue.map((item: ImgType) => item)]
            setImgUrl([...imgUrl, ...imgValue.map((item: ImgType) => item)])
         } else {
            formik.values.images = imgUrl
         }
         if (slug !== undefined) {
            const productUpdate = await dispatch(updateAProduct({ id: product._id || '', body: values }))
            if (productUpdate) {
               navigate('/admin/product-list')
            }
         }
         if (slug === undefined) {
            const product = await dispatch(createProduct(values))
            if (product) {
               setColor([])
               setFiles([])
               setImgConvert([])
               setImgUrl([])
               formik.resetForm()
            }
         }
      },
   })
   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}>{slug !== undefined ? 'Edit' : 'Add'} Product</h1>
         <form className={cx('form')} action="" onSubmit={formik.handleSubmit}>
            <div className={cx('field')}>
               <InputCustom
                  type={'text'}
                  value={formik.values.title}
                  onChange={formik.handleChange('title')}
                  className={cx('input')}
                  onBlur={formik.handleBlur('title')}
                  name="title"
                  placeholder={'Enter Product Title'}
                  lazyLoad={isLoading || uploadState.isLoading}
               />
               <span className={cx('error')}>{formik.touched.title && formik.errors.title}</span>
            </div>
            <div className={cx('field')}>
               <ReactQuill
                  className={cx('editor')}
                  value={formik.values.description}
                  onBlur={() => formik.handleBlur('description')}
                  onChange={formik.handleChange('description')}
               />
               <span className={cx('error')}>{formik.touched.description && formik.errors.description}</span>
            </div>
            <div className={cx('field')}>
               <InputCustom
                  type={'number'}
                  value={+formik.values.price}
                  name={'price'}
                  lazyLoad={isLoading || uploadState.isLoading}
                  className={cx('input')}
                  onChange={formik.handleChange('price')}
                  onBlur={formik.handleBlur('price')}
                  placeholder="Enter Your Price"
               />
               <span className={cx('error')}>{formik.touched.price && formik.errors.price}</span>
            </div>
            <div className={cx('field')}>
               <select
                  name={'brand'}
                  id=""
                  className={cx('form-select')}
                  value={formik.values.brand}
                  onChange={formik.handleChange('brand')}
                  onBlur={formik.handleBlur('brand')}
               >
                  <option>Select Brand</option>
                  {brandState &&
                     brandState.map((el: ItemType, index: number) => (
                        <option key={index} value={el.title}>
                           {el.title}
                        </option>
                     ))}
               </select>
               <span className={cx('error')}>{formik.touched.brand && formik.errors.brand}</span>
            </div>
            <div className={cx('field')}>
               <select
                  name={'category'}
                  id=""
                  value={formik.values.category}
                  onChange={formik.handleChange('category')}
                  onBlur={formik.handleBlur('category')}
                  className={cx('form-select')}
               >
                  <option>Select Category</option>
                  {prodCateState?.map((el: ItemType, index: number) => (
                     <option key={index} value={el.title}>
                        {el.title}
                     </option>
                  ))}
               </select>
               <span className={cx('error')}>{formik.touched.category && formik.errors.category}</span>
            </div>
            <div className={cx('field')}>
               <select
                  name={'tags'}
                  id=""
                  className={cx('form-select')}
                  value={formik.values.tags}
                  onChange={formik.handleChange('tags')}
                  onBlur={formik.handleBlur('tags')}
               >
                  <option value="" disabled>
                     Select Tags
                  </option>
                  <option value="featured ">Featured </option>
                  <option value="popular">Popular</option>
                  <option value="special">Special</option>
               </select>
               <span className={cx('error')}>{formik.touched.tags && formik.errors.tags}</span>
            </div>

            <div className={cx('field')}>
               <SelectMulti
                  loading={isLoading || uploadState.isLoading}
                  mode="multiple"
                  className={cx('select-multi')}
                  allowClear
                  placeholder="Please select"
                  value={color}
                  onChange={(value) => {
                     setColor([...value])
                     formik.setFieldValue('color', value)
                  }}
                  options={colorOpt}
               />
               <span className={cx('error')}>{formik.touched.color && formik.errors.color}</span>
            </div>
            <div className={cx('field')}>
               <InputCustom
                  type={'number'}
                  value={+formik.values.quantity}
                  onChange={formik.handleChange('quantity')}
                  className={cx('input')}
                  name={'quantity'}
                  onBlur={formik.handleBlur('quantity')}
                  placeholder={'Enter Quantity'}
                  lazyLoad={isLoading || uploadState.isLoading}
               />
               <span className={cx('error')}>{formik.touched.quantity && formik.errors.quantity}</span>
            </div>
            <div className={cx('field')}>
               <Dropzone onDrop={onDrop} maxFiles={10}>
                  {({ getRootProps, getInputProps }) => (
                     <section>
                        <div {...getRootProps()} className={cx('upload')}>
                           <input {...getInputProps()} />
                           <p>Drag drop some files here, or click to select files</p>
                           <AiOutlineFileImage className={cx('icon')} />
                        </div>
                     </section>
                  )}
               </Dropzone>
            </div>
            <div className={cx('field')}>
               {imgConvert && <p>Images product appear in here:</p>}
               <div className={cx('img-container')}>
                  {imgConvert?.map((url: string, index) => (
                     <div className={cx('wrap-img')} key={index}>
                        <AiOutlineClose
                           className={cx('btn-remove')}
                           onClick={() => {
                              setFiles((prev) => {
                                 prev.splice(index, 1)
                                 return [...prev]
                              })
                              setImgConvert((prev) => {
                                 prev.splice(index, 1)
                                 return [...prev]
                              })
                              setImgUrl((prev) => {
                                 prev.splice(index, 1)
                                 return [...prev]
                              })
                           }}
                        />
                        <Image className={cx('img-product')} src={url} />
                     </div>
                  ))}
               </div>
            </div>

            <Button className={cx('form-btn')} primary type={'submit'} lazyLoad={isLoading || uploadState.isLoading}>
               {slug !== undefined ? 'Update' : 'Add'} Product
            </Button>
         </form>
      </div>
   )
}

export default Product
