import { ProductType } from '~/types/productStage'
import { useEffect, useState } from 'react'
import ProductSeller from './ProductSeller'
import 'swiper/css/scrollbar'
import SliderCustom from '~/components/SliderCustom/SliderCustom'

function OnSale({ data }: { data: ProductType[] }) {
   const [dataProduct, setDataProduct] = useState<ProductType[]>([])

   useEffect(() => {
      if (data) {
         const newData = data?.filter((item) => item?.discountCode)
         setDataProduct(newData)
      }
   }, [data])

   return (
      <>
         <SliderCustom numberElInView={3}>
            {dataProduct?.map((data, index) => {
               return (
                  <div key={index} className="pe-2">
                     <ProductSeller data={data} />
                  </div>
               )
            })}
         </SliderCustom>
      </>
   )
}

export default OnSale
