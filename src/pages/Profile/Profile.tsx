import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEdit } from 'react-icons/ai'
import * as Yup from 'yup'

import styles from './Profile.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import { AppDispatch, RootState } from '~/redux/store/store'
import InputCustom from '~/components/InputCustom'
import Button from '~/components/Button'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '~/redux/features/user/auth/authService'
const cx = classNames.bind(styles)

const profileSchema = Yup.object().shape({
   first_name: Yup.string().required('Fist Name is required'),
   last_name: Yup.string().required('Last Name is required'),
   email: Yup.string().email('Email should be valid').required('Email is required'),
   mobile: Yup.string().required('Mobile Number is required'),
})

function Profile() {
   const dispatch = useDispatch<AppDispatch>()
   const { isLogin, user } = useSelector((state: RootState) => state.auth)
   const [isEdit, setIsEdit] = useState<boolean>(true)
   const navigate = useNavigate()

   useEffect(() => {
      if (!isLogin) {
         navigate('/login')
      } else {
         return
      }
   }, [isLogin, navigate, dispatch])

   const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
         first_name: user?.first_name ? user.first_name : '',
         last_name: user?.last_name ? user.last_name : '',
         email: user?.email ? user.email : '',
         mobile: user?.mobile ? user.mobile : '',
      },
      validationSchema: profileSchema,
      onSubmit: (values) => {
         dispatch(updateProfile(values))
         setIsEdit(true)
      },
   })

   return (
      <>
         <ChangeTitle title={'Profile'} />
         <BreadCrumb title={'Profile'} />
         <div className={cx('wrapper')}>
            <div className={cx('title')}>
               <h2>Update Profile</h2>
               <Button text className={cx('btn-icon')} onClick={() => setIsEdit(!isEdit)}>
                  <AiOutlineEdit className={cx('icon')} />
               </Button>
            </div>
            <form className={cx('container')} action="" onSubmit={formik.handleSubmit}>
               <div className={cx('field')}>
                  <h3>Fist name: </h3>
                  <InputCustom
                     value={formik.values.first_name}
                     onChange={formik.handleChange('first_name')}
                     className={cx('input')}
                     disabled={isEdit}
                     name={'first_name'}
                     onBlur={formik.handleBlur('first_name')}
                  />
                  {formik.touched.first_name && formik.errors.first_name ? (
                     <span className={cx('error')}>{formik.errors.first_name}</span>
                  ) : null}
               </div>
               <div className={cx('field')}>
                  <h3>Last name: </h3>
                  <InputCustom
                     value={formik.values.last_name}
                     onChange={formik.handleChange('last_name')}
                     disabled={isEdit}
                     className={cx('input')}
                     name={'last_name'}
                     onBlur={formik.handleBlur('last_name')}
                  />{' '}
                  {formik.touched.last_name && formik.errors.last_name ? (
                     <span className={cx('error')}>{formik.errors.last_name}</span>
                  ) : null}
               </div>
               <div className={cx('field')}>
                  <h3>Email: </h3>
                  <InputCustom
                     value={formik.values.email}
                     onChange={formik.handleChange('email')}
                     disabled={isEdit}
                     className={cx('input')}
                     name={'email'}
                     onBlur={formik.handleBlur('email')}
                  />{' '}
                  {formik.touched.email && formik.errors.email ? (
                     <span className={cx('error')}>{formik.errors.email}</span>
                  ) : null}
               </div>
               <div className={cx('field')}>
                  <h3>Mobile: </h3>
                  <InputCustom
                     value={formik.values.mobile}
                     onChange={formik.handleChange('mobile')}
                     disabled={isEdit}
                     className={cx('input')}
                     name={'mobile'}
                     onBlur={formik.handleBlur('mobile')}
                  />
                  {formik.touched.mobile && formik.errors.mobile ? (
                     <span className={cx('error')}>{formik.errors.mobile}</span>
                  ) : null}
               </div>
               {!isEdit && (
                  <Button primary type={'submit'} className={cx('btn')}>
                     Save
                  </Button>
               )}
            </form>
         </div>
      </>
   )
}

export default Profile
