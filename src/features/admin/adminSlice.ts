import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserStageType } from '~/types/userStage'
import { deleteAUser, getUsers, loginAdmin, toggleBlockAUser, toggleCustomerToTrashBin } from './adminService'
import { toast } from 'react-toastify'

const getAdminFromLocalStorage: string | null = localStorage.getItem('ADMIN')
const admin = getAdminFromLocalStorage ? JSON.parse(getAdminFromLocalStorage) : null

const initialState: UserStageType = {
   userList: [],
   admin: admin,
   userUpdate: {},
   isAdmin: false,
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const adminSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(loginAdmin.pending, (state) => {
            state.isLoading = true
         })
         .addCase(loginAdmin.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload
            state.isAdmin = true
            state.message = 'Login successful'
            if (state.isSuccess === true) {
               localStorage.setItem('ADMIN', JSON.stringify(action.payload))
               localStorage.setItem('TOKEN', JSON.stringify(action.payload.token))
               toast.success(state.message)
            }
         })
         .addCase(loginAdmin.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'you are not admin'
            if (state.isSuccess === false) {
               toast.error(action.payload.message)
            }
         })
         .addCase(getUsers.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.userList = action.payload
         })
         .addCase(getUsers.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'some thing went wrong'
         })
         .addCase(toggleCustomerToTrashBin.pending, (state) => {
            state.isLoading = true
         })
         .addCase(toggleCustomerToTrashBin.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
         })
         .addCase(toggleCustomerToTrashBin.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'some thing went wrong'
         })
         .addCase(deleteAUser.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteAUser.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'Deleted'
         })
         .addCase(deleteAUser.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'some thing went wrong'
         })
         .addCase(toggleBlockAUser.pending, (state) => {
            state.isLoading = true
         })
         .addCase(toggleBlockAUser.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.message
         })
         .addCase(toggleBlockAUser.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'Some thing went wrong'
         })
   },
})

export default adminSlice.reducer