import classNames from 'classnames/bind'
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
import { BsArrowLeft } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'

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
         const result = await dispatch(register(values))
         if (result.payload._id) {
            navigate('/login')
         }
      },
   })
   return (
      <>
         <ChangeTitle title={'SignUp'} />
         <BreadCrumb title={'SignUp'} />
         <div className={cx('wrapper', 'row w-100')}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4">
               <div className={cx('container')}>
                  <Button text className={cx('btn-back')} onClick={() => navigate('/login')}>
                     <BiArrowBack className="fs-1" />
                  </Button>
                  <h3 className="fs-2 fw-bold text-center mb-4">Sing Up</h3>
                  <form action="" onSubmit={formik.handleSubmit}>
                     <div className="row row-cols-2  mb-4">
                        <div className="col">
                           <p className="mb-0 fs-4 text-secondary">Fist Name:</p>
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
                        <div className="col ">
                           <p className="mb-0 fs-4 text-secondary">Last Name:</p>
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

                     <div className="col-12 mb-4">
                        <p className="mb-0 fs-4 text-secondary">Email:</p>
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
                     <div className="col-12 mb-4">
                        <p className="mb-0 fs-4 text-secondary">Phone Number:</p>
                        <InputCustom
                           className={cx('input')}
                           type="text"
                           placeholder="+84....."
                           value={formik.values.mobile}
                           onChange={formik.handleChange('mobile')}
                           onBlur={formik.handleBlur('mobile')}
                        />
                        <span className={cx('error')}>{formik.touched.mobile && formik.errors.mobile} </span>
                     </div>

                     <div className="col-12 mb-4">
                        <p className="mb-0 fs-4 text-secondary">Password:</p>
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

                     <div className="col-12 mb-4">
                        <p className="mb-0 fs-4 text-secondary">Password Confirm:</p>
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
                     <div className="text-center mt-5">
                        <Button primary className={cx('btn')} type={'submit'} lazyLoad={isLoading}>
                           Sign Up
                        </Button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}

export default SignUp
