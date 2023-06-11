import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { AdminStageType } from '~/types/userStage'
import {
   deleteAUser,
   deleteOrder,
   getAOrder,
   getAllOrders,
   getMonthlyOrders,
   getUsers,
   getYearlyOrders,
   loginAdmin,
   toggleBlockAUser,
   toggleCustomerToTrashBin,
   updateOrderStatus,
} from './adminService'
import { toast } from 'react-toastify'

const getAdminFromLocalStorage: string | null = localStorage.getItem('ADMIN')
const admin = getAdminFromLocalStorage ? JSON.parse(getAdminFromLocalStorage) : {}

const initialState: AdminStageType = {
   userList: [],
   admin: admin,
   orderList: [],
   monthlyIncome: [],
   yearlyIncome: [],
   isAdmin: admin ? true : false,
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}
export const logOutAdmin = createAction('admin_log_out')

export const adminSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(logOutAdmin, (state) => {
            localStorage.removeItem('ADMIN')
            localStorage.removeItem('ADMIN_TOKEN')
            state.admin = null
            state.isAdmin = false
         })
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
               localStorage.setItem('ADMIN_TOKEN', JSON.stringify(action.payload.token))
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
         .addCase(getAllOrders.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.orderList = action.payload
         })
         .addCase(getAllOrders.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(getAOrder.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAOrder.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.order = action.payload
         })
         .addCase(getAOrder.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(updateOrderStatus.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.order = action.payload
            toast.success('Order Status Updated')
         })
         .addCase(updateOrderStatus.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteOrder.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteOrder.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.info('Deleted')
         })
         .addCase(deleteOrder.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
            toast.info('Smt Went Wrong')
         })
         .addCase(getMonthlyOrders.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getMonthlyOrders.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.monthlyIncome = action.payload
         })
         .addCase(getMonthlyOrders.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(getYearlyOrders.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getYearlyOrders.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.yearlyIncome = action.payload
         })
         .addCase(getYearlyOrders.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
   },
})

export default adminSlice.reducer
