import classNames from 'classnames/bind'
import styles from './Banner.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import Image from '~/components/Image/Image'
import { useEffect, useState } from 'react'
import 'swiper/css/bundle'

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
      image: 'https://xgear.net/wp-content/uploads/2022/12/vivo-a1503-3.png',
      caption: 'Slide 1',
   },
   {
      id: 2,
      image: 'https://xgear.net/wp-content/uploads/2022/12/028vn-ava.png',
      caption: 'Slide 2',
   },
   {
      id: 3,
      image: 'https://xgear.net/wp-content/uploads/2023/03/msi-modern-15-2023.jpg',
      caption: 'Slide 2',
   },
   {
      id: 4,
      image: 'https://xgear.net/wp-content/uploads/2023/02/VivoBook-Pro-14X-M1403QA-LY024W-1-e1677730365272.jpg',
      caption: 'Slide 2',
   },
]
function Banner() {
   return (
      <div className={cx('wrapper')}>
         <div className={cx('slider')}>
            <Swiper
               modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
               autoplay={{ delay: 2000, pauseOnMouseEnter: true, disableOnInteraction: false }}
               loop
               slidesPerView={1}
               navigation
               pagination={{ clickable: true }}
               scrollbar={{ draggable: true }}
            >
               {slides.map((slider, index) => (
                  <SwiperSlide key={index}>
                     <div className={cx('wrap-img')}>
                        <Image className={cx('img')} src={slider.image} alt="sdsd" />
                     </div>
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
         <div className={cx('categories')}>
            <Image
               className={cx('img')}
               src="https://xgear.net/wp-content/uploads/2023/02/VivoBook-Pro-14X-M1403QA-LY024W-1-e1677730365272.jpg"
            />
            <Image className={cx('img')} src="https://xgear.net/wp-content/uploads/2022/12/093w-ava.png" />
            <Image className={cx('img')} src="https://xgear.net/wp-content/uploads/2023/03/msi-modern-15-2023.jpg" />
            <Image className={cx('img')} src="https://xgear.net/wp-content/uploads/2023/01/g5-me-ava.png" />
         </div>
      </div>
   )
}

export default Banner
