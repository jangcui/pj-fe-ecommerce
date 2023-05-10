import { createAction, createSlice } from '@reduxjs/toolkit'
import { CouponStageType } from '~/types/couponStage'
import { createCoupon, deleteCoupon, getCoupon, getCoupons, updateACoupon } from './couponService'

const initialState: CouponStageType = {
   coupons: [],
   coupon: {},
   couponCreate: {},
   couponDelete: {},
   couponUpdate: {},
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const resetCouponState = createAction('Reset_Coupon_State')
export const couponSlice = createSlice({
   name: 'coupon',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getCoupons.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCoupons.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.coupons = action.payload
         })
         .addCase(getCoupons.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(createCoupon.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createCoupon.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.couponCreate = action.payload
         })
         .addCase(createCoupon.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(getCoupon.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCoupon.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.coupon = action.payload
         })
         .addCase(getCoupon.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(updateACoupon.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateACoupon.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.couponUpdate = action.payload
         })
         .addCase(updateACoupon.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteCoupon.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteCoupon.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.couponDelete = action.payload
         })
         .addCase(deleteCoupon.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(resetCouponState, () => initialState)
   },
})

export default couponSlice.reducer
