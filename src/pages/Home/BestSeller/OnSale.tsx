import { useEffect, useState } from 'react'
import 'swiper/css/scrollbar'

import SliderCustom from '~/components/SliderCustom/SliderCustom'
import { ProductType } from '~/redux/features/products/productType'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store/store'
import ProductSeller from './ProductSeller'

function OnSale() {
   const { productList } = useSelector((state: RootState) => state.products)

   const [dataProduct, setDataProduct] = useState<ProductType[]>([])

   useEffect(() => {
      if (productList) {
         const newData = productList?.filter((item) => item?.discountCode)
         setDataProduct(newData)
      }
   }, [productList])

   return (
      <div style={{ minHeight: '300px' }}>
         <SliderCustom numberElInView={3}>
            {dataProduct?.map((data, index) => {
               return (
                  <div key={index} className="pe-2 d-flex justify-content-center" style={{ height: '100%' }}>
                     <ProductSeller data={data} />
                  </div>
               )
            })}
         </SliderCustom>
      </div>
   )
}

export default OnSale
