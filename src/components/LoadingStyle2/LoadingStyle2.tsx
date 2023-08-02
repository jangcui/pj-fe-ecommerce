import classNames from 'classnames/bind'
import styles from './LoadingStyle2.module.scss'

const cx = classNames.bind(styles)

function LoadingStyle2() {
   return (
      <>
         <div className={cx('loading')}>
            <div className={cx('loader-1')} />
         </div>
      </>
   )
}

export default LoadingStyle2
