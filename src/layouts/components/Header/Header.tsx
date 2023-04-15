import classNames from 'classnames/bind'
import styles from './Header.module.scss'
import { CompareIcon, DropIcon, FilterIcon, LikeIcon, SearchIcon, UserIcon } from '~/components/Icon'
import images from '~/assets/images'
import Image from '~/components/Image'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '~/config/config'
import Button from '../Button/Button'
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
                     <Button text to={config.routes.home}>
                        <h1 className={cx('logo')}>Digitic.</h1>
                     </Button>
                  </div>
                  <div className={cx('input-form')}>
                     <input type="text" placeholder={'Search products hear ...'} />
                     <SearchIcon className={cx('icon-search')} />
                  </div>
                  <div className={cx('option-wrapper')}>
                     <Button text to={config.routes.compare} className={cx('option')}>
                        <CompareIcon width={'46px'} height={'46px'} className={cx('icon-option')} />{' '}
                        <p>Compare Products</p>
                     </Button>
                     <Button text to={config.routes.wishlist} className={cx('option')}>
                        <LikeIcon width={'46px'} height={'46px'} className={cx('icon-option')} />{' '}
                        <p>Favorite Wishlist </p>
                     </Button>
                     <Button text to={config.routes.login} className={cx('option')}>
                        <UserIcon width={'46px'} height={'46px'} className={cx('icon-option')} />{' '}
                        <p>Log In My Account</p>
                     </Button>
                     <div className={cx('option')}>
                        <Link to={config.routes.cart}>
                           <Image src={images.logo} className={cx('img')} />
                        </Link>
                        <div className={cx('option-content')}>
                           <span className={cx('quantity')}>20</span>
                           <span className={cx('total')}>$300</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className={cx('menu')}>
               <div className={cx('menu-container')}>
                  <Button
                     leftIcon={<FilterIcon />}
                     rightIcon={<DropIcon width={'14px'} height={'14px'} />}
                     className={cx('menu-drop')}
                  >
                     SHOP CATEGORIES
                  </Button>
                  <div className={cx('menu-option')}>
                     <Button text className={cx('btn')} to={config.routes.home}>
                        home
                     </Button>
                     <Button text className={cx('btn')} to={config.routes.store}>
                        our store
                     </Button>
                     <Button text className={cx('btn')} to={config.routes.blogs}>
                        blogs
                     </Button>
                     <Button text className={cx('btn')} to={config.routes.contact}>
                        contact
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Header
