import classNames from 'classnames/bind'
import styles from './ProductSeller.module.scss'

import Image from '~/components/Image'
import StarRatingCustom from '~/components/StarRatingCustom'
import Button from '~/components/Button'
import { ProductType } from '~/types/productStage'
import CountdownTimer from './CountDown'

const cx = classNames.bind(styles)

function ProductSeller({ data }: { data: ProductType }) {
   const imgList = data.images?.map((img) => img.url)

   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('block-img')}>
               <div className={cx('badge')}>-{data.discountCode && data.discountCode.percentage}%</div>
               <div className={cx('main-img')}>
                  <Image className={cx('img')} src={imgList ? imgList[0] : ''} />
               </div>
               <div className="d-flex gap-2">
                  <div className={cx('sub-img')}>
                     {' '}
                     <Image className={cx('img')} src={imgList ? imgList[1] : ''} />
                  </div>
                  <div className={cx('sub-img')}>
                     {' '}
                     <Image className={cx('img')} src={imgList ? imgList[2] : ''} />
                  </div>
               </div>
            </div>
            <div className={cx('info')}>
               <span className={cx('brand')}>{data.brand}</span>
               <h3 className={cx('title')}>{data.title}</h3>

               <div className={cx('price', 'mb-2')}>
                  {data?.discountCode ? (
                     <>
                        <p className={cx('fs-3 mb-0')}> ${data?.price_after_discount.toFixed(2)}</p>
                        <s> ${data.price.toFixed(2)}</s>
                     </>
                  ) : (
                     <p className={cx('fs-3 mb-0')}> ${data.price.toFixed(2)}</p>
                  )}
               </div>
               {data.discountCode && <CountdownTimer deadline={new Date(data.discountCode.expiry)} />}
               <div className="mb-3">
                  <StarRatingCustom initStar={data?.totalRating ? data?.totalRating : 0} readOnly size={24} />
               </div>
               <div className={cx('quantity')}>
                  <p>
                     Quantity: <span className="fw-bolder fs-3">{data.quantity}</span>
                  </p>
                  <p className="mb-0">
                     {' '}
                     Sold: <span className="ms-4">{data.sold}</span>
                  </p>
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
                           color: '#3b4149',
                        }}
                     ></div>
                  </div>
               </div>
               <Button primary className={cx('btn')} to={`/product/${data.slug}`}>
                  <span> View Detail</span>
               </Button>
            </div>
         </div>
      </div>
   )
}

export default ProductSeller
