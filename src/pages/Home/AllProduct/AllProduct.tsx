import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa'

import Button from '~/components/Button'
import CardProduct from '~/components/CardProduct'
import Loading from '~/components/Loading'
import { ProductType } from '~/redux/features/products/productType'
import { RootState } from '~/redux/store'

const PRODUCT_RENDER = 8
function Products() {
   const { productList, isLoading } = useSelector((state: RootState) => state.products)
   const [products, setProducts] = useState<ProductType[]>(productList)
   const [visibleItems, setVisibleItems] = useState<number>(PRODUCT_RENDER) // Số sản phẩm hiển thị ban đầu

   const totalItems = productList.length

   const handleLoadMore = () => {
      setVisibleItems((prevVisibleItems) => prevVisibleItems + PRODUCT_RENDER)
   }

   const handleShowLess = () => {
      setVisibleItems(PRODUCT_RENDER)
   }
   useEffect(() => {
      setProducts(productList)
   }, [productList])

   return (
      <div className="row w-100 d-flex flex-wrap">
         {isLoading ? (
            <Loading />
         ) : (
            <>
               {products.length > 0 ? (
                  products.slice(0, visibleItems)?.map((product, index) => (
                     <>
                        <div className="col-6 col-md-4 col-lg-3 mt-4 " key={index}>
                           <CardProduct data={product} isSort={false} />
                        </div>
                     </>
                  ))
               ) : (
                  <h1 className="text-center mt-5 w-100">No data.</h1>
               )}
               {products.length > 0 && (
                  <div className="w-100 d-flex justify-content-center pt-4 pb-4 mt-4  rounded-0 border-bottom">
                     {visibleItems < totalItems ? (
                        <Button className="p-6 py-1 px-4 text-danger border-danger pb-2" text onClick={handleLoadMore}>
                           <span className="me-1 fs-4 font-weight-bold ">Load More</span>
                           <FaAngleDoubleDown className="bounce fs-3" />
                        </Button>
                     ) : (
                        <Button
                           className="p-6 py-1 px-4 text-warning border-secondary pb-2"
                           text
                           onClick={handleShowLess}
                        >
                           <span className="me-1 fs-4 font-weight-bold ">Show Less</span>
                           <FaAngleDoubleUp className="bounce fs-3" />
                        </Button>
                     )}
                  </div>
               )}
            </>
         )}
      </div>
   )
}

export default Products
