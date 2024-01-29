import type { Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { LegacyButtonType } from 'antd/lib/button/button'

import { ModalProps } from 'antd/lib/modal'
import { RootState } from '~/redux/store'

interface MyModalProps extends Omit<ModalProps, 'visible'> {
   isOpen: boolean
   title: string
   type?: LegacyButtonType
   performAction?: () => void
   onCancel?: () => void
   onConfirm?: () => void
}

interface ModalState {
   loginModal: {
      isOpen: boolean
   }
   confirmModal: MyModalProps
}

const initialState: ModalState = {
   loginModal: {
      isOpen: false,
   },
   confirmModal: {
      isOpen: false,
      title: '',
      type: 'primary',
   },
}

const modalSlice = createSlice({
   name: 'modal',
   initialState,
   reducers: {
      openModalLogin: (state) => {
         state.loginModal.isOpen = true
      },
      closeModalLogin: (state) => {
         state.loginModal.isOpen = false
      },
      openModalConfirm: (
         state,
         action: PayloadAction<{ title: string; onConfirm?: () => void; type?: LegacyButtonType }>,
      ) => {
         state.confirmModal.isOpen = true
         state.confirmModal.title = action.payload.title
         state.confirmModal.type = action.payload.type
         state.confirmModal.onConfirm = action.payload.onConfirm
      },
      closeModalConfirm: (state) => {
         state.confirmModal.isOpen = false
         state.confirmModal.title = ''
         state.confirmModal.onConfirm = undefined
      },
   },
})

export const { openModalLogin, closeModalLogin, openModalConfirm, closeModalConfirm } = modalSlice.actions
export const selectModal = (state: RootState) => state.modals

export const confirmAction = () => (dispatch: Dispatch, getState: () => RootState) => {
   const { onConfirm } = getState().modals.confirmModal
   if (onConfirm) {
      onConfirm()
   }
   dispatch(closeModalConfirm())
}

export default modalSlice.reducer
