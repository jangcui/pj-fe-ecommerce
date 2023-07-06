import classNames from 'classnames/bind'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { Keyboard, Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import Button from '~/components/Button'
import styles from './SliderCustom.module.scss'
import 'swiper/swiper.min.css'

const cx = classNames.bind(styles)
type SliderCustomProps = {
   children: ReactNode
   numberElInView?: number
   isBullet?: boolean
}
type SwiperStyles = {
   [key: string]: string
}
function SliderCustom(props: SliderCustomProps) {
   const { children, numberElInView = 4, isBullet = false } = props

   const [isEnd, setIsEnd] = useState<boolean>(false)
   const [isBegin, setIsBegin] = useState<boolean>(true)

   const swiperRef = useRef<any>(null)

   const goPrev = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
         swiperRef.current.swiper.slidePrev()
      }
   }
   const goNext = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
         const swiperInstance = swiperRef.current.swiper
         swiperInstance.slideNext()
      }
   }
   useEffect(() => {
      if (swiperRef.current) {
         const swiperInstance = swiperRef.current.swiper
         swiperInstance.on('slideChange', () => {
            const isEnd = swiperInstance.isEnd
            const isBegin = swiperInstance.isBeginning
            if (isEnd) {
               setIsEnd(true)
            } else {
               setIsEnd(false)
            }
            if (isBegin) {
               setIsBegin(true)
            } else {
               setIsBegin(false)
            }
         })
      }
   }, [])
   const breakpoints = {
      576: {
         slidesPerView: numberElInView - 1 - 1,
      },
      768: {
         slidesPerView: numberElInView - 1,
      },
      1200: {
         slidesPerView: numberElInView,
      },
   }
   const styles: SwiperStyles = {
      '--swiper-pagination-color': '#131921',
      '--swiper-pagination-bullet-inactive-color': '#d6d6d6',
      '--swiper-pagination-bullet-inactive-opacity': '0.75',
      '--swiper-pagination-bullet-size': '12px',
      '--swiper-pagination-bullet-horizontal-gap': '10px',
   }
   return (
      <>
         <Swiper
            ref={swiperRef}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{
               enabled: true,
            }}
            pagination={{ enabled: isBullet, clickable: isBullet }}
            style={styles}
            navigation={true}
            modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            className={cx('container')}
            breakpoints={breakpoints}
         >
            <Button text className={cx('btn-prev', 'btn', isBegin && 'disable')} onClick={goPrev}>
               <GrPrevious className={cx('icon')} />
            </Button>
            <Button text className={cx('btn-next', 'btn', isEnd && 'disable')} onClick={goNext}>
               <GrNext className={cx('icon')} />
            </Button>
            {React.Children.map(children, (child, index) => (
               <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
         </Swiper>
      </>
   )
}

export default SliderCustom
