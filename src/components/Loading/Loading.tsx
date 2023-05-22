import classNames from 'classnames/bind'
import styles from './Loading.module.scss'

const cx = classNames.bind(styles)

function Loading() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('loader')}>
            <div className={cx('circle')} />
            <div className={cx('circle')} />
            <div className={cx('circle')} />
            <div className={cx('shadow')} />
            <div className={cx('shadow')} />
            <div className={cx('shadow')} />
         </div>
      </div>
   )
}

export default Loading
