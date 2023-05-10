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
import { resetState } from '~/features/colors/colorSlice'
import { createColor, getColor, updateAColor } from '~/features/colors/colorService'
import { useNavigate, useParams } from 'react-router-dom'

const cx = classNames.bind(styles)

const userSchema = Yup.object().shape({
   title: Yup.string().required('Title is required'),
})

function Color() {
   const dispatch = useDispatch<AppDispatch>()
   const colorState = useSelector((state: RootState) => state.colors)
   const navigate = useNavigate()
   const { colorId } = useParams()
   const { isError, isLoading, isSuccess, itemCreate, name, itemUpdate } = colorState

   useEffect(() => {
      if (isSuccess && Object.keys(itemCreate).length) {
         toast.success('Color Added Successfully!')
         dispatch(resetState())
      }
      if (isSuccess && Object.keys(itemUpdate).length) {
         toast.success('Color Updated Successfully!')
         navigate('/admin/color-list')
         dispatch(resetState())
      }
      if (isError) {
         toast.error('Something went wrong')
         dispatch(resetState())
      }
   }, [isError, isLoading, isSuccess, itemCreate, dispatch, itemUpdate, navigate])

   useEffect(() => {
      if (colorId !== undefined) {
         dispatch(getColor(colorId))
      } else {
         dispatch(resetState())
      }
   }, [colorId, dispatch])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         title: name || '',
      },
      validationSchema: userSchema,
      onSubmit: (values) => {
         if (colorId !== undefined) {
            dispatch(updateAColor({ id: colorId, title: formik.values.title }))
         } else {
            formik.resetForm()
            dispatch(createColor(values))
         }
      },
   })
   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}> {colorId !== undefined ? 'Edit' : 'Add'} Color</h1>
         <form className={cx('form')} action="" onSubmit={formik.handleSubmit}>
            <h2>{formik.values.title}</h2>
            <InputCustom
               type={'color'}
               value={formik.values.title}
               onChange={formik.handleChange('title')}
               className={cx('input')}
               placeholder="Enter Color Title"
            />
            <p className={cx('err')}>{formik.touched.title && formik.errors.title}</p>

            <Button className={cx('form-btn')} primary type={'submit'} lazyLoad={isLoading} disable={isLoading}>
               {colorId !== undefined ? 'Update' : 'Add'} Color
            </Button>
         </form>
      </div>
   )
}

export default Color
