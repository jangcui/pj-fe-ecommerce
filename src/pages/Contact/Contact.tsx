import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { FiFacebook, FiPhoneCall } from 'react-icons/fi'
import { AiOutlineMail } from 'react-icons/ai'
import { BsGithub } from 'react-icons/bs'

import styles from './Contact.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/redux/store/store'
import InputCustom from '~/components/InputCustom/InputCustom'
import { createEnquiry } from '~/redux/features/enquiry/enquiryService'
const cx = classNames.bind(styles)

const contactSchema = Yup.object().shape({
   name: Yup.string().required('Name is required'),
   email: Yup.string().email('Email should be valid').required('Email is required'),
   mobile: Yup.string().required('Phone number is required'),
   comment: Yup.string().required('Please enter comments'),
})

function Contact() {
   const dispatch = useDispatch<AppDispatch>()
   const { isLoading } = useSelector((state: RootState) => state.enquiries)

   const formik = useFormik({
      initialValues: {
         name: '',
         email: '',
         mobile: '',
         comment: '',
      },
      validationSchema: contactSchema,
      onSubmit: async (values) => {
         dispatch(createEnquiry(values))
      },
   })

   return (
      <>
         <ChangeTitle title={'Contact Us'} />
         <BreadCrumb title={'Contact Us'} />
         <div className={cx('wrapper', 'w-100 row justify-content-center')}>
            <div className="col-12">
               <iframe
                  title="address"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.712774452!2d106.6276427!3d10.8332787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b54dd7d99cd%3A0x88971bc9b5a1793e!2zQ8O0bmcgdmnDqm4gQ8OieSBT4buZcA!5e0!3m2!1svi!2s!4v1680913884157!5m2!1svi!2s"
                  loading="lazy"
                  className={cx('map')}
                  referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>

            <div className={cx('content', 'row col-12 row-cols-1 row-cols-md-2 ')}>
               <div className={cx('contact', 'col')}>
                  <h3 className="fs-1 text-center mb-4">Get In Touch With Us</h3>
                  <Button leftIcon={<FiPhoneCall />} className={cx('link')} text href={'callTo:+84 84-666-9107'}>
                     <p className="w-100 mb-0 text-start fs-3"> +84 666-9107 </p>
                  </Button>
                  <Button
                     leftIcon={<FiFacebook className="fs-3" />}
                     text
                     className={cx('link')}
                     to={'https://www.facebook.com/profile.php?id=100004998315019'}
                  >
                     <p className="w-100 mb-0 text-start fs-3">
                        https://www.facebook.com/profile.php?id=100004998315019
                     </p>
                  </Button>
                  <Button leftIcon={<AiOutlineMail />} className={cx('link')} text href={'majdjtu@gmail.com'}>
                     <p className="w-100 mb-0 text-start fs-3"> majdjtu@gmail.com </p>
                  </Button>
                  <Button
                     leftIcon={<BsGithub className="fs-3" />}
                     className={cx('link')}
                     text
                     to={'https://github.com/jangcui?tab=repositories'}
                  >
                     <p className="w-100 mb-0 text-start fs-3">https://github.com/jangcui?tab=repositories</p>
                  </Button>
               </div>

               <div className="col">
                  <form className={cx('form-submit')} action="" onSubmit={formik.handleSubmit}>
                     <h3 className="fs-1 text-center mb-4">Submit</h3>
                     <div className={cx('field')}>
                        <InputCustom
                           value={formik.values.name}
                           onChange={formik.handleChange('name')}
                           className={cx('input')}
                           type={'text'}
                           onBlur={formik.handleBlur('name')}
                           placeholder={'Name'}
                        />
                        {formik.touched.name && formik.errors.name ? (
                           <span className={cx('error')}>{formik.errors.name}</span>
                        ) : null}
                     </div>
                     <div className={cx('field')}>
                        <InputCustom
                           value={formik.values.email}
                           onChange={formik.handleChange('email')}
                           className={cx('input')}
                           onBlur={formik.handleBlur('email')}
                           type={'text'}
                           placeholder={'Email'}
                        />
                        {formik.touched.email && formik.errors.email ? (
                           <span className={cx('error')}>{formik.errors.email}</span>
                        ) : null}
                     </div>
                     <div className={cx('field')}>
                        <InputCustom
                           value={formik.values.mobile}
                           onChange={formik.handleChange('mobile')}
                           className={cx('input')}
                           type={'text'}
                           onBlur={formik.handleBlur('mobile')}
                           placeholder={'Phone Number'}
                        />
                        {formik.touched.mobile && formik.errors.mobile ? (
                           <span className={cx('error')}>{formik.errors.mobile}</span>
                        ) : null}
                     </div>
                     <div className={cx('field')}>
                        <textarea
                           itemType="text"
                           onBlur={formik.handleBlur('comment')}
                           onChange={formik.handleChange('comment')}
                           placeholder="Comments"
                        />
                        {formik.touched.comment && formik.errors.comment ? (
                           <span className={cx('error')}>{formik.errors.comment}</span>
                        ) : null}
                     </div>
                     <Button primary className={cx('btn')} type={'submit'} lazyLoad={isLoading}>
                        Submit
                     </Button>
                  </form>
               </div>
            </div>
         </div>
      </>
   )
}

export default Contact
