import classNames from 'classnames/bind'
import type { SelectProps } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Select as SelectMulti } from 'antd'
import Dropzone from 'react-dropzone'
import 'react-widgets/styles.css'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import * as Yup from 'yup'
import styles from './Products.module.scss'
import InputCustom from '~/components/InputCustom'
import Button from '~/layouts/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { StuffType } from '~/types/stuffStage'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { uploadImgs } from '~/features/upload/uploadSlice'
import Image from '~/components/Image/Image'
import { ImgType } from '~/types/imageStage'
import { toast } from 'react-toastify'
import { getBrands } from '~/features/brands/brandService'
import { getColors } from '~/features/colors/colorService'
import { getProdCates } from '~/features/prodCategories/productCateService'
import { createProduct, getAProduct, updateAProduct } from '~/features/products/productsService'
import { useNavigate, useParams } from 'react-router-dom'
import { resetProductState } from '~/features/products/productsSlice'

const cx = classNames.bind(styles)

const userSchema = Yup.object().shape({
   title: Yup.string().required('Title is required'),
   description: Yup.string().required('Description is required'),
   brand: Yup.string().required('Brand is required'),
   tags: Yup.string().required('Tags is required'),
   category: Yup.string().required('Category is required'),
   price: Yup.number().positive().integer().required('Price is required'),
   quantity: Yup.number().positive().integer().required('Quantity is required'),
   color: Yup.array().min(1, 'At least 1 ').required('Color is required'),
   images: Yup.array().required('Images is required'),
})

function Product() {
   const dispatch = useDispatch<AppDispatch>()

   const brandState = useSelector((state: RootState) => state.brands.stuff)
   const prodCateState = useSelector((state: RootState) => state.prodCates.stuff)
   const colorState = useSelector((state: RootState) => state.colors.stuff)
   const uploadState = useSelector((state: RootState) => state.uploads)
   const newProduct = useSelector((state: RootState) => state.products)
   const { isError, isLoading, isSuccess, productCreate, productUpdate, product } = newProduct

   const [color, setColor] = useState<string[]>([])
   const [imgConvert, setImgConvert] = useState<string[]>([])
   const [imgUrl, setImgUrl] = useState<ImgType[]>([])
   const [files, setFiles] = useState<File[]>([])

   const navigate = useNavigate()
   const { productId } = useParams()

   ///////////////////////////////////////
   useEffect(() => {
      if (product.images) {
         setImgUrl(product.images.map((item: ImgType) => item))
         setImgConvert(product.images.map((item: ImgType) => item.url))
      }
      if (product.color) {
         setColor(product.color)
      }
   }, [product])

   useEffect(() => {
      dispatch(getBrands())
      dispatch(getProdCates())
      dispatch(getColors())
   }, [dispatch])
   useEffect(() => {
      if (isSuccess && Object.keys(productCreate).length) {
         toast.success('Product Added Successfully!')
         // navigate('/admin/product-list')
         dispatch(resetProductState())
      }
      if (isSuccess && Object.keys(productUpdate).length) {
         toast.success('Product Updated Successfully!')
         navigate('/admin/product-list')
         dispatch(resetProductState())
      }
      if (isError) {
         dispatch(resetProductState())
      }
   }, [isError, isLoading, isSuccess, productCreate, dispatch, productUpdate, navigate])

   useEffect(() => {
      if (productId !== undefined) {
         dispatch(getAProduct(productId))
      } else {
         dispatch(resetProductState())
         setFiles([])
         setImgUrl([])
         setImgConvert([])
         setColor([])
      }
   }, [productId, dispatch])

   const colorOpt: SelectProps['options'] = []
   colorState?.forEach((color) => {
      colorOpt.push({
         label: color.title,
         value: color.title,
      })
   })
   const handleColor = (value: string[]) => {
      setColor(value)
   }
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
         title: product.title || '',
         description: product.description || '',
         brand: product.brand || '',
         tags: product.tags || '',
         price: product.price || 0,
         quantity: product.quantity || 0,
         category: product.category || '',
         color: product.color || [''],
         images: product.images || [],
      },
      validationSchema: userSchema,
      onSubmit: async (values) => {
         if (files && files.length > 0) {
            const response = await dispatch(uploadImgs(files))
            const imgValue = await response.payload
            formik.values.images = [...imgUrl, ...imgValue.map((item: ImgType) => item)]
            formik.values.color = color
            setImgUrl([...imgUrl, ...imgValue.map((item: ImgType) => item)])
         } else {
            formik.values.images = imgUrl
         }
         if (productId !== undefined) {
            dispatch(updateAProduct({ id: productId, body: values }))
         } else {
            dispatch(createProduct(values))
            setFiles([])
            setImgConvert([])
            setColor([])
            formik.resetForm()
         }
      },
   })

   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}>{productId !== undefined ? 'Edit' : 'Add'} Product</h1>
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
               <span className={cx('err')}>{formik.touched.title && formik.errors.title}</span>
            </div>
            <div className={cx('field')}>
               <ReactQuill
                  className={cx('editor')}
                  value={formik.values.description}
                  onBlur={() => formik.handleBlur('description')}
                  onChange={formik.handleChange('description')}
               />
               <span className={cx('err')}>{formik.touched.description && formik.errors.description}</span>
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
               <span className={cx('err')}>{formik.touched.price && formik.errors.price}</span>
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
                     brandState.map((el: StuffType, index: number) => (
                        <option key={index} value={el.title}>
                           {el.title}
                        </option>
                     ))}
               </select>
               <span className={cx('err')}>{formik.touched.brand && formik.errors.brand}</span>
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
                  {prodCateState?.map((el: StuffType, index: number) => (
                     <option key={index} value={el.title}>
                        {el.title}
                     </option>
                  ))}
               </select>
               <span className={cx('err')}>{formik.touched.category && formik.errors.category}</span>
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
                  <option value="feature">Feature</option>
                  <option value="popular">Popular</option>
                  <option value="special">Special</option>
               </select>
               <span className={cx('err')}>{formik.touched.tags && formik.errors.tags}</span>
            </div>

            <div className={cx('field')}>
               <SelectMulti
                  loading={isLoading || uploadState.isLoading}
                  mode="multiple"
                  className={cx('select-multi')}
                  allowClear
                  placeholder="Please select"
                  value={color}
                  onChange={(value) => handleColor(value)}
                  options={colorOpt}
               />
               <span className={cx('err')}>{formik.touched.color && formik.errors.color}</span>
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
               <span className={cx('err')}>{formik.touched.quantity && formik.errors.quantity}</span>
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
                           className={cx('icon-remove')}
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
               {productId !== undefined ? 'Update' : 'Add'} Product
            </Button>
         </form>
      </div>
   )
}

export default Product
