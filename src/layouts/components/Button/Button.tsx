import { FC, HTMLProps } from 'react'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
   to?: string
   href?: string
   disable?: boolean
   secondary?: boolean
   text?: boolean
   lazyLoad?: boolean
   primary?: boolean
   leftIcon?: JSX.Element
   rightIcon?: JSX.Element
}

const Button: FC<ButtonProps> = ({
   to,
   href,
   primary = false,
   disable = false,
   text = false,
   secondary = false,
   lazyLoad = false,
   children,
   onClick,
   leftIcon,
   rightIcon,
   className,
   ...passProps
}) => {
   let Comp: any = 'button'
   const props: any = {
      onClick,
      ...passProps,
   }
   if (to) {
      props.to = to
      Comp = Link
   } else if (href) {
      props.href = href
   }
   //remove event listener when btn is disabled
   if (disable || lazyLoad) {
      Object.keys(props).forEach((key) => {
         if (key.startsWith('on') && typeof props[key] === 'function') {
            delete props[key]
         }
      })
   }

   const classes = cx('wrapper', {
      primary,
      secondary,
      disable,
      lazyLoad,
      text,
      [className as string]: !!className,
   })

   return (
      <Comp className={classes} {...props}>
         {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
         <span className={cx('title')}>
            {lazyLoad ? <AiOutlineLoading3Quarters className={cx('icon-loading')} /> : children}
         </span>
         {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
      </Comp>
   )
}

export default Button
