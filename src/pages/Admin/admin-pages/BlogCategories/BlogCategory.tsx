import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
import InputCustom from '~/components/InputCustom/InputCustom'
import { useEffect } from 'react'

import Button from '~/layouts/components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { createBlogCate, getBlogCate, updateABlogCate } from '~/features/blogCategories/blogCateService'
import { resetState } from '~/features/blogCategories/blogCateSlice'

const cx = classNames.bind(styles)

const userSchema = Yup.object().shape({
   title: Yup.string().required('Title is required'),
})

function BlogCategory() {
   const dispatch = useDispatch<AppDispatch>()
   const blogCateState = useSelector((state: RootState) => state.blogCates)
   const navigate = useNavigate()
   const { blogCateId } = useParams()
   const { isError, isLoading, isSuccess, itemCreate, name, itemUpdate } = blogCateState

   useEffect(() => {
      if (isSuccess && Object.keys(itemCreate).length) {
         toast.success('Color Added Successfully!')
         dispatch(resetState())
      }
      if (isSuccess && Object.keys(itemUpdate).length) {
         toast.success('Color Updated Successfully!')
         navigate('/admin/blog-category-list')
         dispatch(resetState())
      }
      if (isError) {
         toast.error('Something went wrong')
         dispatch(resetState())
      }
   }, [isError, isLoading, isSuccess, itemCreate, dispatch, itemUpdate, navigate])

   useEffect(() => {
      if (blogCateId !== undefined) {
         dispatch(getBlogCate(blogCateId))
      } else {
         dispatch(resetState())
      }
   }, [blogCateId, dispatch])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         title: name || '',
      },
      validationSchema: userSchema,
      onSubmit: async (values) => {
         if (blogCateId !== undefined) {
            const result = await dispatch(updateABlogCate({ id: blogCateId, title: formik.values.title }))
            if (result) {
               formik.values.title = result.payload.title
            }
         } else {
            formik.resetForm()
            await dispatch(createBlogCate(values))
         }
      },
   })
   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}>{blogCateId !== undefined ? 'Edit' : 'Add'} Blog Category</h1>
         <form className={cx('form')} action="" onSubmit={formik.handleSubmit}>
            <InputCustom
               value={formik.values.title}
               onChange={formik.handleChange('title')}
               className={cx('input')}
               placeholder="Enter Brand Title"
               lazyLoad={isLoading}
            />
            <p className={cx('err')}>{formik.touched.title && formik.errors.title}</p>

            <Button className={cx('form-btn')} primary type={'submit'}>
               {blogCateId !== undefined ? 'Update' : 'Add'} Blog Category
            </Button>
         </form>
      </div>
   )
}

export default BlogCategory
