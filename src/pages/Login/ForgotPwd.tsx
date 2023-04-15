import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/layouts/components/Button'
import config from '~/config'
const cx = classNames.bind(styles)

function ForgotPwd() {
   return (
      <>
         <ChangeTitle title={'Forgot Password'} />
         <BreadCrumb title={'Forgot Password'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <h3 className={cx('title')}>Reset Password</h3>
               <span className={cx('instruction')}>We will send your email to reset password </span>
               <input className={cx('input')} type="email" placeholder="Email" />

               <div className={cx('rs-pw-btn')}>
                  <Button primary className={cx('btn')}>
                     Submit
                  </Button>
                  <Button text className={cx('btn')} to={config.routes.login}>
                     Cancel
                  </Button>
               </div>
            </div>
         </div>
      </>
   )
}

export default ForgotPwd
