import classNames from 'classnames/bind'
import { FiFacebook, FiPhoneCall } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'
import { BsGithub } from 'react-icons/bs'

import styles from './Footer.module.scss'
import Image from '~/components/Image'
import images from '~/assets/images'
import Marquee from 'react-fast-marquee'
import { FaceBookIcon, GitHubIcon, GmailIcon } from '~/components/Icon'
import Button from '~/components/Button'

const cx = classNames.bind(styles)

function Footer() {
   return (
      <div className={cx('wrapper', 'row w-100 justify-content-center')}>
         <div className={cx('news-letter', 'row col-12 justify-content-center')}>
            <div className="row col-11 ">
               <div className="col-xl-6 col-lg-6 p-0">
                  <div className={cx('text')}>
                     <h4>Subscribe To Our Newsletter</h4>
                     <p>Get all the latest information on Events, Sales and Offers.</p>
                  </div>
               </div>
               <div className="col-xl-6 col-lg-6 p-0">
                  <div className="input-group mb-3 ">
                     <input
                        type="text"
                        className={cx('input', 'form-control fs-4 fs-md-3')}
                        placeholder="Recipient's username"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                     />
                     <Button text className={cx('btn', 'input-group-text fs-4 fs-md-3')} id="basic-addon2">
                        Subscribe
                     </Button>
                  </div>
               </div>
            </div>
         </div>

         <div className={cx('container', 'row col-11 justify-content gap-3 ')}>
            <div className={cx('logo', 'row col-12 col-lg-5 justify-content-center justify-content-lg-start')}>
               <div className="row col-12 col-sm-8">
                  <div className={cx('wrap-logo', 'w-100')}>
                     <Marquee gradientWidth={0} className={cx('marquee')} direction="right">
                        <Image src={images.logo2} className={cx('img')} />
                        <Image src={images.logo} className={cx('img')} />
                     </Marquee>
                  </div>
                  <h2 className="text-center mt-2">Contact</h2>
                  <div className="w-100 ">
                     <div className="d-flex align-items-center gap-1 justify-content-center">
                        <FiPhoneCall />{' '}
                        <span>
                           <a className={cx('link')} href="callTo:+84 84-666-9107">
                              <p className="mb-0 text-center"> +84 666-9107 </p>
                           </a>
                        </span>
                     </div>

                     <Button
                        leftIcon={<FiFacebook />}
                        text
                        className={cx('link')}
                        target="_blank"
                        rel="noopener noreferrer"
                        to={'https://www.facebook.com/profile.php?id=100004998315019'}
                     >
                        <p className="mb-0 text-center">https://www.facebook.com/...</p>
                     </Button>
                     <div className="d-flex align-items-center gap-1 justify-content-center">
                        <AiOutlineMail />{' '}
                        <span>
                           <a className={cx('link')} href="mailto:tungphan12h@gmail.com">
                              <p className="mb-0 text-center">tungphan12h@gmail.com</p>
                           </a>
                        </span>
                     </div>

                     <Button
                        leftIcon={<BsGithub />}
                        className={cx('link')}
                        text
                        to={'https://github.com/jangcui?tab=repositories'}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        <p className="mb-0 text-center"> github.com/...</p>
                     </Button>
                  </div>
               </div>
            </div>
            <div className={cx('information', 'row col-12 col-lg-7  row-col-sm-3 justify-content-around')}>
               <div className={cx('content', 'col')}>
                  <h3>Information</h3>
                  <p>Privacy Policy</p>
                  <p>Refund Policy</p>
                  <p>Shipping Policy</p>
                  <p>Terms & Condition</p>
                  <p>Blogs</p>
               </div>
               <div className={cx('content', 'col')}>
                  <h3>Accounts</h3>
                  <p>About Us</p>
                  <p>Faq</p>
                  <p>Contact</p>
               </div>
               <div className={cx('content', 'col')}>
                  <h3>Quick Link</h3>
                  <p>Laptops</p>
                  <p>Headphones</p>
                  <p>Tablets</p>
                  <p>Watch</p>
               </div>
            </div>
         </div>

         <div className={cx('copyright')}>
            <div className="d-flex gap-3 justify-content-center  align-items-center">
               <Button className={cx('link')} text to="https://github.com/jangcui?tab=repositories">
                  <GitHubIcon />
               </Button>
               <Button text to="https://www.facebook.com/profile.php?id=100004998315019">
                  <FaceBookIcon />
               </Button>
               <Button text to="https://mail.google.com/mail/u/0/?tab=km#inbox">
                  <GmailIcon />
               </Button>
               <p className="mt-3 text-end">
                  © 2023: Powered by <i>TungPhan</i>.
               </p>
            </div>
         </div>
      </div>
   )
}

export default Footer
