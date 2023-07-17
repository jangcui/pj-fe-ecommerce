import classNames from 'classnames/bind'
import styles from './CardProduct.module.scss'
import Image from '~/components/Image/Image'
import Button from '~/components/Button/Button'

import { ProductType } from '~/types/productStage'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { addToWishList, getUserWishList } from '~/features/customers/customerService'
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StarRatingCustom from '../StarRatingCustom'
import images from '~/assets/images'
import { openModalLogin } from '~/features/modalLogin/modalLoginSlice'

const cx = classNames.bind(styles)

function CardProduct({ data, isSort = false }: { data: ProductType; isSort?: boolean }) {
   const dispatch = useDispatch<AppDispatch>()
   const [isActive, setIsActive] = useState<boolean>(false)
   const { wishlist, user } = useSelector((state: RootState) => state.customer)

   const imgList = data.images?.map((img) => img.url)
   const navigate = useNavigate()

   const handleAddToWishList = async () => {
      setIsActive(!isActive)
      await dispatch(addToWishList({ prodId: data._id || '' }))
      await dispatch(getUserWishList())
   }
   useEffect(() => {
      wishlist?.map((item) => {
         if (item._id === data._id) {
            setIsActive(true)
         }
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container', isSort && 'sort')}>
            {!!data.discountCode && (
               <span className={cx('badge')}>-{data.discountCode && data.discountCode.percentage}%</span>
            )}
            <Button text className={cx('overlay')} onClick={() => navigate(`/product/${data?.slug}`)}></Button>
            <div className={cx('wrap-img')}>
               <Image className={cx('img')} src={imgList && imgList[0] ? imgList[0] : images.errorImage} />
            </div>

            <div className={cx('info')}>
               <div className={cx('slug')}>
                  <p>{data.brand}</p>
                  <Button
                     text
                     className={cx('btn')}
                     onClick={user ? () => handleAddToWishList() : () => dispatch(openModalLogin())}
                  >
                     {isActive ? (
                        <AiTwotoneHeart style={{ color: '#dd551b' }} className={cx('icon')} />
                     ) : (
                        <AiOutlineHeart style={{ color: '#dd551b' }} className={cx('icon')} />
                     )}
                  </Button>
               </div>
               <h2 className={cx('title')}>{data.title}</h2>
               {isSort && (
                  <p className={cx('description')} dangerouslySetInnerHTML={{ __html: data?.description || '' }}></p>
               )}

               <div className={cx('sold')}>Sold : {data.sold}</div>
               <div className={cx('price')}>
                  {data?.discountCode ? (
                     <>
                        {' '}
                        <s className="fw-bold "> ${data.price.toFixed(2)}</s>
                        <p className={cx('origin-price')}> ${data?.price_after_discount.toFixed(2)}</p>
                     </>
                  ) : (
                     <p className={cx('origin-price')}> ${data.price.toFixed(2)}</p>
                  )}
               </div>
               <div className={cx('rating')}>
                  <StarRatingCustom initStar={data.totalRating as number} readOnly size={24} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default CardProduct
