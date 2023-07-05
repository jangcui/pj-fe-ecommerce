import classNames from 'classnames/bind'
import styles from './HotDeal.module.scss'
import Image from '~/components/Image'
import Button from '~/components/Button/Button'
import config from '~/config/config'
const cx = classNames.bind(styles)

type HotDealProps = {
   linkImg1: string
   percent1: number
   linkImg2: string
   percent2: number
}

function HotDeal(props: HotDealProps) {
   const { linkImg1, percent1, percent2, linkImg2 } = props
   return (
      <div className={cx('wrapper', 'd-flex gap-4 justify-content-center')}>
         <div className={cx('img-block')}>
            <div className={cx('container')}>
               <h2 className={cx('title')}>Hot Deals</h2>
               <h4 className={cx('content')}>Up To -{percent1}% Off </h4>
               <Button text className={cx('btn')} to={config.routes.products}>
                  Shop Now
               </Button>
            </div>
            <Image className={cx('img')} src={linkImg1} />
         </div>
         <div className={cx('img-block')}>
            <div className={cx('container')}>
               <h2 className={cx('title')}>Hot Deals</h2>
               <h4 className={cx('content')}>Up To -{percent2}% Off </h4>
               <Button text className={cx('btn')} to={config.routes.products}>
                  Shop Now
               </Button>
            </div>
            <Image className={cx('img')} src={linkImg2} />
         </div>
      </div>
   )
}

export default HotDeal
