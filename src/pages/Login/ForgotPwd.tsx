import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha'

import InputCustom from '~/components/InputCustom'
import { AppDispatch } from '~/redux/store/store'
import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import ChangeTitle from '~/components/ChangeTitle'
import config from '~/routes/config'
import styles from './Login.module.scss'
import { useState } from 'react'
import { forgotPwdToken } from '~/redux/features/user/auth/authService'

const cx = classNames.bind(styles)

const forgotPwdSchema = Yup.object().shape({
   email: Yup.string().email('Email should be valid').required('Email is required'),
   mobile: Yup.number().required('Mobile is required'),
})
function ForgotPwd() {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const [isVerified, setIsVerified] = useState<boolean | null>(null)

   const formik = useFormik({
      initialValues: {
         email: '',
         mobile: 0,
      },
      validationSchema: forgotPwdSchema,
      onSubmit: async (values) => {
         if (!isVerified) {
            setIsVerified(false)
         } else {
            const result = await dispatch(forgotPwdToken(values))
            if (result.payload.token) {
               navigate(`/reset-password/${result.payload.token}`)
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
         <ChangeTitle title={'Forgot Password'} />
         <BreadCrumb title={'Forgot Password'} />
         <div className={cx('wrapper', 'row w-100 mt-4')}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4">
               <form className={cx('container')} onSubmit={formik.handleSubmit}>
                  <h3 className="fs-2 fw-bold text-center mb-4">Forgot Password</h3>
                  <p className={cx('instruction', 'mb-4')}>We will send your email to reset password.</p>
                  <div className="col-12 mb-4">
                     <InputCustom
                        defaultValue=""
                        onChange={formik.handleChange('mobile')}
                        onBlur={formik.handleBlur('mobile')}
                        className={cx('input')}
                        type={'text'}
                        placeholder={'Phone Number...'}
                     />
                     {formik.touched.mobile && formik.errors.mobile ? (
                        <span className={cx('error')}>{formik.errors.mobile}</span>
                     ) : null}
                  </div>
                  <div className="col-12 mb-4">
                     <InputCustom
                        value={formik.values.email}
                        onChange={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        className={cx('input')}
                        type={'text'}
                        placeholder={'Email Address'}
                     />
                     {formik.touched.email && formik.errors.email ? (
                        <span className={cx('error')}>{formik.errors.email}</span>
                     ) : null}
                  </div>
                  <div className="d-flex align-items-center flex-column mt-3">
                     <ReCAPTCHA
                        hl="en"
                        sitekey="6LdM9zcnAAAAAP9uuAnM7r0w3TxcuhXfJ2W25mHy"
                        onChange={(value) => handleVerify(value)}
                     />
                     <p>{isVerified === false ? <span className={cx('error')}>Please select to verify</span> : null}</p>
                  </div>
                  <div className="text-center mt-3">
                     <Button primary className={cx('btn')} type={'submit'}>
                        Submit
                     </Button>
                     <Button text type={'button'} className={cx('btn')} to={config.routes.login}>
                        Cancel
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      </>
   )
}

export default ForgotPwd
