import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

import InputCustom from '~/components/InputCustom/InputCustom'
import { AppDispatch, RootState } from '~/store/store'
import styles from './Login.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/components/Button'
import { register } from '~/features/customers/customerService'
const cx = classNames.bind(styles)

const signUpSchema = Yup.object().shape({
   fist_name: Yup.string().required('Fist name is required'),
   last_name: Yup.string().required('Last name is required'),
   email: Yup.string().email('Email should be valid').required('Email is required'),
   mobile: Yup.number().required('Phone is required').positive().integer(),
   password: Yup.string().required('Password is required'),
   passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm password is required'),
})
function SignUp() {
   const dispatch = useDispatch<AppDispatch>()

   const loginState = useSelector((state: RootState) => state.auth)
   const navigate = useNavigate()
   useEffect(() => {
      if (loginState.isSuccess === true) {
         navigate('/')
      } else {
         navigate('')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [loginState])
   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         fist_name: '',
         last_name: '',
         email: '',
         mobile: 0,
         password: '',
         passwordConfirm: '',
      },
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
         await dispatch(register(values))
         if (loginState.isSuccess === true) {
            formik.resetForm()
         }
      },
   })

   return (
      <>
         <ChangeTitle title={'SignUp'} />
         <BreadCrumb title={'SignUp'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <h3 className={cx('title')}>Sing Up</h3>
               <form action="" onSubmit={formik.handleSubmit}>
                  <div className={cx('haft-input')}>
                     <div className={cx('wrap-input')}>
                        <InputCustom
                           className={cx('input')}
                           type={'text'}
                           placeholder="Enter Fist Name..."
                           value={formik.values.fist_name}
                           onChange={formik.handleChange('fist_name')}
                           onBlur={formik.handleBlur('fist_name')}
                        />
                        <span className={cx('error')}>{formik.touched.fist_name && formik.errors.fist_name} </span>
                     </div>
                     <div className={cx('wrap-input')}>
                        <InputCustom
                           className={cx('input')}
                           type={'text'}
                           placeholder="Enter Last Name..."
                           value={formik.values.last_name}
                           onChange={formik.handleChange('last_name')}
                           onBlur={formik.handleBlur('last_name')}
                        />
                        <span className={cx('error')}>{formik.touched.last_name && formik.errors.last_name} </span>
                     </div>
                  </div>
                  <div className={cx('wrap-input')}>
                     <InputCustom
                        className={cx('input')}
                        type="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                     />
                     <span className={cx('error')}>{formik.touched.email && formik.errors.email} </span>
                  </div>
                  <div className={cx('wrap-input')}>
                     <InputCustom
                        className={cx('input')}
                        type="text"
                        placeholder="Phone Number"
                        value={formik.values.mobile}
                        onChange={formik.handleChange('mobile')}
                        onBlur={formik.handleBlur('mobile')}
                     />
                     <span className={cx('error')}>{formik.touched.mobile && formik.errors.mobile} </span>
                  </div>

                  <div className={cx('wrap-input')}>
                     <InputCustom
                        value={formik.values.password}
                        onChange={formik.handleChange('password')}
                        onBlur={formik.handleBlur('password')}
                        className={cx('input')}
                        name={'name'}
                        type={'current-password'}
                        placeholder={'Password'}
                        pwdStyle
                     />
                     <span className={cx('error')}>{formik.touched.password && formik.errors.password} </span>
                  </div>

                  <div className={cx('wrap-input')}>
                     <InputCustom
                        pwdStyle
                        name={'email'}
                        value={formik.values.passwordConfirm}
                        onChange={formik.handleChange('passwordConfirm')}
                        onBlur={formik.handleBlur('passwordConfirm')}
                        className={cx('input')}
                        type={'password'}
                        placeholder={'ConfirmPassword'}
                     />
                     <span className={cx('error')}>
                        {formik.touched.passwordConfirm && formik.errors.passwordConfirm}{' '}
                     </span>
                  </div>
                  <div className={cx('signup-btn')}>
                     <Button primary className={cx('btn')} type={'submit'} lazyLoad={loginState.isLoading}>
                        Sign Up
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}

export default SignUp
