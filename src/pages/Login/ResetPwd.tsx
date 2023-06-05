import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import InputCustom from '~/components/InputCustom'
import { AppDispatch, RootState } from '~/store/store'
import * as Yup from 'yup'

import styles from './Login.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/components/Button'
import config from '~/config'
import { resetPwdToken } from '~/features/customers/customerService'

const cx = classNames.bind(styles)

const forgotPwdSchema = Yup.object().shape({
   password: Yup.string().required('Password is required'),
   pwdConfirm: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm password is required'),
})
function ResetPwd() {
   const dispatch = useDispatch<AppDispatch>()
   const { token } = useParams()
   const navigate = useNavigate()
   const formik = useFormik({
      initialValues: {
         password: '',
         pwdConfirm: '',
      },
      validationSchema: forgotPwdSchema,
      onSubmit: async (values) => {
         const result = await dispatch(resetPwdToken({ password: values.pwdConfirm, token: token }))
         console.log(result)
         if (result.payload.role) {
            navigate('/login')
         }
      },
   })
   return (
      <>
         <ChangeTitle title={'Forgot Password'} />
         <BreadCrumb title={'Forgot Password'} />
         <div className={cx('wrapper')}>
            <form className={cx('container')} onSubmit={formik.handleSubmit}>
               <h3 className={cx('title')}>Reset Password</h3>
               <InputCustom
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  className={cx('input')}
                  type={'text'}
                  pwdStyle={true}
                  placeholder={'New Password'}
               />
               {formik.touched.password && formik.errors.password ? (
                  <span className={cx('error')}>{formik.errors.password}</span>
               ) : null}
               <InputCustom
                  value={formik.values.pwdConfirm}
                  onChange={formik.handleChange('pwdConfirm')}
                  onBlur={formik.handleBlur('pwdConfirm')}
                  className={cx('input')}
                  type={'text'}
                  pwdStyle={true}
                  placeholder={'Confirm Password'}
               />
               {formik.touched.pwdConfirm && formik.errors.pwdConfirm ? (
                  <span className={cx('error')}>{formik.errors.pwdConfirm}</span>
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

export default ResetPwd
