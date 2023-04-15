import classNames from 'classnames/bind'

import styles from './OurStore.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import { DropIcon, Sort1Icon, Sort2Icon, Sort3Icon } from '~/components/Icon'
import Collection from '../../components/Collection/Collection'
const cx = classNames.bind(styles)

function OurStore() {
   return (
      <>
         <ChangeTitle title={'Our Store'} />
         <BreadCrumb title={'Our Store'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <div className={cx('filter-list')}>
                  <div className={cx('filter-block')}>
                     <h1 className={cx('title')}>Shop by categories</h1>
                     <div className={cx('option')}>
                        <span>watch</span>
                        <span>tv</span>
                        <span>camera</span>
                        <span>laptop</span>
                     </div>
                  </div>
                  <div className={cx('filter-block')}>
                     <h1 className={cx('title')}>Filter by</h1>
                     <div className={cx('availability')}>
                        <h2>availability</h2>
                        <span>
                           <input type="checkbox" />
                           In stock(0)
                        </span>
                        <span>
                           <input type="checkbox" /> out of stock (1)
                        </span>
                     </div>
                     <div className={cx('availability')}>
                        <h2>Price</h2>
                        <div className={cx('price')}>
                           <span className={cx('price-range')}>from</span>
                           <span className={cx('price-range')}>to</span>
                        </div>
                     </div>
                     <div className={cx('availability')}>
                        <h2>color</h2>
                        <div className={cx('color')}>
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                           <span className={cx('color-circle')} />
                        </div>
                     </div>
                     <div className={cx('availability')}>
                        <h2>size</h2>
                        <span>
                           <input type="checkbox" /> s
                        </span>
                        <span>
                           <input type="checkbox" /> m
                        </span>
                     </div>
                  </div>
                  <div className={cx('filter-block')}>
                     <h1 className={cx('title')}>Product Tags</h1>
                     <div className={cx('product-tags')}>
                        <span>#HeadPhone</span>
                        <span>#Laptop</span>
                        <span>#Camera</span>
                        <span>#Watch</span>
                     </div>
                  </div>
                  <div className={cx('filter-block')}>
                     <h1 className={cx('title')}>Random Product</h1>
                     <div className={cx('product-tags')}>
                        <span>#HeadPhone</span>
                        <span>#Laptop</span>
                        <span>#Camera</span>
                        <span>#Watch</span>
                     </div>
                  </div>
               </div>
               <div className={cx('products')}>
                  <div className={cx('filter-sort')}>
                     <div className={cx('sort-by')}>
                        <span>Sort By: </span>
                        <span className={cx('option')}>
                           <p>Best selling</p> <DropIcon />
                        </span>
                     </div>
                     <div className={cx('sort-icons')}>
                        <p>21 product</p>
                        <div className={cx('wrap-icon')}>
                           <span className={cx('icon-filter', 'active')}>
                              {' '}
                              <Sort1Icon />
                           </span>
                           <span className={cx('icon-filter', 'active')}>
                              {' '}
                              <Sort2Icon />
                           </span>
                           <span className={cx('icon-filter')}>
                              {' '}
                              <Sort1Icon />
                           </span>
                           <span className={cx('icon-filter')}>
                              <Sort3Icon />
                           </span>
                        </div>
                     </div>
                  </div>

                  <div className={cx('product')}>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                     <span className={cx('collection')}>
                        {' '}
                        <Collection />
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default OurStore
