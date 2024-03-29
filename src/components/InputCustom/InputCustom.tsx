import classNames from 'classnames/bind'

import styles from './InputCustom.module.scss'
import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineLoading3Quarters } from 'react-icons/ai'
import Button from '~/components/Button/Button'

const cx = classNames.bind(styles)

interface InputProps<T> {
   value?: T | number | string
   defaultValue?: T | number | string
   onChange: (value: T) => void
   onBlur?: (e: React.FocusEvent<any>) => void
   placeholder?: string
   className?: string
   name?: string
   type?: string
   min?: number
   pwdStyle?: boolean
   lazyLoad?: boolean
   disabled?: boolean
}

function InputCustom<T>(props: InputProps<T>) {
   const {
      value,
      defaultValue,
      onChange,
      placeholder,
      name,
      className,
      type,
      pwdStyle = false,
      min,
      lazyLoad = false,
      disabled = false,
      onBlur,
   } = props
   const [hidden, setHidden] = useState(false)
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value as unknown as T)
   }

   return (
      <>
         {!pwdStyle ? (
            <div className={cx('wrap-input')}>
               <input
                  type={type}
                  name={name}
                  value={value as unknown as string}
                  defaultValue={defaultValue as unknown as string}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={cx('input', className)}
                  onBlur={onBlur}
                  disabled={disabled}
                  min={min}
               />
               {lazyLoad && <AiOutlineLoading3Quarters className={cx('icon-loading')} />}
            </div>
         ) : (
            <div className={cx('wrap-input')}>
               <input
                  type={hidden ? 'text' : 'password'}
                  value={value as unknown as string}
                  defaultValue={defaultValue as unknown as string}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={cx('input', className)}
                  autoComplete="true"
               />
               <Button text className={cx('hidden')} onClick={() => setHidden(!hidden)} type={'button'}>
                  {!hidden ? <AiFillEye className={cx('icon')} /> : <AiFillEyeInvisible className={cx('icon')} />}
               </Button>
            </div>
         )}
      </>
   )
}

export default InputCustom
