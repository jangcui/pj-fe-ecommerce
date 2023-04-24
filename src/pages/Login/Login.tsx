import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/layouts/components/Button'
import config from '~/config/config'
import InputCustom from '~/components/InputCustom'
import { EyeIcon, EyeSlashIcon } from '~/components/Icon'
import styles from './Login.module.scss'
import { login } from '~/features/auth/authSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)
interface FormValues {
   email: string
   password: string
}
function Login() {
   const dispatch = useDispatch<any>()
   const navigate = useNavigate()
   const { user, isError, isLoading, isSuccess, message } = useSelector((state: any) => state.auth)
   const userSchema = Yup.object().shape({
      email: Yup.string().email('Email should be valid').required('Email is required'),
      password: Yup.string().required('Password is required'),
   })
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: userSchema,
      onSubmit: (values: FormValues) => {
         dispatch(login(values))
         console.log(user, isError, isLoading, isSuccess, message)
         console.log(typeof user)
      },
   })

   return (
      <>
         <ChangeTitle title={'Login'} />
         <BreadCrumb title={'Login'} />
         <div className={cx('wrapper')}>
            <form className={cx('container')} onSubmit={formik.handleSubmit}>
               <h3 className={cx('title')}> Login</h3>
               <div className={cx('error')}> {message.message == 'Rejected' ? 'You are not admin' : ''}</div>
               <InputCustom
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  className={cx('input')}
                  type={'text'}
                  placeholder={'Email'}
               />
               {formik.touched.email && formik.errors.email ? (
                  <span className={cx('error')}>{formik.errors.email}</span>
               ) : null}
               <div className={cx('wrap-input')}>
                  <InputCustom
                     value={formik.values.password}
                     onChange={formik.handleChange('password')}
                     className={cx('input')}
                     type={'current-password'}
                     placeholder={'Enter Password'}
                  />
                  <EyeSlashIcon className={cx('icon')} />
                  <EyeIcon className={cx('icon')} />
               </div>
               {formik.touched.password && formik.errors.password ? (
                  <span className={cx('error')}>{formik.errors.password}</span>
               ) : null}

               <Button to={config.routes.forgotPwd} text className={cx('sub')}>
                  Forgot your password?
               </Button>
               <div className={cx('login-btn')}>
                  <Button className={cx('btn')} type={'submit'}>
                     Login
                  </Button>
                  <Button to={config.routes.signup} className={cx('btn')}>
                     Sign up
                  </Button>
               </div>
            </form>
         </div>
      </>
   )
}

export default Login
