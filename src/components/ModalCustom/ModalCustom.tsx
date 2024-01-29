import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalConfirm, confirmAction } from '~/redux/features/modals/modalSlice'
import { AppDispatch, RootState } from '~/redux/store'

function ModalCustom() {
   const dispatch = useDispatch<AppDispatch>()
   const { isOpen, title = 'Confirm?', type } = useSelector((state: RootState) => state.modals.confirmModal)

   const handleConfirm = () => {
      dispatch(confirmAction())
   }

   const handleCancel = () => {
      dispatch(closeModalConfirm())
   }

   return (
      <Modal onOk={handleConfirm} open={isOpen} onCancel={handleCancel} okText="Yes" cancelText="No" okType={type}>
         <h3>{title}</h3>
      </Modal>
   )
}

export default ModalCustom
