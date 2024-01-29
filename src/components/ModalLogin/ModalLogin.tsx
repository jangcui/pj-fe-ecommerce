import classNames from 'classnames/bind'

import styles from './ModalLogin.module.scss'
import { LoginComp } from '~/pages/Login'
import { AppDispatch, RootState } from '~/redux/store/store'
import { useSelector, useDispatch } from 'react-redux'
import Button from '../Button/Button'
import { closeModalLogin } from '~/redux/features/modals/modalSlice'

const cx = classNames.bind(styles)

function ModalLogin() {
   const dispatch = useDispatch<AppDispatch>()
   const { isOpen } = useSelector((state: RootState) => state.modals.loginModal)

   return (
      <div className={cx('wrapper', isOpen ? 'open' : 'close', 'row')}>
         <Button text className={cx('overlay')} onClick={() => dispatch(closeModalLogin())}></Button>
         <div className={cx('container')}>
            <LoginComp />
         </div>
      </div>
   )
}

export default ModalLogin
