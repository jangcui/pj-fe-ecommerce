import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import styles from '~/components/StyleModule/AdminStyle.module.scss'
import { useEffect, useState } from 'react'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import Button from '~/components/Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'

import { Typeahead } from 'react-bootstrap-typeahead'
import { getProducts, removeDiscount } from '~/features/products/productsService'

const cx = classNames.bind(styles)

const discountSchema = Yup.object().shape({
   productId: Yup.string().required('Product is required'),
})
interface SearchProductType {
   product: string
   name: string
}

function RemoveDiscountCode() {
   const dispatch = useDispatch<AppDispatch>()
   const { productList } = useSelector((state: RootState) => state.products)
   const [productName, setProductName] = useState<string>('')

   const [productOpt, setProductOpt] = useState<SearchProductType[]>([])

   useEffect(() => {
      dispatch(getProducts({}))
   }, [dispatch])

   useEffect(() => {
      const data = productList
         ?.filter((element) => element.discountCode !== undefined)
         .map((element) => ({
            product: element._id || ' ',
            name: element.title || ' ',
         }))
      setProductOpt(data)
   }, [productList])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         productId: productName,
      },
      validationSchema: discountSchema,
      onSubmit: async (values) => {
         await dispatch(removeDiscount(values.productId))
         await dispatch(getProducts({}))
         formik.values.productId = ''
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
            <p className={cx('error')}>{formik.touched.productId && formik.errors.productId}</p>
            <Button className={cx('form-btn', 'mt-4')} primary type={'submit'}>
               Remove
            </Button>
         </form>
      </div>
   )
}

export default RemoveDiscountCode
