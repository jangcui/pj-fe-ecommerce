import classNames from 'classnames/bind'
import 'react-rte/lib/RichTextEditor.css'
import { useState, FormEvent } from 'react'
import RichTextEditor, { EditorValue } from 'react-rte'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'

import styles from './Products.module.scss'
import InputCustom from '~/components/InputCustom'
import Button from '~/layouts/components/Button'

const { Dragger } = Upload
const cx = classNames.bind(styles)

const props: UploadProps = {
   name: 'file',
   multiple: true,
   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
   onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
         console.log(info.file, info.fileList)
      }
      if (status === 'done') {
         message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
         message.error(`${info.file.name} file upload failed.`)
      }
   },
   onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
   },
}
function Product() {
   const [valueRte, setValueRte] = useState<EditorValue>(RichTextEditor.createEmptyValue())
   const [valueTitle, setValueTitle] = useState<string>('')
   const [valuePrice, setValuePrice] = useState<number>(0)

   const handleValueRte = (value: EditorValue): void => {
      setValueRte(value)
      console.log(value)
   }

   const handleValueTitle = (newValue: string) => {
      setValueTitle(newValue)
      console.log(newValue)
   }

   const handleValuePrice = (newValue: number) => {
      setValuePrice(newValue)
   }

   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
   }
   return (
      <div className={cx('wrapper')}>
         <h1 className={cx('title')}>Add Product</h1>
         <div className={cx('upload')}></div>
         <form className={cx('form')} action="" onSubmit={handleSubmit}>
            <InputCustom
               value={valueTitle}
               onChange={handleValueTitle}
               className={cx('input')}
               placeholder="Enter Blog Title"
            />
            <RichTextEditor className={cx('editor')} value={valueRte} onChange={handleValueRte} />
            <InputCustom
               value={valuePrice}
               onChange={handleValuePrice}
               className={cx('input')}
               placeholder="Enter Your Price"
            />
            <select name="" id="" className={cx('form-select')}>
               <option value="">Select Brand</option>
            </select>{' '}
            <select name="" id="" className={cx('form-select')}>
               <option value="">Select Category</option>
            </select>{' '}
            <select name="" id="" className={cx('form-select')}>
               <option value="">Select Color</option>
            </select>
            <div className={cx('upload')}>
               <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                     <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                     Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                     banned files.
                  </p>
               </Dragger>
            </div>
            <Button className={cx('form-btn')} primary>
               Add Product
            </Button>
         </form>
      </div>
   )
}

export default Product
