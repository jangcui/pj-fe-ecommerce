import classNames from 'classnames/bind'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Contact.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/components/Button'
import { AppDispatch, RootState } from '~/store/store'
import InputCustom from '~/components/InputCustom/InputCustom'
import { createEnquiry } from '~/features/enquiry/enquiryService'
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
         console.log(values)
         dispatch(createEnquiry(values))
      },
   })

   return (
      <>
         <ChangeTitle title={'Contact Us'} />
         <BreadCrumb title={'Contact Us'} />
         <div className={cx('wrapper')}>
            <iframe
               title="address"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.712774452!2d106.6276427!3d10.8332787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b54dd7d99cd%3A0x88971bc9b5a1793e!2zQ8O0bmcgdmnDqm4gQ8OieSBT4buZcA!5e0!3m2!1svi!2s!4v1680913884157!5m2!1svi!2s"
               className={cx('map')}
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className={cx('content')}>
               <form className={cx('form-submit')} action="" onSubmit={formik.handleSubmit}>
                  <h3 className={cx('title')}>Submit</h3>
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
               <div className={cx('contact')}>
                  <h3 className={cx('title')}>Get In Touch With Us</h3>
                  <ul>
                     <li>
                        <Button className={cx('btn')} text href="tel:084 666 9107 ">
                           Phone:<span> +84 84 666 9107</span>
                        </Button>
                     </li>
                     <li>
                        <Button className={cx('btn')} text>
                           Email: <span>majdjtu@gmail.com</span>
                        </Button>
                     </li>
                     <li>
                        <Button className={cx('btn')} text to="https://github.com/jangcui?tab=repositories">
                           GitHub:<span> github.com/jangcui?tab=repositories</span>
                        </Button>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}

export default Contact
