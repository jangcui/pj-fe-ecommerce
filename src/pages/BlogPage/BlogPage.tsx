import classNames from 'classnames/bind'
import styles from './BlogPage.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import BlogComp from '~/components/BlogComp'
const cx = classNames.bind(styles)

function BlogPage() {
   return (
      <>
         <ChangeTitle title={'Blogs'} />
         <BreadCrumb title={'Blogs'} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
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
                  <span className={cx('item')}>
                     {' '}
                     <BlogComp />
                  </span>
                  <span className={cx('item')}>
                     {' '}
                     <BlogComp />
                  </span>
                  <span className={cx('item')}>
                     {' '}
                     <BlogComp />
                  </span>
                  <span className={cx('item')}>
                     {' '}
                     <BlogComp />
                  </span>
                  <span className={cx('item')}>
                     {' '}
                     <BlogComp />
                  </span>
                  <span className={cx('item')}>
                     {' '}
                     <BlogComp />
                  </span>
               </div>
            </div>
         </div>
      </>
   )
}

export default BlogPage
