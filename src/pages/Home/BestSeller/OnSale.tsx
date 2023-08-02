import { useEffect, useState } from 'react'
import 'swiper/css/scrollbar'

import SliderCustom from '~/components/SliderCustom/SliderCustom'
import LoadingStyle2 from '~/components/LoadingStyle2'
import { ProductType } from '~/types/productStage'
import { useSelector } from 'react-redux'
import { RootState } from '~/store/store'
import ProductSeller from './ProductSeller'

function OnSale({ data }: { data: ProductType[] }) {
   const [dataProduct, setDataProduct] = useState<ProductType[]>([])
   const { isLoading } = useSelector((state: RootState) => state.products)

   useEffect(() => {
      if (data) {
         const newData = data?.filter((item) => item?.discountCode)
         setDataProduct(newData)
      }
   }, [data])

   return (
      <>
         <SliderCustom numberElInView={3}>
            {isLoading ? (
               <div
                  className="pe-2 d-flex justify-content-center"
                  style={{ minHeight: '300px', transition: 'all 0.3s' }}
               >
                  <LoadingStyle2 />
               </div>
            ) : (
               dataProduct?.map((data, index) => {
                  return (
                     <div key={index} className="pe-2 d-flex justify-content-center" style={{ minHeight: '300px' }}>
                        <ProductSeller data={data} />
                     </div>
                  )
               })
            )}
         </SliderCustom>
      </>
   )
}

export default OnSale
