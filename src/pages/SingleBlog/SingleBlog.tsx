import classNames from 'classnames/bind'
import styles from './SingleBlog.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/components/Button'
import config from '~/config/config'
import Image from '~/components/Image/Image'
import { FaceBookIcon, GitHubIcon, GmailIcon } from '~/components/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '~/store/store'
import { useEffect } from 'react'
import { getBlog } from '~/features/blogs/blogService'
import { useParams } from 'react-router-dom'
import Loading from '~/components/Loading/Loading'
import { BsArrowLeft } from 'react-icons/bs'
const cx = classNames.bind(styles)

function SingleBlog() {
   const dispatch = useDispatch<AppDispatch>()
   const { blog, isLoading } = useSelector((state: RootState) => state.blogs)
   const imgList = blog.images?.map((img) => img.url)
   const { blogId } = useParams()

   useEffect(() => {
      if (blogId) {
         dispatch(getBlog(blogId))
      }
   }, [dispatch, blogId])

   console.log(blog)

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
                           <Image className={cx('img')} src={imgList ? imgList[0] : ''} />
                        </div>
                        <p
                           className={cx('description')}
                           dangerouslySetInnerHTML={{ __html: blog.description as string }}
                        ></p>
                        <p className={cx('date')}> {new Date(blog.createdAt).toLocaleDateString()}</p>
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
                     <div className={cx('wrap-icon')} style={{ color: '#fff' }}>
                        <Button
                           text
                           style={{ color: '#fff' }}
                           className="col-4"
                           to="https://github.com/jangcui?tab=repositories"
                        >
                           <GitHubIcon />
                        </Button>
                        <Button text className="col-4" to="https://www.facebook.com/profile.php?id=100004998315019">
                           <FaceBookIcon />
                        </Button>
                        <Button text className="col-4" to="https://mail.google.com/mail/u/0/?tab=km#inbox">
                           <GmailIcon />
                        </Button>
                     </div>
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
