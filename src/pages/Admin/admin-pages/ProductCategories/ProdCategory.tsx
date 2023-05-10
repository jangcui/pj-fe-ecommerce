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
import { createProdCate, getProdCate, updateAProdCate } from '~/features/prodCategories/productCateService'
import { resetProdCateState } from '~/features/prodCategories/prodCateSlice'

const cx = classNames.bind(styles)

const userSchema = Yup.object().shape({
   title: Yup.string().required('Title is required'),
})

function Categories() {
   const dispatch = useDispatch<AppDispatch>()
   const productState = useSelector((state: RootState) => state.prodCates)
   const navigate = useNavigate()
   const { categoryId } = useParams()
   const { isError, isLoading, isSuccess, itemCreate, name, itemUpdate } = productState

   useEffect(() => {
      if (isSuccess && Object.keys(itemCreate).length) {
         toast.success('Product Category Added Successfully!')
         dispatch(resetProdCateState())
      }
      if (isSuccess && Object.keys(itemUpdate).length) {
         toast.success('Product Category Updated Successfully!')
         navigate('/admin/category-list')
         dispatch(resetProdCateState())
      }
      if (isError) {
         toast.error('Something went wrong')
         dispatch(resetProdCateState())
      }
   }, [isError, isLoading, isSuccess, itemCreate, dispatch, itemUpdate, navigate])

   useEffect(() => {
      if (categoryId !== undefined) {
         dispatch(getProdCate(categoryId))
      } else {
         dispatch(resetProdCateState())
      }
   }, [categoryId, dispatch])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         title: name || '',
      },
      validationSchema: userSchema,
      onSubmit: async (values) => {
         if (categoryId !== undefined) {
            const result = await dispatch(updateAProdCate({ id: categoryId, title: formik.values.title }))
            if (result) {
               formik.values.title = result.payload.title
            }
         } else {
            await dispatch(createProdCate(values))
            formik.resetForm()
         }
      },
   })
   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}> {categoryId !== undefined ? 'Edit' : 'Add'} Product Category</h1>
         <form className={cx('form')} action="" onSubmit={formik.handleSubmit}>
            <InputCustom
               value={formik.values.title}
               onChange={formik.handleChange('title')}
               className={cx('input')}
               placeholder="Enter Product Category"
               lazyLoad={isLoading}
            />
            <p className={cx('err')}>{formik.touched.title && formik.errors.title}</p>
            <Button className={cx('form-btn')} primary type={'submit'}>
               {categoryId !== undefined ? 'Update' : 'Add'} Product Category
            </Button>
         </form>
      </div>
   )
}

export default Categories
