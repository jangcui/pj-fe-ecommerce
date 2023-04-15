import classNames from 'classnames/bind'
import styles from './CompareProducts.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Image from '~/components/Image'
import { CloseIcon } from '~/components/Icon'
const cx = classNames.bind(styles)
function CompareProducts() {
   return (
      <>
         <ChangeTitle title={'Compare'} />
         <BreadCrumb title={'Compare'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>{' '}
            <div className={cx('container')}>
               <div className={cx('product')}>
                  <CloseIcon className={cx('icon-close')} />
                  <Image
                     className={cx('img')}
                     src="https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/n/o/nokia-t20-1-600x600.jpg"
                  />

                  <div className={cx('content')}>
                     <h3 className={cx('title')}>
                        Thử nghĩ đang ở một quán cà phê vắng khách, chiều nắng nhẹ, tiếng nhạc êm ả như này trôi quanh
                        tai, xe cộ chạy quanh, không gian thoáng đãng, thả mình trong bài hát trong sự nhộn nhịp của
                        cuộc sống. Có lẽ sau bài Hết thời, thì đây là bài hát làm mình ưng cái bụng nhất. Đúng là đ*o
                        nghe nhạc ngọt nữa ngoài lý do nhiều người biết quá với lại bị cấm hay vì quá nghe.
                     </h3>
                     <span className={cx('price')}>$400</span>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Brand:</span>
                        <span className={cx('value')}>Havels</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Type:</span>
                        <span className={cx('value')}>Watch</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Availablity:</span>
                        <span className={cx('value')}>In Stock</span>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Color:</span>
                        <div className={cx('color')}>
                           <span />
                           <span />
                           <span />
                        </div>
                     </div>
                     <div className={cx('description')}>
                        <span className={cx('name')}>Size:</span>
                        <span className={cx('value')}>S M </span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default CompareProducts
