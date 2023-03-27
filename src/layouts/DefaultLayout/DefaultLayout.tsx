import { ReactNode, ReactFragment } from 'react'
import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
const cx = classNames.bind(styles)

import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import Sidebar from '../components/Sidebar/Sidebar'

function DefaultLayout({ children }: { children: ReactNode | ReactFragment }) {
   return (
      <div className={cx('wrapper')}>
         <Header />
         <div className={cx('container')}>{children}</div>
         <Footer />
      </div>
   )
}

export default DefaultLayout
