import { ReactNode, ReactFragment, useState, useEffect } from 'react'
import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
import { BiArrowToTop } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '~/components/Button'
import Container from '../components/Container'
import { AppDispatch, RootState } from '~/store/store'
import { getProducts } from '~/features/products/productsService'
import { getBlogs } from '~/features/blogs/blogService'

const cx = classNames.bind(styles)

function DefaultLayout({ children }: { children: ReactNode | ReactFragment }) {
   const dispatch = useDispatch<AppDispatch>()
   const [isScrolled, setIsScrolled] = useState(false)
   const isLoadingProduct = useSelector((state: RootState) => state.products.isLoading)
   const isLoadingBlog = useSelector((state: RootState) => state.blogs.isLoading)

   useEffect(() => {
      dispatch(getProducts({}))
      dispatch(getBlogs())
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
            {/* {isLoadingProduct && isLoadingBlog ? (
               <>
                  <div className={cx('loading')}>
                     <div className={cx('loader-1')} />
                     <div className={cx('loader-1')} />
                     <div className={cx('loader-1')} />
                  </div>
               </>
            ) : (
              
            )} */}
         </div>
      </div>
   )
}

export default DefaultLayout
