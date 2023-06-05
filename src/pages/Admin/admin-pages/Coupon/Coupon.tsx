import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
import InputCustom from '~/components/InputCustom/InputCustom'
import { useEffect } from 'react'

import Button from '~/components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { toast } from 'react-toastify'
import { createCoupon, getCoupon, updateACoupon } from '~/features/coupon/couponService'
import { useNavigate, useParams } from 'react-router-dom'
import { resetCouponState } from '~/features/coupon/couponSlice'

const cx = classNames.bind(styles)

const couponSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
   expiry: Yup.date().required('Expiry is required'),
   discount: Yup.number().positive().integer().required('Discount is required'),
})

function AddCoupon() {
   const dispatch = useDispatch<AppDispatch>()
   const colorState = useSelector((state: RootState) => state.coupons)
   const navigate = useNavigate()
   const { couponId } = useParams()
   const { isError, isLoading, isSuccess, couponCreate, couponUpdate, coupon } = colorState

   useEffect(() => {
      if (isSuccess && Object.keys(couponCreate).length) {
         toast.success('Coupon Added Successfully!')
         dispatch(resetCouponState())
      }
      if (isSuccess && Object.keys(couponUpdate).length) {
         toast.success('Coupon Updated Successfully!')
         navigate('/admin/coupon-list')
         dispatch(resetCouponState())
      }
      if (isError) {
         toast.error('Something went wrong')
         dispatch(resetCouponState())
      }
   }, [isError, isLoading, isSuccess, couponCreate, dispatch, couponUpdate, navigate])

   useEffect(() => {
      if (couponId !== undefined) {
         dispatch(getCoupon(couponId))
      } else {
         dispatch(resetCouponState())
      }
   }, [couponId, dispatch])
   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         name: coupon?.name ? coupon?.name : '',
         expiry: coupon?.expiry ? new Date(coupon.expiry).toISOString().substring(0, 10) : '',
         discount: coupon?.discount ? coupon?.discount : 0,
      },
      validationSchema: couponSchema,
      onSubmit: async (values) => {
         if (couponId !== undefined) {
            dispatch(updateACoupon({ id: couponId, body: values }))
         } else {
            await dispatch(createCoupon(values))
            formik.resetForm()
         }
      },
   })

   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('name')}>{couponId !== undefined ? 'Edit' : 'Add'} Coupon</h1>
         <form className={cx('form')} action="" onSubmit={formik.handleSubmit}>
            <div className={cx('field')}>
               <InputCustom
                  type={'text'}
                  value={formik.values.name}
                  onChange={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  className={cx('input')}
                  placeholder="Enter Name Coupon"
                  lazyLoad={isLoading}
               />
               <p className={cx('error')}>{formik.touched.name && formik.errors.name}</p>
            </div>
            <div className={cx('field')}>
               <InputCustom
                  type={'date'}
                  value={formik.values.expiry.toString()}
                  onChange={formik.handleChange('expiry')}
                  onBlur={formik.handleBlur('expiry')}
                  className={cx('input')}
                  placeholder="Enter Expiry"
               />
               <p className={cx('error')}>{formik.touched.expiry && formik.errors.expiry}</p>
            </div>
            <div className={cx('field')}>
               <InputCustom
                  type={'number'}
                  value={formik.values.discount}
                  onChange={formik.handleChange('discount')}
                  className={cx('input')}
                  onBlur={formik.handleBlur('discount')}
                  placeholder="Enter Expiry"
                  lazyLoad={isLoading}
               />
               <p className={cx('error')}>{formik.touched.discount && formik.errors.discount}</p>
            </div>
            <Button className={cx('form-btn')} primary type={'submit'}>
               {couponId !== undefined ? 'Update' : 'Add'} Coupon
            </Button>
         </form>
      </div>
   )
}

export default AddCoupon
