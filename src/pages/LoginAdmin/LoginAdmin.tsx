import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Button from '~/components/Button'
import InputCustom from '~/components/InputCustom'
import styles from './LoginAdmin.module.scss'
import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '~/store/store'
import { loginAdmin } from '~/features/admin/adminService'

const cx = classNames.bind(styles)

function LoginAdmin() {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const { isLoading, isSuccess, message, admin, isAdmin } = useSelector((state: RootState) => state.auth)
   const loginSchema = Yup.object().shape({
      email: Yup.string().email('Email should be valid').required('Email is required'),
      password: Yup.string().required('Password is required'),
   })
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
         await dispatch(loginAdmin(values))
      },
   })
   useEffect(() => {
      if (isSuccess && admin && isAdmin) {
         navigate('/admin')
      } else {
         navigate('')
      }
   }, [navigate, isSuccess, isAdmin, admin])
   console.log(message)
   return (
      <div className={cx('wrapper', 'row w-100 m-0')}>
         <div className="col-10 col-md-8 col-lg-6 col-xl-4">
            <form className={cx('container')} onSubmit={formik.handleSubmit}>
               <h3 className="fs-2 fw-bold text-center mb-4"> Login</h3>
               <div className={cx('error')}>
                  {message.message === 'Rejected' ? 'Something went wrong, try again!' : ''}
               </div>
               <div className="col-12 mb-4">
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
               </div>
               <div className="col-12 mb-4">
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
               </div>
               <div className="text-center mt-4">
                  <Button className={cx('btn')} type={'submit'} lazyLoad={isLoading}>
                     Login
                  </Button>
               </div>
            </form>
         </div>
      </div>
   )
}

export default LoginAdmin
