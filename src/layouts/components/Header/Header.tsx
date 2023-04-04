import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { CompareIcon, DropIcon, FilterIcon, LikeIcon, SearchIcon, UserIcon } from '~/components/Icon'
import images from '~/assets/images'
import Image from '~/components/Image'
import { useEffect, useState } from 'react'
const cx = classNames.bind(styles)

function Header() {
   const [isScroll, setIsScroll] = useState(false)
   useEffect(() => {
      window.scrollTo(0, 50)
   }, [])
   useEffect(() => {
      const onScroll = () => {
         window.pageYOffset >= 100 ? setIsScroll(true) : setIsScroll(false)
      }
      window.removeEventListener('scroll', onScroll)
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
   }, [])

   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('contact')}>
               <div className={cx('contact-container')}>
                  <span>Free Ship Over 100$ And Free Return </span>
                  <span>Hotline: +84 84 666 9107</span>
               </div>
            </div>
            <div className={cx('content', isScroll && 'fixed')}>
               <div className={cx('content-main')}>
                  <div className={cx('trademark')}>
                     <h1>Digitic.</h1>
                  </div>
                  <div className={cx('input-form')}>
                     <input type="text" placeholder={'Search products hear ...'} />
                     <SearchIcon className={cx('icon-search')} />
                  </div>
                  <div className={cx('option-wrapper')}>
                     <div className={cx('option')}>
                        <CompareIcon width={'46px'} height={'46px'} className={cx('icon-option')} />{' '}
                        <p>Compare Products</p>
                     </div>
                     <div className={cx('option')}>
                        <LikeIcon width={'46px'} height={'46px'} className={cx('icon-option')} />{' '}
                        <p>Favourite Wishlist </p>
                     </div>
                     <div className={cx('option')}>
                        <UserIcon width={'46px'} height={'46px'} className={cx('icon-option')} />{' '}
                        <p>Log In My Account</p>
                     </div>
                     <div className={cx('option')}>
                        <Image src={images.logo} className={cx('img')} />
                        <div className={cx('option-content')}>
                           <span className={cx('quantity')}>20</span>
                           <span className={cx('total')}>$300</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('menu')}>
               <div className={cx('menu-main')}>
                  <div className={cx('menu-drop')}>
                     <FilterIcon />
                     <p>SHOP CATEGORIES</p>
                     <DropIcon width={'10px'} height={'10px'} className={cx('drop-icon')} />
                  </div>
                  <div className={cx('menu-option')}>
                     <p>home</p>
                     <p>our store</p>
                     <p>blogs</p>
                     <p>contact</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header
