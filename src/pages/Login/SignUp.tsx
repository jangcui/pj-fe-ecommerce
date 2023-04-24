import classNames from 'classnames/bind'
import styles from './Login.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/layouts/components/Button'
import config from '~/config'
import { EyeIcon, EyeSlashIcon } from '~/components/Icon'
import { useState } from 'react'
import InputCustom from '~/components/InputCustom/InputCustom'
const cx = classNames.bind(styles)

function SignUp() {
   const [password, setPassword] = useState('')
   const [conFirmPwd, setConFirmPwd] = useState('')
   const handlePassword = (e: any) => {
      setPassword(e)
   }
   const handleConFirmPwd = (e: any) => {
      setConFirmPwd(e)
   }

   return (
      <>
         <ChangeTitle title={'SignUp'} />
         <BreadCrumb title={'SignUp'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <h3 className={cx('title')}>Sing Up</h3>
               <input className={cx('input')} type="text" placeholder="Name" />
               <input className={cx('input')} type="email" placeholder="Email" />
               <input className={cx('input')} type="text" placeholder="Number" />
               <div className={cx('wrap-input')}>
                  <InputCustom
                     value={password}
                     onChange={handlePassword}
                     className={cx('input')}
                     type={'current-password'}
                     placeholder={'Password'}
                  />
                  <EyeSlashIcon className={cx('icon')} />
                  <EyeIcon className={cx('icon')} />
               </div>{' '}
               <div className={cx('wrap-input')}>
                  <InputCustom
                     value={conFirmPwd}
                     onChange={handleConFirmPwd}
                     className={cx('input')}
                     type={'password'}
                     placeholder={'ConfirmPassword'}
                  />
                  <EyeSlashIcon className={cx('icon')} />
                  <EyeIcon className={cx('icon')} />
               </div>
               <div className={cx('signup-btn')}>
                  <Button primary className={cx('btn')}>
                     Sign Up
                  </Button>
               </div>
            </div>
         </div>
      </>
   )
}

export default SignUp
