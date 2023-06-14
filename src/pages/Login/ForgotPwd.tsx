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
         <div className={cx('wrapper')}>
            <form className={cx('container')} onSubmit={formik.handleSubmit}>
               <h3 className={cx('title')}>Forgot Password</h3>
               <span className={cx('instruction')}>We will send your email to reset password </span>
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
               <div className={cx('rs-pw-btn')}>
                  <Button primary className={cx('btn')} type={'submit'}>
                     Submit
                  </Button>
                  <Button text type={'button'} className={cx('btn')} to={config.routes.login}>
                     Cancel
                  </Button>
               </div>
            </form>
         </div>
      </>
   )
}

export default ForgotPwd
