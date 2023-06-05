import classNames from 'classnames/bind'
import { useEffect } from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import styles from '~/components/StyleModule/AdminStyle.module.scss'

import { useDispatch, useSelector } from 'react-redux'
import Button from '~/components/Button/Button'
import { AppDispatch, RootState } from '~/store/store'

import { useNavigate, useParams } from 'react-router-dom'
import { getAEnquiry, updateStatusEnquiry } from '~/features/enquiry/enquiryService'
import { resetEnquiryState } from '~/features/enquiry/enquirySlice'

const cx = classNames.bind(styles)

function Enquiry() {
   const dispatch = useDispatch<AppDispatch>()
   const enquiryState = useSelector((state: RootState) => state.enquiries.enquiry)
   const navigate = useNavigate()
   const { enqId } = useParams()

   useEffect(() => {
      if (enqId) {
         dispatch(getAEnquiry(enqId))
      } else {
         dispatch(resetEnquiryState())
      }
   }, [enqId, dispatch])
   const setEnquiryStatus = async (value: string) => {
      if (enqId) {
         const data = { id: enqId, status: value }
         await dispatch(updateStatusEnquiry(data))
         dispatch(resetEnquiryState())
         await dispatch(getAEnquiry(enqId))
      }
   }
   const handleBack = () => {
      navigate(-1)
   }
   return (
      <div className={cx('wrapper')}>
         <div className={cx('title')}>
            <h1> View Enquiry</h1>
            <Button
               text
               className={cx('btn-back')}
               onClick={handleBack}
               leftIcon={<IoMdArrowBack className={cx('icon-back')} />}
            >
               Go back
            </Button>
         </div>
         <div className={cx('field')}>
            <span className={cx('key')}>Name:</span>
            <span className={cx('value')}>{enquiryState.name}</span>
         </div>
         <div className={cx('field')}>
            <span className={cx('key')}>Mobile:</span>
            <Button href={`tel:+84${enquiryState.mobile}`} text className={cx('btn-action')}>
               <i className={cx('value')}>{enquiryState.mobile}</i>
            </Button>
         </div>{' '}
         <div className={cx('field')}>
            <span className={cx('key')}>Email:</span>
            <Button href={`mailto:${enquiryState.email}`} text className={cx('btn-action')}>
               <i className={cx('value')}> {enquiryState.email}</i>
            </Button>
         </div>{' '}
         <div className={cx('field')}>
            <span className={cx('key')}>Comment:</span>
            <span className={cx('value')}>{enquiryState.comment}</span>
         </div>{' '}
         <div className={cx('field')}>
            <span className={cx('key')}>Status:</span>
            <span className={cx('value')}>{enquiryState.status}</span>
         </div>
         <div className={cx('field')}>
            <span className={cx('key')}>Change Status:</span>
            <span className={cx('value')}>
               <select
                  defaultValue={enquiryState.status ? enquiryState.status : 'Submitted'}
                  onChange={(e) => setEnquiryStatus(e.target.value)}
               >
                  <option value="Contacted">Contacted</option>
                  <option value="Submitted">Submitted</option>
                  <option value="In progress">In progress</option>
                  <option value="Resolved">Resolved</option>
               </select>
            </span>
         </div>
      </div>
   )
}

export default Enquiry
