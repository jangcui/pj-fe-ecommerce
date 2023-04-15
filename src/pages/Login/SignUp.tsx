import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/layouts/components/Button'
import FormPassword from './FormPassword'
import config from '~/config/config'
const cx = classNames.bind(styles)

function SignUp() {
   return (
      <>
         <ChangeTitle title={'SignUp'} />
         <BreadCrumb title={'SignUp'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <h3 className={cx('title')}>Sing Up</h3>
               <input className={cx('input')} type="text" placeholder="Name" />
               <input className={cx('input')} type="email" placeholder="Email" />
               <input className={cx('input')} type="text" placeholder="Number" />
               <FormPassword placeHolder={'Password'} />
               <FormPassword placeHolder={'ConfirmPassword'} />

               <div className={cx('signup-btn')}>
                  <Button primary className={cx('btn')}>
                     Sign Up
                  </Button>
               </div>
            </div>
         </div>
      </>
   )
}

export default SignUp
