import classNames from 'classnames/bind'
import styles from './Collection.module.scss'
import Image from '~/components/Image/Image'
import { StarRating } from 'star-rating-react-ts'
import Button from '~/layouts/components/Button/Button'
import config from '~/config'
import { ProductType } from '~/types/productStage'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { addToWishList } from '~/features/customers/customerService'
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai'
import { HiArrowPath } from 'react-icons/hi2'
import { useState } from 'react'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'

const cx = classNames.bind(styles)

function Collection({ data, isSort = false }: { data: ProductType; isSort?: boolean }) {
   const dispatch = useDispatch<AppDispatch>()
   const [isActive, setIsActive] = useState<boolean>(false)
   const productData = useSelector((state: RootState) => state.products.productList)
   const imgList = data.images?.map((img) => img.url)

   const handleAddToWishList = (productId: string) => {
      dispatch(addToWishList({ prodId: productId }))
   }
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container', isSort && 'sort')}>
            <div className={cx('wrap-img')}>
               <Image className={cx('img')} src={imgList ? imgList[0] : ''} />
            </div>
            <div className={cx('wrap-btn')}>
               <Button text to={config.routes.compare} secondary className={cx('btn')}>
                  <HiArrowPath className={cx('icon')} />
               </Button>
               <Button text to={`/product/${data._id}`} secondary className={cx('btn')}>
                  <FaEye className={cx('icon')} />
               </Button>
               <Button text to={config.routes.cart} className={cx('btn')}>
                  <BsFillCartPlusFill className={cx('icon')} />
               </Button>
            </div>
            <div className={cx('info')}>
               <div className={cx('slug')}>
                  <p>{data.slug}</p>
                  <Button text className={cx('btn')} onClick={() => handleAddToWishList(data._id as string)}>
                     {isActive ? (
                        <AiOutlineHeart className={cx('icon')} />
                     ) : (
                        <AiTwotoneHeart className={cx('icon', 'icon-active')} />
                     )}
                  </Button>
               </div>
               <h2 className={cx('title')}>{data.title}</h2>
               <p className={cx('description')} dangerouslySetInnerHTML={{ __html: data.description as string }}></p>
               <div className={cx('sold')}>sold : {data.sold}</div>
               <div className={cx('price')}>
                  $ <p>{data.price}</p>
               </div>
               <div className={cx('rating')}>
                  <StarRating
                     initialRating={data.totalRating}
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
