import { ReactNode, ReactFragment } from 'react'
import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
const cx = classNames.bind(styles)

import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import Container from '../components/Container/Container'

function DefaultLayout({ children }: { children: ReactNode | ReactFragment }) {
   return (
      <div className={cx('wrapper')}>
         <Header />
         <Container>{children}</Container>
         <Footer />
      </div>
   )
}

export default DefaultLayout
