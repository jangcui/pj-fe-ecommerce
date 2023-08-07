import classNames from 'classnames/bind'
import Marquee from 'react-fast-marquee'
import styles from './Home.module.scss'
import { HiGift } from 'react-icons/hi'
import { FaShippingFast } from 'react-icons/fa'
import { ImHeadphones } from 'react-icons/im'
import { TbDiscountCheckFilled } from 'react-icons/tb'
import { BsFillCreditCard2BackFill } from 'react-icons/bs'
// import 'swiper/css/pagination'
// import 'swiper/css'

import Category from './Category'
import Banner from './Banner/Banner'
import ChangeTitle from '~/components/ChangeTitle'
import PopularProduct from './PopularProduct'
import OnSale from './BestSeller/OnSale'
import BlogSlider from './BlogSlider/BlogSlider'
import * as imagesHotDeal from '~/assets/imagesHotDeal'
import HotDeal from './HotDeal/HotDeal'

const cx = classNames.bind(styles)

const serviceArr = [
   {
      id: 1,
      icon: <FaShippingFast className={cx('service-icon')} />,
      title: 'Free Shipping',
      subTitle: 'From all orders over $100',
   },
   {
      id: 2,
      icon: <HiGift className={cx('service-icon')} />,
      title: 'Daily Surprise Offers',
      subTitle: 'Save up to 25% off',
   },
   {
      id: 3,
      icon: <ImHeadphones className={cx('service-icon')} />,
      title: 'Support 24/7',
      subTitle: 'Shop with an expert',
   },
   {
      id: 4,
      icon: <TbDiscountCheckFilled className={cx('service-icon')} />,
      title: 'Affordable Prices',
      subTitle: 'Get Factory direct price',
   },
   {
      id: 5,
      icon: <BsFillCreditCard2BackFill className={cx('service-icon')} />,
      title: 'Secure Payments',
      subTitle: '100% Protected Payments',
   },
]

function Home() {
   return (
      <div className={cx('wrapper')}>
         <ChangeTitle title={'E-commerce'} />
         <section className={cx('popular', 'mb-1')}>
            <Banner />
         </section>
         <section className={cx('service-block')}>
            <Marquee gradientWidth={10} gradientColor={[255, 255, 255]} speed={10}>
               {serviceArr?.map((item, index) => (
                  <div className={cx('service-content')} key={index}>
                     {item?.icon}
                     <div className={cx('service-title')}>
                        <p className="fs-3 fw-bolder">{item?.title}</p>
                        <p className="fs-4  mb-0">{item?.subTitle}</p>
                     </div>
                  </div>
               ))}
            </Marquee>
         </section>

         <section className={cx('popular')}>
            <h1 className="mb-4 text-start text-capitalize fs-1 fw-bold">flash Sales</h1>
            <OnSale />
         </section>

         <section className={cx('popular')}>
            <HotDeal percent1={75} percent2={30} linkImg1={imagesHotDeal.imgHd3} linkImg2={imagesHotDeal.imgHd4} />
         </section>
         <section className={cx('popular', 'mb-1')}>
            <h1 className="mb-4 text-start text-capitalize fs-1 fw-bold"> Popular Categories</h1>
            <Category />
         </section>
         <div className={cx('popular')}>
            <h1 className="mb-4 text-start text-capitalize fs-1 fw-bold">products by tags</h1>
            <PopularProduct />
         </div>
         <section className={cx('popular')}>
            <HotDeal percent1={50} percent2={29} linkImg1={imagesHotDeal.imgHd1} linkImg2={imagesHotDeal.imgHd2} />
         </section>
         <section className={cx('popular')}>
            <h1 className="mb-4 text-start text-capitalize fs-1 fw-bold">Recent Blogs</h1>
            <BlogSlider />
         </section>
      </div>
   )
}

export default Home
