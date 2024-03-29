import classNames from 'classnames/bind'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import Button from '~/components/Button'
import config from '~/routes/config/config'
import InputCustom from '~/components/InputCustom'
import styles from './Login.module.scss'
import { AppDispatch, RootState } from '~/redux/store/store'
import { login } from '~/redux/features/user/auth/authService'
import { closeModalLogin } from '~/redux/features/modals/modalSlice'

const cx = classNames.bind(styles)
const loginSchema = Yup.object().shape({
   email: Yup.string().email('Email should be valid').required('Email is required'),
   password: Yup.string().required('Password is required'),
})
function Login() {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const { isLoading, isError } = useSelector((state: RootState) => state.auth)
   const [message, setMessage] = useState<string>('')

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
         const result = await dispatch(login(values))
         if (result.payload.message) {
            setMessage(result.payload.message)
         } else {
            toast.success(`Logged in, welcome ${result.payload.first_name} ${result.payload.last_name}`)
            if (window.location.pathname === '/login') {
               navigate('/')
               dispatch(closeModalLogin())
            } else {
               dispatch(closeModalLogin())
               return
            }
         }
      },
   })

   const handleForgotPw = () => {
      navigate(config.routes.forgotPwd)
      dispatch(closeModalLogin())
   }

   return (
      <>
         <div className={cx('wrapper', 'w-100 col-10 col-md-8 col-lg-6')}>
            <div className="row mt-4 w-100">
               <form className={cx('container')} onSubmit={formik.handleSubmit}>
                  <h3 className="fs-2 fw-bold text-center mb-4"> Login</h3>
                  <div className={cx('error')}>{isError ? message : ''}</div>
                  <div className="col-12 mb-4">
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
                  </div>
                  <div className="col-12 mb-4">
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
                  </div>
                  <Button onClick={handleForgotPw} text className={cx('sub')} type={'button'}>
                     <p className="fs-5">Forgot your password?</p>
                  </Button>
                  <div className="text-center mt-3">
                     <Button className={cx('btn')} type={'submit'} lazyLoad={isLoading}>
                        Login
                     </Button>
                  </div>
                  <div className="d-flex gap-2 justify-content-center align-items-center mt-4">
                     <p className="mb-0 fs-4">You don&apos;t have an account?</p>
                     <Button
                        to={config.routes.signup}
                        text
                        onClick={() => dispatch(closeModalLogin())}
                        className={cx('btn-sign-up')}
                        type={'button'}
                     >
                        Sign Up
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}

export default Login
