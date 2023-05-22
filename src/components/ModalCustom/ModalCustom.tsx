import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React from 'react'

interface MyModalProps extends Omit<ModalProps, 'visible'> {
   open: boolean
   title?: React.ReactNode
   performAction?: () => void
}

function ModalCustom(props: MyModalProps) {
   const { open, onOk, onCancel, title } = props
   return (
      <Modal title="Are U Sure?" open={open} onOk={onOk} onCancel={onCancel} okText="Confirm" cancelText="Cancel">
         <p> {title}</p>
      </Modal>
   )
}

export default ModalCustom
