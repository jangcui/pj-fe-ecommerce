import classNames from 'classnames/bind'
import styles from './Footer.module.scss'
import Image from '~/components/Image'
import images from '~/assets/images'
import Marquee from 'react-fast-marquee'
import { FaceBookIcon, GitHubIcon, GmailIcon } from '~/components/Icon'
import { Link } from 'react-router-dom'
import Button from '~/components/Button/Button'
const cx = classNames.bind(styles)

function Footer() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('logo')}>
               <div className={cx('wrap-logo')}>
                  <Marquee gradientWidth={0} className={cx('marquee')} direction="right">
                     <Image src={images.logo2} className={cx('img')} />
                     <h1>Digitic.</h1>
                  </Marquee>
               </div>
               <div className={cx('wrap-icon')}>
                  <Button text to="https://github.com/jangcui?tab=repositories" style={{ color: '#fff' }}>
                     {' '}
                     <GitHubIcon />
                  </Button>
                  <Button text to="https://www.facebook.com/profile.php?id=100004998315019">
                     <FaceBookIcon />
                  </Button>
                  <Button text to="https://mail.google.com/mail/u/0/?tab=km#inbox">
                     {' '}
                     <GmailIcon />
                  </Button>
               </div>
            </div>
            <div className={cx('information')}>
               <div className={cx('content')}>
                  <h3>Contact</h3>
                  <span>+84 84 666 9107</span>
                  <span>majdjtu@gmail.com</span>
                  <Link to="https://github.com/jangcui?tab=repositories">
                     <span>github.com/jangcui?tab=repositories</span>
                  </Link>
               </div>
               <div className={cx('content')}>
                  <h3>Information</h3>
                  <span>Privacy Policy</span>
                  <span>Refund Policy</span>
                  <span>Shipping Policy</span>
                  <span>Terms & Condition</span>
                  <span>Blogs</span>
               </div>
               <div className={cx('content')}>
                  <h3>Accounts</h3>
                  <span>About Us</span>
                  <span>Faq</span>
                  <span>Contact</span>
               </div>
               <div className={cx('content')}>
                  <h3>Quick Link</h3>
                  <span>Laptops</span>
                  <span>Headphones</span>
                  <span>Tablets</span>
                  <span>Watch</span>
               </div>
            </div>
         </div>

         <div className={cx('copyright')}>
            <p>© 2023: Powered by Digitic.</p>
         </div>
      </div>
   )
}

export default Footer
