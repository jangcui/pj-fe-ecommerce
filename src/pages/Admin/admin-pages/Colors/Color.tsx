import classNames from 'classnames/bind'

import styles from './Colors.module.scss'
import InputCustom from '~/components/InputCustom/InputCustom'
import { useState, FormEvent } from 'react'

import Button from '~/layouts/components/Button/Button'
const cx = classNames.bind(styles)
function Color() {
   const [valueTitle, setValueTitle] = useState<string>('')

   const handleValueTitle = (newValue: string) => {
      setValueTitle(newValue)
      console.log(newValue)
   }

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
   }
   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}>Add Color</h1>
         <form className={cx('form')} action="" onSubmit={handleSubmit}>
            <InputCustom
               value={valueTitle}
               onChange={handleValueTitle}
               className={cx('input')}
               placeholder="Enter Blog Title"
            />
            <Button className={cx('form-btn')} primary>
               Add Color
            </Button>
         </form>
      </div>
   )
}

export default Color
