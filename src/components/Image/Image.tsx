import classNames from 'classnames'
import { useState, forwardRef, ImgHTMLAttributes } from 'react'
import images from '~/assets/images'
import styles from './Image.module.scss'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
   fallback?: string
}

const Image = forwardRef<HTMLImageElement, ImageProps>(function MyImage(
   { src, alt = 'image', className, fallback: customFallback = images.errorImage, ...props },
   ref,
) {
   const [fallback, setFallback] = useState<string | undefined>(undefined)
   const handleError = () => {
      setFallback(customFallback)
   }

   return (
      <img
         className={classNames(styles.wrapper, className)}
         ref={ref}
         src={fallback || src}
         alt={alt}
         {...props}
         onError={handleError}
      />
   )
})

export default Image
