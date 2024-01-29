import { ReactNode, useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import { BiArrowToTop } from 'react-icons/bi'
import { useDispatch } from 'react-redux'

import Footer from '../components/Footer'
import Button from '~/components/Button'
import Container from '../components/Container'
import { AppDispatch } from '~/redux/store/store'
import { getAllBlogs } from '~/redux/features/blogs/blogService'
import Header from '../components/Header'
import styles from './DefaultLayout.module.scss'
import { getAllProducts } from '~/redux/features/products/productsService'
import { checkIsLogin } from '~/redux/features/user/auth/authService'
import { getCart } from '~/redux/features/user/cart/cartService'

const cx = classNames.bind(styles)

function DefaultLayout({ children }: { children: ReactNode }) {
   const dispatch = useDispatch<AppDispatch>()
   const [isScrolled, setIsScrolled] = useState(false)

   useEffect(() => {
      dispatch(checkIsLogin())
      dispatch(getAllProducts({}))
      dispatch(getAllBlogs())
      dispatch(getCart())
   }, [dispatch])

   const handleButtonClick = () => {
      setIsScrolled(true)
      window.scrollTo({
         top: 0,
         behavior: 'smooth',
      })
   }
   const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 100)
   }

   useEffect(() => {
      window.addEventListener('scroll', handleScroll)
      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <Button text className={cx('btn', !isScrolled && 'isScroll')} onClick={handleButtonClick}>
               <BiArrowToTop className={cx('icon')} />
            </Button>
            <>
               <Header />
               <Container>{children}</Container>
               <Footer />
            </>
         </div>
      </div>
   )
}

export default DefaultLayout
