import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { OrderStageType } from '~/types/orderStage'
import { getAOrder, getAllOrders } from './orderService'

const initialState: OrderStageType = {
   orderList: [],
   order: {},
   orderCreate: {},
   orderUpdate: {},
   orderDelete: {},
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const resetOrderState = createAction('Reset_Order_State')
export const ordersSlice = createSlice({
   name: 'orders',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
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
         .addCase(resetOrderState, () => initialState)
   },
})

export default ordersSlice.reducer
