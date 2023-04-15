import classNames from 'classnames/bind'
import styles from './Contact.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/layouts/components/Button'
const cx = classNames.bind(styles)

function Contact() {
   return (
      <>
         <ChangeTitle title={'Contact Us'} />
         <BreadCrumb title={'Contact Us'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <iframe
                  title="address"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.712774452!2d106.6276427!3d10.8332787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b54dd7d99cd%3A0x88971bc9b5a1793e!2zQ8O0bmcgdmnDqm4gQ8OieSBT4buZcA!5e0!3m2!1svi!2s!4v1680913884157!5m2!1svi!2s"
                  className={cx('map')}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
               ></iframe>

               <div className={cx('content')}>
                  <div className={cx('form-submit')}>
                     <h3 className={cx('title')}>Submit</h3>
                     <input type="text" placeholder="Name" />
                     <input type="email" placeholder="Email*" />
                     <input type="text" placeholder="Phone Number" />
                     <textarea itemType="text" placeholder="Comments" />
                     <Button primary className={cx('btn')}>
                        Submit
                     </Button>
                  </div>
                  <div className={cx('contact')}>
                     <h3 className={cx('title')}>Get In Touch With Us</h3>
                     <ul>
                        <li>
                           <Button className={cx('btn')} text href="tel:084 666 9107 ">
                              Phone:<span> +84 84 666 9107</span>
                           </Button>
                        </li>
                        <li>
                           <Button className={cx('btn')} text>
                              Email: <span>majdjtu@gmail.com</span>
                           </Button>
                        </li>
                        <li>
                           <Button className={cx('btn')} text to="https://github.com/jangcui?tab=repositories">
                              GitHub:<span> github.com/jangcui?tab=repositories</span>
                           </Button>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Contact
