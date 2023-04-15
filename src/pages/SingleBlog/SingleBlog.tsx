import classNames from 'classnames/bind'
import styles from './SingleBlog.module.scss'
import BreadCrumb from '~/components/BreadCrumb'
import ChangeTitle from '~/components/ChangeTitle'
import Button from '~/layouts/components/Button'
import config from '~/config/config'
import Image from '~/components/Image/Image'
import { ArrowBackIcon, FaceBookIcon, GitHubIcon, GmailIcon } from '~/components/Icon'
const cx = classNames.bind(styles)

function SingleBlog() {
   return (
      <>
         <ChangeTitle title={'Dynamic Blog Name'} />
         <BreadCrumb title={'Dynamic Blog Name'} />
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
               <div className={cx('content')}>
                  <h3 className={cx('title')}>A Beautiful Sunday Morning Renaissance</h3>
                  <Image
                     className={cx('img')}
                     src={
                        'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/320574333_6130235670334020_7787054517103750991_n.jpg?stp=dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=m2TN78BvxvkAX_znUFK&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCUtfuTCwFpmzVc158eEaVwtYVfp5fRtXpZrhk3lOKWQA&oe=642E9B3D'
                     }
                  />
                  <p className={cx('description')}>
                     Quận 3 - Hồ Chí Minh] Công ty Product Sing - thị trường Global (self-service BI platform founded)
                     cần tìm Frontend và Fullstack Dev 👉Senior Front-end | Range 1700$-4000$ Từ 5 năm kinh nghiệm, 1
                     năm kinh nghiệm với FE framework React JS, Vue JS, or Angular. Vài năm kinh nghiệm với D3.js
                     👉Senior Fullstack | Range 1700$-4000$ Xem thêm{' '}
                  </p>
                  <p className={cx('date')}> 11 jun 2023</p>
                  <div className={cx('navigation')}>
                     <Button className={cx('btn')} to={config.routes.blogs} text leftIcon={<ArrowBackIcon />}>
                        Back to blogs
                     </Button>
                     <div className={cx('wrap-icon')}>
                        <FaceBookIcon />
                        <GitHubIcon />
                        <GmailIcon />
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
