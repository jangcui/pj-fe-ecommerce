import classNames from 'classnames/bind'
import styles from './Some.module.scss'
const cx = classNames.bind(styles)
function Some() {
   return <div className={cx('wrapper')}>ttsome id product </div>
}

export default Some
