import classNames from 'classnames/bind'
import styles from './Collection.module.scss'
import { LikeIcon } from '~/components/Icon'
import Image from '~/components/Image/Image'
import { StarRating } from 'star-rating-react-ts'
import Button from '~/layouts/components/Button/Button'
import config from '~/config/config'

const cx = classNames.bind(styles)

function Collection() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <Image
               className={cx('collection-img')}
               // src={prod.images[0]}
               src="https://images.fpt.shop/unsafe/fit-in/214x214/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/1/31/638107846050335072_iphone-13-dd-1.jpg"
            />
            <div className={cx('wrap-btn')}>
               <Button to={config.routes.product} secondary className={cx('btn')}>
                  buy now
               </Button>
               <Button className={cx('btn')} primary>
                  Add to cart
               </Button>
            </div>
            <div className={cx('collection-info')}>
               <div className={cx('slug')}>
                  <p>Slug</p> <LikeIcon />
               </div>
               <h2 className={cx('title')}>title</h2>
               <p className={cx('description')}>
                  this is description heheheh eehhehehe he heheh he heh ehh he this is description heheheh eehhehehe he
                  heheh he heh ehh he this is description heheheh eehhehehe he heheh he heh ehh he this is description
                  heheheh eehhehehe he heheh he heh ehh he this is description heheheh eehhehehe he heheh he heh ehh he
               </p>
               <div className={cx('sold')}>sold : 12345</div>
               <div className={cx('price')}>
                  $ <p>400</p>
               </div>
               <div className={cx('rating')}>
                  <StarRating
                     initialRating={4}
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
