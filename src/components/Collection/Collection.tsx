import classNames from 'classnames/bind'
import styles from './Collection.module.scss'
import Image from '~/components/Image/Image'
import { StarRating } from 'star-rating-react-ts'
import Button from '~/components/Button/Button'

import { ProductType } from '~/types/productStage'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { addToWishList, getUserWishList } from '~/features/customers/customerService'
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import images from '~/assets/images'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

function Collection({ data, isSort = false }: { data: ProductType; isSort?: boolean }) {
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
            <Button text className={cx('overlay')} onClick={() => navigate(`/product/${data._id}`)}>
               <p style={{ color: '#fff' }} className="fw-2 fs-3">
                  Click to see more detail...
               </p>
            </Button>
            <div className={cx('wrap-img')}>
               <Image className={cx('img')} src={imgList && imgList[0] ? imgList[0] : images.errorImage} />
            </div>

            <div className={cx('info')}>
               <div className={cx('slug')}>
                  <p>{data.slug}</p>
                  {user && (
                     <Button text className={cx('btn')} onClick={handleAddToWishList}>
                        {isActive ? (
                           <AiTwotoneHeart style={{ color: '#dd551b' }} className={cx('icon')} />
                        ) : (
                           <AiOutlineHeart style={{ color: '#dd551b' }} className={cx('icon')} />
                        )}
                     </Button>
                  )}
               </div>
               <h2 className={cx('title')}>{data.title}</h2>
               <p className={cx('description')} dangerouslySetInnerHTML={{ __html: data.description as string }}></p>
               <div className={cx('sold')}>sold : {data.sold}</div>
               <div className={cx('price')}>
                  $ <p className="mb-0">{data.price}</p>
               </div>
               <div className={cx('rating')}>
                  <StarRating
                     initialRating={data.totalRating as number}
                     readOnly
                     theme={{
                        size: 24,
                     }}
                  />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Collection
