import classNames from 'classnames/bind'
import styles from './Container.module.scss'
import { ReactNode } from 'react'
const cx = classNames.bind(styles)

function Container({ children }: { children: ReactNode }) {
   return <div className={cx('container')}>{children}</div>
}

export default Container
