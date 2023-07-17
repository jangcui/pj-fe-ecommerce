import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { useEffect, useState } from 'react'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import Button from '~/components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'

import { applyDiscount, getProducts } from '~/features/products/productsService'
import { Typeahead } from 'react-bootstrap-typeahead'
import { getDiscounts } from '~/features/discount/discountService'
import { DiscountType } from '~/types/couponStage'

const cx = classNames.bind(styles)

const discountSchema = Yup.object().shape({
   nameProduct: Yup.string().required('Product is required'),
   discountCode: Yup.string().required('Discount Code is required'),
})
interface SearchProductType {
   product: string
   name: string
}
function ApplyDiscountCode() {
   const dispatch = useDispatch<AppDispatch>()
   const { productList } = useSelector((state: RootState) => state.products)
   const { discounts, isLoading } = useSelector((state: RootState) => state.discount)

   const [productOpt, setProductOpt] = useState<SearchProductType[]>([])
   const [productName, setProductName] = useState<string>('')

   useEffect(() => {
      dispatch(getProducts({}))
      dispatch(getDiscounts())
   }, [dispatch])

   useEffect(() => {
      const data = productList?.map((element) => ({
         product: element?.slug || ' ',
         name: element?.title || ' ',
      }))
      setProductOpt(data)
   }, [productList])
   console.log(productName)
   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         nameProduct: productName,
         discountCode: '',
      },
      validationSchema: discountSchema,
      onSubmit: async (values) => {
         await dispatch(applyDiscount({ discountCode: values.discountCode, nameProduct: values.nameProduct.trim() }))
         formik.resetForm()
      },
   })
   const handleValues = (value: any) => {
      if (value.length > 0) {
         setProductName(value[0].product)
      }
   }
   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}> Apply Discount code for product.</h1>
         <form className={cx('form')} action="" onSubmit={formik.handleSubmit}>
            <h3>Enter Name Product:</h3>
            <Typeahead
               id="pagination-example"
               options={productOpt}
               onChange={(e) => handleValues(e)}
               inputProps={{
                  style: {
                     padding: '8px',
                     borderRadius: '4px 0 0 4px',
                     fontWeight: 600,
                     fontSize: '16px',
                     color: '#000',
                     width: '100%',
                  },
               }}
               labelKey={'name'}
               placeholder="Search for product here..."
            />
            <span className={cx('error')}>{formik.touched.nameProduct && formik.errors.nameProduct}</span>

            <h3 className="mt-4">Enter Discount Code:</h3>

            <select
               name={'discountCode'}
               className="form-select form-select-lg mb-3"
               value={formik.values.discountCode}
               onChange={formik.handleChange('discountCode')}
               onBlur={formik.handleBlur('discountCode')}
            >
               <option>Select One</option>
               {discounts?.map((el: DiscountType, index: number) => (
                  <option key={index} value={el.name}>
                     {el.name} (-{el.percentage}%) ---- Expiry:{' '}
                     {`${new Date(el.expiry as Date)
                        .toLocaleString('vi-VN', {
                           hour12: true,
                           year: 'numeric',
                           month: '2-digit',
                           day: '2-digit',
                        })
                        .replace(' ', ', ')}`}
                  </option>
               ))}
            </select>

            <p className={cx('error')}>{formik.touched.discountCode && formik.errors.discountCode}</p>
            <Button className={cx('form-btn')} lazyLoad={isLoading} primary type={'submit'}>
               Apply
            </Button>
         </form>
      </div>
   )
}

export default ApplyDiscountCode
