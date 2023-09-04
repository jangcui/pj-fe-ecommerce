import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import BlogComp from '~/components/BlogComp'
import { AppDispatch, RootState } from '~/redux/store/store'
import styles from './BlogPage.module.scss'
import Button from '~/components/Button'
import { getAllBlogs } from '~/redux/features/blogs/blogService'

const cx = classNames.bind(styles)

function BlogPage() {
   const dispatch = useDispatch<AppDispatch>()
   const { blogList } = useSelector((state: RootState) => state.blogs)
   const [categories, setCategories] = useState<string[]>([])

   useEffect(() => {
      dispatch(getAllBlogs())
   }, [dispatch])

   useEffect(() => {
      const uniqueCategory = new Set<string>()
      blogList?.forEach((blog) => {
         uniqueCategory.add(blog.category || '')
      })
      setCategories(Array.from(uniqueCategory))
   }, [blogList])
   return (
      <>
         <ChangeTitle title={'Blog List'} />
         <BreadCrumb title={'Blog List'} />
         <div className={cx('wrapper', 'row w-100')}>
            <div className={cx('filter-list', 'col-2')}>
               <div className={cx('filter-block', 'd-none gap-5 d-lg-block col-12 col-lg')}>
                  <h1 className="fs-3 mb-0 mb-lg-3 ">Blog Categories</h1>
                  <div className={cx('option')}>
                     {categories?.map((item, index) => (
                        <p key={index}>
                           <Button text className="btn btn-light">
                              {item}
                           </Button>
                        </p>
                     ))}
                  </div>
               </div>
            </div>
            <div className={cx('blogs', 'col-12 col-lg-10 row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-5 mt-0')}>
               {blogList?.map((blog, index) => (
                  <div className={cx('item', 'col')} key={index}>
                     <BlogComp data={blog} />
                  </div>
               ))}
            </div>
         </div>
      </>
   )
}

export default BlogPage
