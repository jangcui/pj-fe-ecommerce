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
import { createBrand, getBrand, updateABrand } from '~/features/brands/brandService'
import { resetBrandState } from '~/features/brands/brandsSlice'

const cx = classNames.bind(styles)

const userSchema = Yup.object().shape({
   title: Yup.string().required('Title is required'),
})

function Brand() {
   const dispatch = useDispatch<AppDispatch>()
   const brandState = useSelector((state: RootState) => state.brands)
   const navigate = useNavigate()
   const { brandId } = useParams()
   const { isError, isLoading, isSuccess, itemCreate, name, itemUpdate } = brandState

   useEffect(() => {
      if (isSuccess && Object.keys(itemCreate).length) {
         toast.success('Brand Added Successfully!')
         dispatch(resetBrandState())
      }
      if (isSuccess && Object.keys(itemUpdate).length) {
         toast.success('Brand Updated Successfully!')
         navigate('/admin/brand-list')
         dispatch(resetBrandState())
      }
      if (isError) {
         toast.error('Something went wrong')
         dispatch(resetBrandState())
      }
   }, [isError, isLoading, isSuccess, itemCreate, dispatch, itemUpdate, navigate])

   useEffect(() => {
      if (brandId !== undefined) {
         dispatch(getBrand(brandId))
      } else {
         dispatch(resetBrandState())
      }
   }, [brandId, dispatch])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         title: name || '',
      },
      validationSchema: userSchema,
      onSubmit: async (values) => {
         if (brandId !== undefined) {
            dispatch(updateABrand({ id: brandId, title: formik.values.title }))
         } else {
            await dispatch(createBrand(values))
            formik.resetForm()
         }
      },
   })

   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}>{brandId !== undefined ? 'Edit' : 'Add'} Brand.</h1>
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
               {brandId !== undefined ? 'Update' : 'Add'} Brand.
            </Button>
         </form>
      </div>
   )
}

export default Brand
