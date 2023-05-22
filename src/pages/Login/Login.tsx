import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/layouts/components/Button'
import config from '~/config/config'
import InputCustom from '~/components/InputCustom'
import styles from './Login.module.scss'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '~/store/store'
import { login } from '~/features/customers/customerService'

const cx = classNames.bind(styles)

function Login() {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const { user, isLoading, isSuccess, message } = useSelector((state: RootState) => state.auth)
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
      onSubmit: async (values) => {
         await dispatch(login(values))
      },
   })
   useEffect(() => {
      if (isSuccess && user) {
         navigate('/')
      } else {
         navigate('')
      }
   }, [user, navigate, isSuccess])
   return (
      <>
         <ChangeTitle title={'Login'} />
         <BreadCrumb title={'Login'} />
         <div className={cx('wrapper')}>
            <form className={cx('container')} onSubmit={formik.handleSubmit}>
               <h3 className={cx('title')}> Login</h3>
               <div className={cx('error')}>
                  {message.message === 'Rejected' ? 'Something went wrong, try again!' : ''}
               </div>
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
               <InputCustom
                  pwdStyle={true}
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  className={cx('input')}
                  type={'password'}
                  placeholder={'Enter Password'}
               />
               {formik.touched.password && formik.errors.password ? (
                  <span className={cx('error')}>{formik.errors.password}</span>
               ) : null}

               <Button to={config.routes.forgotPwd} text className={cx('sub')} type={'button'}>
                  Forgot your password?
               </Button>
               <div className={cx('login-btn')}>
                  <Button className={cx('btn')} type={'submit'} lazyLoad={isLoading}>
                     Login
                  </Button>
                  <Button to={config.routes.signup} className={cx('btn')} type={'button'}>
                     Sign up
                  </Button>
               </div>
            </form>
         </div>
      </>
   )
}

export default Login
