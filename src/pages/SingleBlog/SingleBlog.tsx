import classNames from 'classnames/bind'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

import { AppDispatch, RootState } from '~/redux/store/store'
import Button from '~/components/Button'
import config from '~/routes/config'
import Image from '~/components/Image'
import Loading from '~/components/Loading/Loading'
import styles from './SingleBlog.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import { getBlog } from '~/redux/features/blogs/blogService'

const cx = classNames.bind(styles)

function SingleBlog() {
   const dispatch = useDispatch<AppDispatch>()
   const { blog, isLoading } = useSelector((state: RootState) => state.blogs)
   const { blogId } = useParams()

   useEffect(() => {
      if (blogId) {
         dispatch(getBlog(blogId))
      }
   }, [dispatch, blogId])

   return (
      <>
         <ChangeTitle title={`${blog.title}`} />
         <BreadCrumb title={`${blog.title}`} />
         <div className={cx('wrapper')}>
            <div className={cx('container')}>
               <div className={cx('content')}>
                  {isLoading ? (
                     <div className={cx('loading')}>
                        <Loading />
                     </div>
                  ) : (
                     <>
                        <h3 className={cx('title')}>{blog.title}</h3>
                        <div className={cx('wrap-img')}>
                           <Image className={cx('img')} src={blog?.images ? blog?.images : ''} />
                        </div>
                        <p
                           className={cx('description')}
                           dangerouslySetInnerHTML={{ __html: blog?.description as string }}
                        ></p>
                        <div className="d-flex justify-content-between align-items-center">
                           <p className={cx('date')}> {new Date(blog?.updatedAt).toLocaleDateString()}</p>
                           <span className="fs-4 text-secondary">Views: {blog?.numViews}</span>
                        </div>
                     </>
                  )}

                  <div className={cx('navigation')}>
                     <Button
                        className={cx('btn')}
                        to={config.routes.blogs}
                        text
                        leftIcon={<BsArrowLeft className={cx('icon')} />}
                     >
                        Back to blogs
                     </Button>
                  </div>

                  <div className={cx('form-comment')}>
                     <h3 className={cx('title')}>Leave A Comment </h3>
                     <span className={cx('wrap-input')}>
                        <input type="text" placeholder="Name*" />
                        <input type="text" placeholder="Email*" />
                        <textarea placeholder="Comments*" />
                     </span>
                     <Button className={cx('btn')} primary>
                        Post Comments
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default SingleBlog
