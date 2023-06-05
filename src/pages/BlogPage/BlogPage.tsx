import classNames from 'classnames/bind'
import styles from './BlogPage.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import BlogComp from '~/components/BlogComp'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { getBlogs } from '~/features/blogs/blogService'
import { useEffect } from 'react'
import Button from '~/components/Button/Button'
const cx = classNames.bind(styles)

function BlogPage() {
   const dispatch = useDispatch<AppDispatch>()
   const { blogs, isLoading } = useSelector((state: RootState) => state.blogs)

   useEffect(() => {
      dispatch(getBlogs())
   }, [dispatch])

   return (
      <>
         <ChangeTitle title={'Blogs'} />
         <BreadCrumb title={'Blogs'} />
         <div className={cx('wrapper')}>
            <div className={cx('filter-list')}>
               <div className={cx('filter-block')}>
                  <h1 className={cx('title')}>Shop by categories</h1>
                  <div className={cx('option')}>
                     <span>watch</span>
                     <span>tv</span>
                     <span>camera</span>
                     <span>laptop</span>
                  </div>
               </div>
            </div>
            <div className={cx('blogs')}>
               {blogs?.map((blog, index) => (
                  <span className={cx('item')} key={index}>
                     <BlogComp data={blog} />
                  </span>
               ))}
            </div>
         </div>
      </>
   )
}

export default BlogPage
