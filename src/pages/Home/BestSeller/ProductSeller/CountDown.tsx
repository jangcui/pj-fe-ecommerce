import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './ProductSeller.module.scss'
const cx = classNames.bind(styles)
interface CountdownTimerProps {
   deadline: Date
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline }) => {
   const [countdown, setCountdown] = useState(calculateCountdown(deadline))
   useEffect(() => {
      const timer = setInterval(() => {
         setCountdown(calculateCountdown(deadline))
      }, 1000)

      return () => clearInterval(timer)
   }, [deadline])

   function calculateCountdown(date: Date) {
      const now = new Date().getTime()
      const diff = date.getTime() - now
      const seconds = Math.floor(diff / 1000)
      return seconds > 0 ? seconds : 0
   }

   function formatCountdown(countdown: number) {
      const days = Math.floor(countdown / (3600 * 24))
      const hours = Math.floor((countdown % (3600 * 24)) / 3600)
      const minutes = Math.floor((countdown % 3600) / 60)
      const seconds = countdown % 60

      return {
         days: days.toString().padStart(2, '0'),
         hours: hours.toString().padStart(2, '0'),
         minutes: minutes.toString().padStart(2, '0'),
         seconds: seconds.toString().padStart(2, '0'),
      }
   }

   const { days, hours, minutes, seconds } = formatCountdown(countdown)

   return (
      <div className={cx('date')}>
         <i className="fw-bolder me-2">{days}</i> Days <span className={cx('time')}>{hours}</span> :{' '}
         <span className={cx('time')}>{minutes}</span> : <span className={cx('time')}> {seconds}</span>
      </div>
   )
}

export default CountdownTimer
