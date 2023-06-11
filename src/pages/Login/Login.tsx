import classNames from 'classnames/bind'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/components/Button'
import config from '~/config/config'
import InputCustom from '~/components/InputCustom'
import styles from './Login.module.scss'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '~/store/store'
import { login } from '~/features/customers/customerService'

const cx = classNames.bind(styles)
const loginSchema = Yup.object().shape({
   email: Yup.string().email('Email should be valid').required('Email is required'),
   password: Yup.string().required('Password is required'),
})
function Login() {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const { isLoading, isError } = useSelector((state: RootState) => state.customer)
   const [message, setMessage] = useState<string>('')

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
         const result = await dispatch(login(values))
         console.log(result)
         if (result.payload.message) {
            setMessage(result.payload.message)
         } else {
            navigate('/')
            toast.success(`Login Successfully, well come ${result.payload.fist_name} ${result.payload.last_name}`)
         }
      },
   })

   return (
      <>
         <ChangeTitle title={'Login'} />
         <BreadCrumb title={'Login'} />
         <div className={cx('wrapper')}>
            <form className={cx('container')} onSubmit={formik.handleSubmit}>
               <h3 className={cx('title')}> Login</h3>
               <div className={cx('error')}>{isError ? message : ''}</div>
               <InputCustom
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
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
                  onBlur={formik.handleBlur('password')}
                  className={cx('input')}
                  type={'password'}
                  placeholder={'Enter Password'}
               />
               {formik.touched.password && formik.errors.password ? (
                  <span className={cx('error')}>{formik.errors.password}</span>
               ) : null}

               <Button to={config.routes.forgotPwd} text className={cx('sub')} type={'button'}>
                  <p className="fs-5">Forgot your password?</p>
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
