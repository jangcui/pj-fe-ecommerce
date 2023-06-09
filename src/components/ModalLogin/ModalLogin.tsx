import classNames from 'classnames/bind'
import styles from './ModalLogin.module.scss'
import { LoginComp } from '~/pages/Login'
import { AppDispatch, RootState } from '~/store/store'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai'
import Button from '../Button/Button'
import { closeModalLogin } from '~/features/modalLogin/modalLoginSlice'
const cx = classNames.bind(styles)

function ModalLogin() {
   const dispatch = useDispatch<AppDispatch>()
   const { isOpen } = useSelector((state: RootState) => state.modalLogin)

   return (
      <>
         <div className={cx('wrapper', isOpen ? 'open' : 'close', 'row')}>
            <div className={cx('overlay')}></div>
            <div className={cx('container')}>
               <Button text className={cx('btn-close')} onClick={() => dispatch(closeModalLogin())}>
                  <AiOutlineClose className={cx('icon')} />
               </Button>
               <LoginComp />
            </div>
         </div>
      </>
   )
}

export default ModalLogin
