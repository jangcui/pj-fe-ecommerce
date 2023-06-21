import { createAction, createSlice } from '@reduxjs/toolkit'
import { DiscountStageType } from '~/types/couponStage'
import { createDiscount, deleteDiscount, getDiscount, getDiscounts, updateADiscount } from './discountService'
import { toast } from 'react-toastify'

const initialState: DiscountStageType = {
   discounts: [],
   discount: {},
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const resetDiscountState = createAction('Reset_Discount_State')
export const couponSlice = createSlice({
   name: 'discount',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getDiscounts.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getDiscounts.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.discounts = action.payload
         })
         .addCase(getDiscounts.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Some thing went wrong!')
         })
         .addCase(createDiscount.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createDiscount.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.discount = action.payload
            toast.success('Create Discount Code Successfully!')
         })
         .addCase(createDiscount.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Some thing went wrong!')
         })
         .addCase(getDiscount.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getDiscount.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.discount = action.payload
         })
         .addCase(getDiscount.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Some thing went wrong!')
         })
         .addCase(updateADiscount.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateADiscount.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.discount = action.payload
         })
         .addCase(updateADiscount.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Some thing went wrong!')
         })
         .addCase(deleteDiscount.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteDiscount.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
         })
         .addCase(deleteDiscount.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Some thing went wrong!')
         })
         .addCase(resetDiscountState, () => initialState)
   },
})

export default couponSlice.reducer
