import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import { ProductType } from '~/redux/features/products/productType'
import SliderCustom from '~/components/SliderCustom'
import styles from './PopularProduct.module.scss'
import CardProduct from '~/components/CardProduct'
import Button from '~/components/Button'
import { useSelector } from 'react-redux'
import { RootState } from '~/redux/store/store'
import LoadingStyle2 from '~/components/LoadingStyle2'

const cx = classNames.bind(styles)

function PopularProduct() {
   const { productList, isLoading } = useSelector((state: RootState) => state.products)

   const [isLoadData, setIsLoadData] = useState<boolean>(true)

   const [dataProduct, setDataProduct] = useState<ProductType[]>([])
   const [activeBtn, setActiveBtn] = useState([
      {
         id: 0,
         isActive: true,
         title: 'Popular',
      },
      {
         id: 1,
         isActive: false,
         title: 'Featured ',
      },
      {
         id: 2,
         isActive: false,
         title: 'Special',
      },
   ])

   const handleButtonClick = (buttonId: number) => {
      const updatedButtons = activeBtn.map((button) => {
         if (button.id === buttonId) {
            return { ...button, isActive: true }
         } else {
            return { ...button, isActive: false }
         }
      })
      setActiveBtn(updatedButtons)
   }
   useEffect(() => {
      if (productList) {
         activeBtn.forEach((el) => {
            if (el.isActive) {
               const newData = productList?.filter((item) => item?.tags === el.title.toLocaleLowerCase())
               setDataProduct(newData)
            }
         })
      }
   }, [productList, activeBtn])
   useEffect(() => {
      setIsLoadData(isLoading)
   }, [isLoading])

   return (
      <>
         <div className={cx('row mt-4')}>
            <div className="col-12  col-lg-2">
               <div className={cx('wrap-btn')}>
                  {activeBtn.map((act, index) => (
                     <Button
                        text
                        key={index}
                        className={cx('btn', act.isActive && 'active')}
                        onClick={() => handleButtonClick(act.id)}
                     >
                        <p className="fs-4 fs-md-3 fw-bold mb-0">{act.title}</p>
                     </Button>
                  ))}
               </div>
            </div>
            <div className={cx('col-12 col-lg-10')}>
               {isLoadData && (
                  <div className={cx('loading')}>
                     <LoadingStyle2 />
                  </div>
               )}
               <SliderCustom isBullet={true}>
                  {dataProduct?.map((product, index) => {
                     return (
                        <div className="pb-5 me-2" key={index}>
                           <CardProduct data={product} />
                        </div>
                     )
                  })}
               </SliderCustom>
            </div>
         </div>
      </>
   )
}

export default PopularProduct
