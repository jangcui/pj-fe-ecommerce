import { createAction, createSlice } from '@reduxjs/toolkit'
import { addToCart, addToWishList, getUserWishList, login, register } from './customerService'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserStageType } from '~/types/userStage'
import { toast } from 'react-toastify'

const getUserFromLocalStorage: string | null = localStorage.getItem('USER')
const user = getUserFromLocalStorage ? JSON.parse(getUserFromLocalStorage) : null

const initialState: UserStageType = {
   userList: [],
   user: user,
   wishlist: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}
export const resetCustomerState = createAction('Reset_Customer_State')

export const customerSlice = createSlice({
   name: 'customer',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state) => {
            state.isLoading = true
         })
         .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.message = 'Login successful'
            if (state.isSuccess === true) {
               localStorage.setItem('USER', JSON.stringify(action.payload))
               localStorage.setItem('TOKEN', JSON.stringify(action.payload.token))
               toast.success(state.message)
            }
         })
         .addCase(login.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            if (state.isSuccess === false) {
               toast.error(action.payload.message)
            }
         })
         .addCase(register.pending, (state) => {
            state.isLoading = true
         })
         .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.userCreate = action.payload
            state.message = 'Register successful'
            if (state.isSuccess === true) {
               toast.success(state.message)
            }
         })
         .addCase(register.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            if (state.isSuccess === false) {
               toast.error(action.payload.message)
            }
         })
         .addCase(addToWishList.fulfilled, (state) => {
            state.isError = false
            state.isSuccess = true
         })
         .addCase(addToWishList.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.message = action.error as string
         })
         .addCase(getUserWishList.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getUserWishList.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.wishlist = action.payload.wishlist
         })
         .addCase(getUserWishList.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(addToCart.pending, (state) => {
            state.isLoading = true
         })
         .addCase(addToCart.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Product added to cart')
            // state.wishlist = action.payload.wishlist
         })
         .addCase(addToCart.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
            toast.error('Something went wrong')
         })
   },
})

export default customerSlice.reducer
