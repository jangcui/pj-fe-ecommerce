import classNames from 'classnames/bind'
import styles from './CartPage.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Image from '~/components/Image/Image'
import { DeleteIcon, MinusIcon, PlusIcon } from '~/components/Icon'
import Button from '~/layouts/components/Button/Button'
import config from '~/config/config'
const cx = classNames.bind(styles)

function CartPage() {
   return (
      <>
         <ChangeTitle title={'Your Cart'} />
         <BreadCrumb title={'Your Cart'} />
         <div className={cx('wrapper')}>
            <div className={cx('section')}>
               <div className={cx('block')}>
                  <h3>Product</h3>
                  <h3>Price</h3>
               </div>
               <div className={cx('block')}>
                  <h3>Quantity</h3>
                  <h3>Total</h3>
               </div>
            </div>
            <div className={cx('section')}>
               <div className={cx('block')}>
                  <div className={cx('product-detail')}>
                     <span className={cx('info')}>
                        <Image
                           className={cx('img')}
                           src={
                              'https://images.fpt.shop/unsafe/fit-in/68x68/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2019/8/5/637005953425406470_507570.jpg'
                           }
                        />
                        <span className={cx('content')}>
                           <p>verall, this tutorial provides a comprehensive and practic</p>
                           <p>size: M l</p>
                           <p>color: #fff</p>
                        </span>
                     </span>
                  </div>
                  <span className={cx('price')}>$1000</span>
               </div>
               <div className={cx('block')}>
                  <div className={cx('quantity')}>
                     <div className={cx('btn-counter')}>
                        <span>
                           <Button className={cx('icon-btn')}>
                              <PlusIcon width={'14px'} height={'14px'} />
                           </Button>
                           <Button className={cx('icon-btn')}>
                              <MinusIcon width={'14px'} height={'14px'} />
                           </Button>
                        </span>
                        <p>1</p>
                     </div>
                     <Button text className={cx('btn-delete')}>
                        <DeleteIcon width={'24px'} height={'24px'} />
                     </Button>
                  </div>
                  <span className={cx('price')}>$1000</span>
               </div>
            </div>
            <div className={cx('section')}>
               <div className={cx('block')}>
                  <div className={cx('product-detail')}>
                     <span className={cx('info')}>
                        <Image
                           className={cx('img')}
                           src={
                              'https://images.fpt.shop/unsafe/fit-in/68x68/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2019/8/5/637005953425406470_507570.jpg'
                           }
                        />
                        <span className={cx('content')}>
                           <p>verall, this tutorial provides a comprehensive and practic</p>
                           <p>size: M l</p>
                           <p>color: #fff</p>
                        </span>
                     </span>
                  </div>
                  <span className={cx('price')}>$1000</span>
               </div>
               <div className={cx('block')}>
                  <div className={cx('quantity')}>
                     <div className={cx('btn-counter')}>
                        <span>
                           <Button className={cx('icon-btn')}>
                              <PlusIcon width={'14px'} height={'14px'} />
                           </Button>
                           <Button className={cx('icon-btn')}>
                              <MinusIcon width={'14px'} height={'14px'} />
                           </Button>
                        </span>
                        <p>1</p>
                     </div>
                     <Button text className={cx('btn-delete')}>
                        <DeleteIcon width={'24px'} height={'24px'} />
                     </Button>
                  </div>
                  <span className={cx('price')}>$1000</span>
               </div>
            </div>{' '}
            <div className={cx('section')}>
               <div className={cx('block')}>
                  <div className={cx('product-detail')}>
                     <span className={cx('info')}>
                        <Image
                           className={cx('img')}
                           src={
                              'https://images.fpt.shop/unsafe/fit-in/68x68/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2019/8/5/637005953425406470_507570.jpg'
                           }
                        />
                        <span className={cx('content')}>
                           <p>verall, this tutorial provides a comprehensive and practic</p>
                           <p>size: M l</p>
                           <p>color: #fff</p>
                        </span>
                     </span>
                  </div>
                  <span className={cx('price')}>$1000</span>
               </div>
               <div className={cx('block')}>
                  <div className={cx('quantity')}>
                     <div className={cx('btn-counter')}>
                        <span>
                           <Button className={cx('icon-btn')}>
                              <PlusIcon width={'14px'} height={'14px'} />
                           </Button>
                           <Button className={cx('icon-btn')}>
                              <MinusIcon width={'14px'} height={'14px'} />
                           </Button>
                        </span>
                        <p>1</p>
                     </div>
                     <Button text className={cx('btn-delete')}>
                        <DeleteIcon width={'24px'} height={'24px'} />
                     </Button>
                  </div>
                  <span className={cx('price')}>$1000</span>
               </div>
            </div>{' '}
            <div className={cx('section')}>
               <div className={cx('block')}>
                  <div className={cx('product-detail')}>
                     <span className={cx('info')}>
                        <Image
                           className={cx('img')}
                           src={
                              'https://images.fpt.shop/unsafe/fit-in/68x68/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2019/8/5/637005953425406470_507570.jpg'
                           }
                        />
                        <span className={cx('content')}>
                           <p>verall, this tutorial provides a comprehensive and practic</p>
                           <p>size: M l</p>
                           <p>color: #fff</p>
                        </span>
                     </span>
                  </div>
                  <span className={cx('price')}>$1000</span>
               </div>
               <div className={cx('block')}>
                  <div className={cx('quantity')}>
                     <div className={cx('btn-counter')}>
                        <span>
                           <Button className={cx('icon-btn')}>
                              <PlusIcon width={'14px'} height={'14px'} />
                           </Button>
                           <Button className={cx('icon-btn')}>
                              <MinusIcon width={'14px'} height={'14px'} />
                           </Button>
                        </span>
                        <p>1</p>
                     </div>
                     <Button text className={cx('btn-delete')}>
                        <DeleteIcon width={'24px'} height={'24px'} />
                     </Button>
                  </div>
                  <span className={cx('price')}>$1000</span>
               </div>
            </div>
            <div className={cx('section')}>
               <div className={cx('country')}>
                  <Button to={config.routes.home} primary className={cx('btn-foot')}>
                     Country Shopping
                  </Button>
                  <p className={cx('text-foot')}>Order special introduction</p>
               </div>
               <div className={cx('sum')}>
                  <p className={cx('text-foot')}>
                     Subtotal: <span>$1000</span>
                  </p>
                  <p className={cx('text-foot')}>Taxes and shipping calculated and checkout</p>
                  <Button to={config.routes.checkout} primary className={cx('btn-foot')}>
                     Check out
                  </Button>
               </div>
            </div>
         </div>
      </>
   )
}

export default CartPage
