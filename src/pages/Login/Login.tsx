import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/layouts/components/Button'
import FormPassword from './FormPassword'
import config from '~/config/config'
const cx = classNames.bind(styles)

function Login() {
   return (
      <>
         <ChangeTitle title={'Login'} />
         <BreadCrumb title={'Login'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <h3 className={cx('title')}> Login</h3>
               <input className={cx('input')} type="email" placeholder="Email" />
               <FormPassword placeHolder={'Password'} />
               <Button to={config.routes.forgotPwd} text className={cx('sub')}>
                  Forgot your password?
               </Button>
               <div className={cx('login-btn')}>
                  <Button className={cx('btn')}>Login</Button>
                  <Button to={config.routes.signup} className={cx('btn')}>
                     Sign up
                  </Button>
               </div>
            </div>
         </div>
      </>
   )
}

export default Login
