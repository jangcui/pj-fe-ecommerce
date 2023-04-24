import classNames from 'classnames/bind'

import styles from './InputCustom.module.scss'

const cx = classNames.bind(styles)

interface InputProps<T> {
   value: T
   onChange: (value: T) => void
   placeholder?: string
   className?: string
   type?: string
}

function InputCustom<T>(props: InputProps<T>) {
   const { value, onChange, placeholder, className, type } = props

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value as unknown as T)
   }

   return (
      <input
         type={type}
         value={value as unknown as string}
         onChange={handleChange}
         placeholder={placeholder}
         className={cx('input', className)}
      />
   )
}

export default InputCustom
