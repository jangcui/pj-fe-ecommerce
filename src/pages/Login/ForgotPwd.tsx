import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import InputCustom from '~/components/InputCustom'
import { AppDispatch, RootState } from '~/store/store'
import * as Yup from 'yup'

import styles from './Login.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/components/Button'
import config from '~/config'
import { forgotPwdToken } from '~/features/customers/customerService'

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
         console.log(result)

         // if (result.payload.token) {
         //    navigate(`/reset-password/${result.payload.token}`)
         // }
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
