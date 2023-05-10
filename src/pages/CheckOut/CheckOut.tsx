import classNames from 'classnames/bind'
import styles from './CheckOut.module.scss'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/layouts/components/Button/Button'
import { ArrowBackIcon, DropIcon } from '~/components/Icon'
import Image from '~/components/Image/Image'
import config from '~/config/config'
const cx = classNames.bind(styles)

function CheckOut() {
   return (
      <>
         <ChangeTitle title={'Check out'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <ul className={cx('detail')}>
                  <li>
                     <h2 className={cx('title')}> Dev Corner</h2>
                  </li>
                  <li className={cx('breadcrumb')}>
                     <Button className={cx('btn')} text>
                        Cart/
                     </Button>
                     <Button className={cx('btn')} text>
                        Information/
                     </Button>
                     <Button className={cx('btn')} text>
                        Shipping/
                     </Button>
                     <Button className={cx('btn')} text>
                        Payment
                     </Button>
                  </li>
                  <li>
                     <h3> Contact Information</h3>
                  </li>
                  <li>
                     <p className={cx('email')}>Tung Phan (tungphan12h@gmial.com)</p>
                  </li>
                  <li>
                     <Button text rightIcon={<DropIcon width={'14px'} height={'14px'} />} className={cx('btn-select')}>
                        Select Country
                     </Button>
                  </li>
                  <li className={cx('wrap-input')}>
                     <input className={cx('input')} placeholder="Fist Name" />
                     <input className={cx('input')} placeholder="Last Name" />
                  </li>
                  <li>
                     <input className={cx('input')} placeholder="Address" />
                  </li>
                  <li>
                     <input className={cx('input')} placeholder="Apartment, Suite, ect,..." />
                  </li>
                  <li className={cx('wrap-input')}>
                     <input placeholder="City" />
                     <Button className={cx('btn-select')} rightIcon={<DropIcon width={'14px'} height={'14px'} />}>
                        Select State
                     </Button>
                     <input placeholder="Zipcode" />
                  </li>
                  <li className={cx('wrap-input')}>
                     <Button to={config.routes.cart} text leftIcon={<ArrowBackIcon />} className={cx('btn-back')}>
                        Return to cart
                     </Button>
                     <Button to={config.routes.home} primary className={cx('btn-country')}>
                        Country to shipping
                     </Button>
                  </li>
               </ul>
               <div className={cx('product')}>
                  <div className={cx('info')}>
                     <div className={cx('wrap-img')}>
                        <Image
                           src="https://images.fpt.shop/unsafe/fit-in/60x60/filters:quality(90):fill(transparent)/fptshop.com.vn/Uploads/images/2022/iconcate/icon-accessories.png"
                           className={'img'}
                        />
                        <span className={cx('count')}>3</span>
                        <span className={cx('wrap-name')}>
                           <p className={cx('name-prod')}>heheheh</p>
                           <p className={cx('description')}>huhuhu</p>
                        </span>
                     </div>
                     <span className={cx('price')}>$1000</span>
                  </div>
                  <div className={cx('calculate')}>
                     <div className={cx('field')}>
                        <span className={cx('type')}>Subtotal</span>
                        <span className={cx('price')}>$1200</span>
                     </div>{' '}
                     <div className={cx('field')}>
                        <span className={cx('type')}>Shipping</span>
                        <span className={cx('price')}>$120</span>
                     </div>
                  </div>
                  <div className={cx('field')}>
                     <b className={cx('type')}>Total:</b>
                     <b className={cx('price')}>$2300</b>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default CheckOut
