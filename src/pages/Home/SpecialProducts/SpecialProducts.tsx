import classNames from 'classnames/bind'
import { StarRating } from 'star-rating-react-ts'
import styles from './SpecialProducts.module.scss'
import Image from '~/components/Image/Image'
import Button from '~/layouts/components/Button/Button'

const cx = classNames.bind(styles)

function SpecialProducts() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('block-img')}>
               <div className={cx('main-img')}>
                  <Image className={cx('img')} src="https://xgear.net/wp-content/uploads/2022/12/028vn-ava.png" />
               </div>
               <div className={cx('sub-img')}>
                  <Image
                     className={cx('img')}
                     src="https://images.fpt.shop/unsafe/fit-in/750x500/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2021/9/27/637683581428154667_MDMH%20iPhone%2013%20pro.jpg"
                  />
                  <Image className={cx('img')} src="https://xgear.net/wp-content/uploads/2022/12/028vn-ava.png" />
               </div>
            </div>
            <div className={cx('info')}>
               <span className={cx('slug')}>pjaajaj</span>
               <h3 className={cx('title')}>Quận 3 - Hồ Chí Minh] Công Ty Product Sing</h3>
               <div className={cx('price')}>
                  <span className={cx('final-price')}>$15.00</span>
                  <s className={cx('after-price')}>$17.00</s>
               </div>
               <div className={cx('rating-star')}>
                  <StarRating initialRating={4} readOnly theme={{ size: 24 }} />
               </div>
               <div className={cx('date')}>
                  <strong>875</strong>
                  <p>days</p>
                  <span className={cx('time')}>05</span>:<span className={cx('time')}>32</span>:
                  <span className={cx('time')}>16</span>
               </div>
               <div className={cx('quantity')}>
                  <p>Products: 90</p>
                  {/* <input type="range" defaultValue={30} min={0} max={100} /> */}
                  <div className={cx('range')}>
                     <div className={cx('value')} style={{ width: '50%' }}>
                        90
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
