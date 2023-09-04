import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'

import InputCustom from '~/components/InputCustom'
import { AppDispatch } from '~/redux/store/store'
import BreadCrumb from '~/components/BreadCrumb'
import Button from '~/components/Button'
import ChangeTitle from '~/components/ChangeTitle'
import config from '~/routes/config'
import styles from './Login.module.scss'
import { resetPwdToken } from '~/redux/features/user/auth/authService'

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
         if (result.payload._id) {
            navigate('/login')
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
                  <h3 className="fs-2 fw-bold text-center mb-4">Reset Password</h3>
                  <div className="col-12 mb-4">
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
                  </div>
                  <div className="col-12 mb-4">
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

export default ResetPwd
