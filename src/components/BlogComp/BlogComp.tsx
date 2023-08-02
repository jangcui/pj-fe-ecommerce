import classNames from 'classnames/bind'
import styles from './BlogComp.module.scss'
import Image from '~/components/Image/Image'
import Button from '~/components/Button'
import { BlogType } from '~/types/blogStage'
const cx = classNames.bind(styles)

function BlogComp({ data }: { data: BlogType }) {
   const imgList = data.images?.map((img) => img.url)
   return (
      <div className={cx('wrapper')}>
         <div className={cx('container')}>
            <div className={cx('category')}>{data.category}</div>
            <div className={cx('wrap-img')}>
               <Image className={cx('img')} src={imgList ? imgList[0] : ''} />
            </div>
            <div className={cx('content')}>
               <div className="d-flex justify-content-between align-items-center">
                  <span className={cx('date')}>{new Date(data.createdAt).toLocaleDateString()}</span>
                  <span className="fs-4 text-secondary">Views: {data.numViews}</span>
               </div>
               <h3 className={cx('title')}>{data.title}</h3>
               <p className={cx('description')} dangerouslySetInnerHTML={{ __html: data.description as string }}></p>
               <Button primary className={cx('btn', 'mt-4')} to={`/blog/${data._id}`}>
                  Read more
               </Button>
            </div>
         </div>
      </div>
   )
}

export default BlogComp
