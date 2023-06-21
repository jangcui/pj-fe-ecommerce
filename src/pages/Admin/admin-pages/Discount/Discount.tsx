import classNames from 'classnames/bind'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import { useEffect } from 'react'

import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/store/store'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
import InputCustom from '~/components/InputCustom/InputCustom'
import { createDiscount, getDiscount, updateADiscount } from '~/features/discount/discountService'
import { resetDiscountState } from '~/features/discount/discountSlice'

const cx = classNames.bind(styles)

const couponSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
   expiry: Yup.date().required('Expiry is required'),
   percentage: Yup.number().positive().integer().required('Discount is required'),
})

function CreateDiscount() {
   const dispatch = useDispatch<AppDispatch>()
   const { isLoading, discount } = useSelector((state: RootState) => state.discount)
   const navigate = useNavigate()
   const { discountId } = useParams()

   useEffect(() => {
      if (discountId !== undefined) {
         dispatch(getDiscount(discountId))
      } else {
         dispatch(resetDiscountState())
      }
   }, [discountId, dispatch])
   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         name: discount?.name ? discount?.name : '',
         expiry: discount?.expiry ? new Date(discount.expiry).toISOString().substring(0, 10) : '',
         percentage: discount?.percentage ? discount?.percentage : 0,
      },
      validationSchema: couponSchema,
      onSubmit: async (values) => {
         if (discountId !== undefined) {
            await dispatch(updateADiscount({ id: discountId, body: values }))
            navigate('/admin/discount-list')
         } else {
            await dispatch(createDiscount(values))
            formik.resetForm()
         }
      },
   })

   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('name')}>{discountId !== undefined ? 'Edit' : 'Create New'} discount</h1>
         <form className={cx('form')} action="" onSubmit={formik.handleSubmit}>
            <div className={cx('field')}>
               <h4>Name Event :</h4>
               <InputCustom
                  type={'text'}
                  value={formik.values.name}
                  onChange={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  className={cx('input')}
                  placeholder="Enter Discount Code"
                  lazyLoad={isLoading}
               />
               <p className={cx('error')}>{formik.touched.name && formik.errors.name}</p>
            </div>
            <div className={cx('field')}>
               <h4>Expiry :</h4>
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
               <h4>Percent Discount(%) :</h4>
               <InputCustom
                  type={'number'}
                  value={formik.values.percentage}
                  onChange={formik.handleChange('percentage')}
                  className={cx('input')}
                  onBlur={formik.handleBlur('percentage')}
                  placeholder="Enter Expiry"
                  lazyLoad={isLoading}
               />
               <p className={cx('error')}>{formik.touched.percentage && formik.errors.percentage}</p>
            </div>
            <Button className={cx('form-btn')} primary type={'submit'}>
               {discountId !== undefined ? 'Update' : 'Create New'} Coupon
            </Button>
         </form>
      </div>
   )
}

export default CreateDiscount
