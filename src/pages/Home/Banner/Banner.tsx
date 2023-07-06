import classNames from 'classnames/bind'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import 'swiper/css/bundle'

import styles from './Banner.module.scss'
import Image from '~/components/Image'
import Button from '~/components/Button'
import * as imgDefault from '~/assets/imagesDefault'

const cx = classNames.bind(styles)

declare module 'swiper/react' {
   export interface SwiperSlideProps {
      isActive?: boolean
      isPrev?: boolean
      isNext?: boolean
   }
}
const slides = [
   {
      id: 1,
      image: imgDefault.imgMain1,
      caption: 'Slide 1',
      text: 'Supercharged for pros.',
      title: 'Special Sell',
      description: {
         line1: 'From $999.00 or $41.62/mo.',
         line2: 'for 24 mo. Footnote*',
      },
   },
   {
      id: 2,
      image: imgDefault.imgMain2,
      caption: 'Slide 2',
      text: 'Supercharged for pros.',
      title: 'iPad S13+',
      description: {
         line1: 'From $999.00 or $41.62/mo.',
         line2: 'for 24 mo. Footnote*',
      },
   },
]
const banner = [
   {
      id: 1,
      image: imgDefault.imgDf1,
      text: 'special sell',
      title: 'laptops max',
      description: {
         line1: 'From $1669 or',
         line2: '$64.63/mo.',
      },
   },
   {
      id: 2,
      image: imgDefault.imgDf2,
      text: 'new arrival',
      title: 'buy iPad air',
      description: {
         line1: 'From $589 or',
         line2: '$49.94/mo.',
      },
   },
   {
      id: 3,
      image: imgDefault.imgDf3,
      text: '16% off',
      title: 'smartwatch 7',
      description: {
         line1: 'Shop the latest band',
         line2: 'styles and colors.',
      },
   },
   {
      id: 4,
      image: imgDefault.imgDf4,
      text: 'free engraving',
      title: 'airPods Max',
      description: {
         line1: 'High-fidelity',
         line2: 'playback $ ultra-low',
      },
   },
]
type SwiperStyles = {
   [key: string]: string
}
function Banner() {
   const styles: SwiperStyles = {
      '--swiper-pagination-color': '#131921',
      '--swiper-pagination-bullet-inactive-color': '#d6d6d6',
      '--swiper-pagination-bullet-inactive-opacity': '0.75',
      '--swiper-pagination-bullet-size': '16px',
      '--swiper-pagination-bullet-horizontal-gap': '6px',
   }
   return (
      <div className={cx('wrapper', 'row')}>
         <div className={cx('slider', 'col-12 col-md-8 col-xl-7 ')}>
            <Swiper
               modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
               autoplay={{ delay: 30000, pauseOnMouseEnter: true, disableOnInteraction: false }}
               loop
               slidesPerView={1}
               navigation
               pagination={{ clickable: true }}
               style={styles}
            >
               {slides.map((item, index) => (
                  <SwiperSlide key={index} style={{ borderRadius: '10px' }}>
                     <div className={cx('wrap-img')}>
                        <div className={cx('slide-show')}>
                           <p className={cx('slide-text')}>{item.text}</p>
                           <h2 className={cx('slide-title')}>{item.title}</h2>
                           <p className={cx('slide-desc')}>
                              {item?.description?.line1}
                              <br />
                              {item?.description?.line2}
                           </p>
                           <Button className={cx('slide-btn')} primary>
                              Buy Now
                           </Button>
                        </div>
                        <Image className={cx('img')} src={item.image} alt="sdsd" />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>

         <div className={cx('banner', 'col-12 col-md-4 col-xl-5 row row-cols-4 row-cols-lg-2 d-flex')}>
            {banner?.map((item, index) => (
               <div className={cx('element', 'col')} key={index}>
                  <div className={cx('banner-show')}>
                     <p className={cx('banner-text')}>{item?.text}</p>
                     <h2 className={cx('banner-title')}>{item?.title}</h2>
                     <p className={cx('banner-desc')}>
                        {item?.description.line1}
                        <br />
                        {item?.description.line2}
                     </p>
                  </div>
                  <Image className={cx('img-banner')} src={item?.image} />
               </div>
            ))}
         </div>
      </div>
   )
}

export default Banner
