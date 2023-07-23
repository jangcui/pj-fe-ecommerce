import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { BiArrowBack } from 'react-icons/bi'
import ReCAPTCHA from 'react-google-recaptcha'
import { useState } from 'react'

import InputCustom from '~/components/InputCustom'
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
   const { isLoading } = useSelector((state: RootState) => state.customer)
   const [isVerified, setIsVerified] = useState<boolean | null>(null)

   const navigate = useNavigate()

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
         if (!isVerified) {
            setIsVerified(false)
         } else {
            const result = await dispatch(register(values))
            if (result.payload._id) {
               navigate('/login')
            }
         }
      },
   })
   const handleVerify = (value: any) => {
      if (value) setIsVerified(true)
      else setIsVerified(false)
   }
   return (
      <>
         <ChangeTitle title={'SignUp'} />
         <BreadCrumb title={'SignUp'} />
         <div className={cx('wrapper', 'row w-100')}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4">
               <div className={cx('container')}>
                  <Button text className={cx('btn-back')} onClick={() => window.history.back()}>
                     <BiArrowBack className="fs-1" />
                  </Button>
                  <h3 className="fs-2 fw-bold text-center mb-3">Sing Up</h3>
                  <form action="" onSubmit={formik.handleSubmit}>
                     <div className="row row-cols-2 mb-3 mt-4">
                        <div className="col">
                           <InputCustom
                              className={cx('input')}
                              type={'text'}
                              placeholder="Fist Name..."
                              value={formik.values.fist_name}
                              onChange={formik.handleChange('fist_name')}
                              onBlur={formik.handleBlur('fist_name')}
                           />
                           <span className={cx('error')}>{formik.touched.fist_name && formik.errors.fist_name} </span>
                        </div>
                        <div className="col ">
                           <InputCustom
                              className={cx('input')}
                              type={'text'}
                              placeholder="Last Name..."
                              value={formik.values.last_name}
                              onChange={formik.handleChange('last_name')}
                              onBlur={formik.handleBlur('last_name')}
                           />
                           <span className={cx('error')}>{formik.touched.last_name && formik.errors.last_name} </span>
                        </div>
                     </div>

                     <div className="col-12 mb-3">
                        <InputCustom
                           className={cx('input')}
                           type="email"
                           placeholder="Example@gmail.com"
                           value={formik.values.email}
                           onChange={formik.handleChange('email')}
                           onBlur={formik.handleBlur('email')}
                        />
                        <span className={cx('error')}>{formik.touched.email && formik.errors.email} </span>
                     </div>
                     <div className="col-12 mb-3">
                        <InputCustom
                           className={cx('input')}
                           type="text"
                           placeholder="0123-456-789"
                           onChange={formik.handleChange('mobile')}
                           defaultValue=""
                           onBlur={formik.handleBlur('mobile')}
                        />
                        <span className={cx('error')}>{formik.touched.mobile && formik.errors.mobile} </span>
                     </div>

                     <div className="col-12 mb-3">
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

                     <div className="col-12 mb-3">
                        <InputCustom
                           pwdStyle
                           name={'email'}
                           value={formik.values.passwordConfirm}
                           onChange={formik.handleChange('passwordConfirm')}
                           onBlur={formik.handleBlur('passwordConfirm')}
                           className={cx('input')}
                           type={'password'}
                           placeholder={'Password Confirm'}
                        />
                        <span className={cx('error')}>
                           {formik.touched.passwordConfirm && formik.errors.passwordConfirm}{' '}
                        </span>
                     </div>
                     <div className="d-flex align-items-center flex-column mt-5 ">
                        <ReCAPTCHA
                           hl="en"
                           sitekey="6LdM9zcnAAAAAP9uuAnM7r0w3TxcuhXfJ2W25mHy"
                           onChange={(value) => handleVerify(value)}
                        />
                        <p>
                           {isVerified === false ? <span className={cx('error')}>Please select to verify</span> : null}
                        </p>
                     </div>
                     <div className="text-center mt-2">
                        <Button primary className={cx('btn')} type={'submit'} lazyLoad={isLoading}>
                           Submit
                        </Button>
                     </div>
                  </form>
                  <div className="d-flex gap-2 justify-content-center align-items-center mt-4">
                     <p className="mb-0 fs-4"> Already have an account?</p>
                     <Button text onClick={() => navigate('/login')} className={cx('btn-sign-up')} type={'button'}>
                        Log In
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default SignUp
