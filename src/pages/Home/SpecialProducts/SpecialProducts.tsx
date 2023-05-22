import classNames from 'classnames/bind'
import { StarRating } from 'star-rating-react-ts'
import styles from './SpecialProducts.module.scss'
import Image from '~/components/Image/Image'
import Button from '~/layouts/components/Button/Button'
import { ProductType } from '~/types/productStage'

const cx = classNames.bind(styles)

function SpecialProducts({ data }: { data: ProductType }) {
   const imgList = data.images?.map((img) => img.url)
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('block-img')}>
               <div className={cx('main-img')}>
                  <Image className={cx('img')} src={imgList ? imgList[0] : ''} />
               </div>
               <div className={cx('sub-img')}>
                  <Image className={cx('img')} src={imgList ? imgList[1] : ''} />
                  <Image className={cx('img')} src={imgList ? imgList[2] : ''} />
               </div>
            </div>
            <div className={cx('info')}>
               <span className={cx('slug')}>{data.slug}</span>
               <h3 className={cx('title')}>{data.title}</h3>
               <div className={cx('price')}>
                  <span className={cx('final-price')}>${data.price}</span>
                  <s className={cx('after-price')}>$17.00</s>
               </div>
               <div className={cx('rating-star')}>
                  <StarRating initialRating={data.totalRating} readOnly theme={{ size: 24 }} />
               </div>
               <div className={cx('date')}>
                  <strong>875</strong>
                  <p>days</p>
                  <span className={cx('time')}>05</span>:<span className={cx('time')}>32</span>:
                  <span className={cx('time')}>16</span>
               </div>
               <div className={cx('quantity')}>
                  <p>Products: {data.quantity}</p>
                  {/* <input type="range" defaultValue={30} min={0} max={100} /> */}
                  <div className={cx('range')}>
                     <div
                        role="progressbar"
                        className={cx('value')}
                        aria-valuenow={
                           data.quantity && data.sold && (data.quantity / (data.quantity + data.sold)) * 100
                        }
                        aria-valuemin={data.quantity}
                        aria-valuemax={
                           data.quantity && data.sold ? (data.quantity / (data.quantity + data.sold)) * 100 : 0
                        }
                        style={{
                           width: data.quantity && data.sold ? (data.quantity / (data.quantity + data.sold)) * 100 : 0,
                        }}
                     >
                        {data.sold}
                     </div>
                  </div>
               </div>
               <Button primary className={cx('btn')}>
                  Add to cart
               </Button>
            </div>
         </div>
      </div>
   )
}

export default SpecialProducts
