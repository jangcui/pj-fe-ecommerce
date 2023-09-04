import classNames from 'classnames/bind'

import styles from './ModalLogin.module.scss'
import { LoginComp } from '~/pages/Login'
import { AppDispatch, RootState } from '~/redux/store/store'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import Button from '../Button/Button'
import { closeModalLogin } from '~/redux/features/modalLogin/modalLoginSlice'

const cx = classNames.bind(styles)

function ModalLogin() {
   const dispatch = useDispatch<AppDispatch>()
   const { isOpen } = useSelector((state: RootState) => state.modalLogin)

   return (
      <div className={cx('wrapper', isOpen ? 'open' : 'close', 'row')}>
         <div className={cx('overlay')}></div>
         <Button text className={cx('btn-close')} onClick={() => dispatch(closeModalLogin())}>
            <div className={cx('btn')}>
               <AiOutlineClose className={cx('icon')} />
            </div>
         </Button>
         <div className={cx('container')}>
            <LoginComp />
         </div>
      </div>
   )
}

export default ModalLogin
