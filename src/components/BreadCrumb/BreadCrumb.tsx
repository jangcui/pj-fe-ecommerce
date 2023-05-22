import classNames from 'classnames/bind'
import styles from './BreadCrumb.module.scss'
import { Link } from 'react-router-dom'
const cx = classNames.bind(styles)

function BreadCrumb({ title }: { title?: string }) {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <Link to="/">
               <p>Home </p>
            </Link>
            / <p>{title}</p>
         </div>
      </div>
   )
}

export default BreadCrumb
