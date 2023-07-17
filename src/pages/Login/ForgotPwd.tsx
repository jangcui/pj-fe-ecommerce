import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import InputCustom from '~/components/InputCustom'
import { AppDispatch } from '~/store/store'
import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import ChangeTitle from '~/components/ChangeTitle'
import config from '~/config'
import { forgotPwdToken } from '~/features/customers/customerService'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)

const forgotPwdSchema = Yup.object().shape({
   email: Yup.string().email('Email should be valid').required('Email is required'),
})
function ForgotPwd() {
   const dispatch = useDispatch<AppDispatch>()
   const navigate = useNavigate()
   const formik = useFormik({
      initialValues: {
         email: '',
      },
      validationSchema: forgotPwdSchema,
      onSubmit: async (values) => {
         const result = await dispatch(forgotPwdToken(values))
         if (result.payload.token) {
            navigate(`/reset-password/${result.payload.token}`)
         }
      },
   })
   return (
      <>
         <ChangeTitle title={'Forgot Password'} />
         <BreadCrumb title={'Forgot Password'} />
         <div className={cx('wrapper', 'row w-100 mt-4')}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4">
               <form className={cx('container')} onSubmit={formik.handleSubmit}>
                  <h3 className="fs-2 fw-bold text-center mb-4">Forgot Password</h3>
                  <p className={cx('instruction', 'mb-4')}>We will send your email to reset password </p>
                  <div className="col-12 mb-4">
                     <p className="mb-0 fs-4 text-secondary">Enter Your Email Address:</p>
                     <InputCustom
                        value={formik.values.email}
                        onChange={formik.handleChange('email')}
                        onBlur={formik.handleBlur('email')}
                        className={cx('input')}
                        type={'text'}
                        placeholder={'Enter Email Registered'}
                     />
                     {formik.touched.email && formik.errors.email ? (
                        <span className={cx('error')}>{formik.errors.email}</span>
                     ) : null}
                  </div>

                  <div className="text-center mt-4">
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
