import { createSlice } from '@reduxjs/toolkit'
import { checkOut, createOrder, getMyOrder, paymentVerify } from './orderService'
import type { PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

interface OrderType {
   total_price_after_discount: number
   date: string
   status: string
   productList: [{ title: string; slug: string; colorId: string; quantity: number }]
}

interface InitialState {
   orderList: OrderType[]
   totalPrice: number
   isError: boolean
   date: string
   isLoading: boolean
   isSuccess: boolean
}

const initialState: InitialState = {
   orderList: [],
   totalPrice: 0,
   date: '',
   isError: false,
   isLoading: false,
   isSuccess: false,
}

export const authSlice = createSlice({
   name: 'order',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(createOrder.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createOrder.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Order succeed.')
         })
         .addCase(createOrder.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Some thing went wrong!')
         })
         .addCase(getMyOrder.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getMyOrder.fulfilled, (state, action: PayloadAction<any>) => {
            if (action.payload) {
               state.isError = false
               state.isLoading = false
               state.isSuccess = true
               const result = action?.payload?.map((data: any) => {
                  const filterData = {
                     total_price_after_discount: data?.total_price_after_discount,
                     date: data?.paid_at,
                     status: data?.order_status,
                     productList: data?.orderItems?.map((item: any) => {
                        const fItem = {
                           title: item?.productId?.title,
                           colorId: item?.colorId?.title,
                           quantity: item?.quantity,
                           slug: item?.productId?.slug,
                        }
                        return fItem
                     }),
                  }

                  return filterData
               })
               state.orderList = [...result]
            }
         })
         .addCase(getMyOrder.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })
         .addCase(paymentVerify.pending, (state) => {
            state.isLoading = true
         })
         .addCase(paymentVerify.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
         })
         .addCase(paymentVerify.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })
         .addCase(checkOut.pending, (state) => {
            state.isLoading = true
         })
         .addCase(checkOut.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
         })
         .addCase(checkOut.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })
   },
})

export default authSlice.reducer
