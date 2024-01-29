import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/utils/httpRequest'

export type PaymentInfo = {
   razor_pay_order_id: ''
   razor_pay_payment_id: ''
}
export interface OrderType {
   productId: string
   colorId: string
   quantity: number
   total: number
}
export type OrderCreateType = {
   total_price: number
   total_price_after_discount: number
   shippingInfo: {
      first_name: string
      last_name: string
      address: string
      city: string
      state: string
      other: string
      country: string
      pin_code: string
   }
   orderItems: OrderType[]
   paymentInfo: PaymentInfo
}

export const createOrder = createAsyncThunk('user/order/create', async (data: OrderCreateType, thunkAPI) => {
   try {
      const response = await httpRequest.post(`/order`, data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const getMyOrder = createAsyncThunk('user/order/get', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get(`/order`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const paymentVerify = createAsyncThunk('user/payment-verify', async (data: PaymentInfo, thunkAPI) => {
   try {
      const response = await httpRequest.post('user/payment-verify', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const checkOut = createAsyncThunk('user/checkOut', async ({ amount }: { amount: number }, thunkAPI) => {
   try {
      const response = await httpRequest.post(
         'user/checkout',
         { amount },
         {
            signal: thunkAPI.signal,
         },
      )
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
