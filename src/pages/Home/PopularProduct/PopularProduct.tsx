import { useEffect, useState } from 'react'
import classNames from 'classnames/bind'

import Collection from '~/components/Collection'
import { ProductType } from '~/types/productStage'
import SliderCustom from '~/components/SliderCustom'
import styles from './PopularProduct.module.scss'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function PopularProduct({ data }: { data: ProductType[] }) {
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
      if (data) {
         activeBtn.forEach((el) => {
            if (el.isActive) {
               const newData = data?.filter((item) => item?.tags === el.title.toLocaleLowerCase())
               setDataProduct(newData)
            }
         })
      }
   }, [data, activeBtn])
   return (
      <>
         <div className={cx('row mt-4')}>
            <div className="col-2">
               <div className={cx('wrap-btn')}>
                  {activeBtn.map((act, index) => (
                     <Button
                        text
                        key={index}
                        className={cx('btn', act.isActive && 'active')}
                        onClick={() => handleButtonClick(act.id)}
                     >
                        <p className="fs-3 fw-bold">{act.title}</p>
                     </Button>
                  ))}
               </div>
            </div>
            <div className={cx('col-10')}>
               <SliderCustom isBullet={true}>
                  {dataProduct?.map((product, index) => {
                     return (
                        <div className="pb-5 me-2" key={index}>
                           <Collection data={product} />
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
