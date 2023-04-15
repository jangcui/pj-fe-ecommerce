import { EyeIcon, EyeSlashIcon } from '~/components/Icon'
import classNames from 'classnames/bind'
import styles from './Login.module.scss'

const cx = classNames.bind(styles)
const FormPassword = ({ placeHolder }: { placeHolder: string }) => {
   return (
      <div className={cx('wrap-input')}>
         <input className={cx('input')} type="password" placeholder={placeHolder} />
         <EyeSlashIcon className={cx('icon')} />
         <EyeIcon className={cx('icon')} />
      </div>
   )
}

export default FormPassword
