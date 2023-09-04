import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'

export type PaymentInfo = {
   razor_pay_order_id: ''
   razor_pay_payment_id: ''
}
export interface OrderType {
   productId: string
   color: string
   quantity: number
   price: number
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
      const response = await httpRequest.post(`user/cart/order`, data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const getMyOrder = createAsyncThunk('user/order/get', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get(`user/order`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const paymentVerify = createAsyncThunk('user/order/payment-verify', async (data: PaymentInfo, thunkAPI) => {
   try {
      const response = await httpRequest.post('user/order/payment-verify', data, {
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
         'user/order/checkout',
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
