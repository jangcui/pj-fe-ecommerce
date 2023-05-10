import classNames from 'classnames/bind'
import { useState, useCallback, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Dropzone from 'react-dropzone'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import styles from './Blog.module.scss'

import InputCustom from '~/components/InputCustom'
import Button from '~/layouts/components/Button'
import { AiOutlineClose, AiOutlineFileImage } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { uploadImgs } from '~/features/upload/uploadSlice'
import { ImgType } from '~/types/imageStage'
import Image from '~/components/Image/Image'
import { StuffType } from '~/types/stuffStage'
import { createBlog, getBlog, updateABlog } from '~/features/blogs/blogService'
import { useNavigate, useParams } from 'react-router-dom'
import { resetState } from '~/features/blogs/blogsSlice'
import { toast } from 'react-toastify'
import { getBlogCates } from '~/features/blogCategories/blogCateService'

const cx = classNames.bind(styles)

const userSchema = Yup.object().shape({
   title: Yup.string().required('Title is required'),
   description: Yup.string().required('Description is required'),
   category: Yup.string().required('Category is required'),
   images: Yup.array().required('Images is required'),
})

function CreateBlog() {
   const dispatch = useDispatch<AppDispatch>()
   const blogCateState = useSelector((state: RootState) => state.blogCates.stuff)
   const blogState = useSelector((state: RootState) => state.blogs)
   const { isError, isLoading, isSuccess, blog, blogUpdate, blogCreate } = blogState

   const [imgConvert, setImgConvert] = useState<string[]>([])
   const [imgUrl, setImgUrl] = useState<ImgType[]>([])
   const [files, setFiles] = useState<File[]>([])

   const navigate = useNavigate()
   const { blogId } = useParams()

   useEffect(() => {
      dispatch(getBlogCates())
   }, [dispatch])

   useEffect(() => {
      if (isSuccess && Object.keys(blogCreate).length) {
         toast.success('Blog Added Successfully!')
         // navigate('/admin/blog-list')
         dispatch(resetState())
      }
      if (isSuccess && Object.keys(blogUpdate).length) {
         toast.success('Blog Updated Successfully!')
         // navigate('/admin/blog-list')
         dispatch(resetState())
      }
      if (isError) {
         toast.error('Something went wrong')
         dispatch(resetState())
      }
   }, [isError, isLoading, isSuccess, blogCreate, dispatch, blogUpdate, navigate])

   useEffect(() => {
      if (blogId !== undefined) {
         dispatch(getBlog(blogId))
      } else {
         dispatch(resetState())
         setImgConvert([])
         setFiles([])
      }
   }, [blogId, dispatch])

   useEffect(() => {
      if (blog.images) {
         setImgUrl(blog.images.map((item: ImgType) => item))
         setImgConvert(blog.images.map((item: ImgType) => item.url))
      }
   }, [blog])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         title: blog?.title || '',
         description: blog?.description || '',
         category: blog?.category || '',
         images: blog?.images || [],
      },
      validationSchema: userSchema,
      onSubmit: async (values) => {
         if (files && files.length > 0) {
            const response = await dispatch(uploadImgs(files))
            const imgValue = await response.payload
            formik.values.images = [...imgUrl, ...imgValue.map((item: ImgType) => item)]
            setImgUrl([...imgUrl, ...imgValue.map((item: ImgType) => item)])
         } else {
            formik.values.images = imgUrl
         }
         if (blogId !== undefined) {
            dispatch(updateABlog({ id: blogId, body: values }))
            setFiles([])
         } else {
            dispatch(createBlog(values))
            setFiles([])
            setImgConvert([])
            formik.resetForm()
         }
      },
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

   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}>{blogId !== undefined ? 'Edit' : 'Add'} Blog</h1>
         <form className={cx('form')} action="" onSubmit={formik.handleSubmit}>
            <div className={cx('field')}>
               <InputCustom
                  type={'text'}
                  value={formik.values.title}
                  onChange={formik.handleChange('title')}
                  className={cx('input')}
                  onBlur={formik.handleBlur('title')}
                  name="title"
                  placeholder={'Enter Blog Title'}
                  lazyLoad={isLoading}
               />
               <span className={cx('err')}>{formik.touched.title && formik.errors.title}</span>
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
                  {blogCateState?.map((el: StuffType, index: number) => (
                     <option key={index} value={el.title}>
                        {el.title}
                     </option>
                  ))}
               </select>
               <span className={cx('err')}>{formik.touched.category && formik.errors.category}</span>
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
            <Button className={cx('form-btn')} primary type={'submit'} lazyLoad={isLoading}>
               {blogId !== undefined ? 'Update' : 'Add'} Blog
            </Button>
         </form>
      </div>
   )
}

export default CreateBlog
