import classNames from 'classnames/bind'
import styles from './BlogComp.module.scss'
import Image from '~/components/Image/Image'
import Button from '~/layouts/components/Button'
import config from '~/config/config'
const cx = classNames.bind(styles)

function BlogComp() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <Image
               className={cx('img')}
               src={
                  'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/320574333_6130235670334020_7787054517103750991_n.jpg?stp=dst-jpg_s851x315&_nc_cat=108&ccb=1-7&_nc_sid=da31f3&_nc_ohc=m2TN78BvxvkAX_znUFK&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfCUtfuTCwFpmzVc158eEaVwtYVfp5fRtXpZrhk3lOKWQA&oe=642E9B3D'
               }
            />
            <div className={cx('content')}>
               <span className={cx('date')}>11 june 2023</span>
               <h3 className={cx('title')}>MY HA MY HA</h3>
               <p className={cx('description')}>
                  Quận 3 - Hồ Chí Minh] Công ty Product Sing - thị trường Global (self-service BI platform founded) cần
                  tìm Frontend và Fullstack Dev 👉Senior Front-end | Range 1700$-4000$ Từ 5 năm kinh nghiệm, 1 năm kinh
                  nghiệm với FE framework React JS, Vue JS, or Angular. Vài năm kinh nghiệm với D3.js 👉Senior Fullstack
                  | Range 1700$-4000$ Xem thêm
               </p>
               <Button primary className={cx('btn')} to={config.routes.blog}>
                  Read more
               </Button>
            </div>
         </div>
      </div>
   )
}

export default BlogComp
