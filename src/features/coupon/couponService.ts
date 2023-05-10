import { createAsyncThunk } from '@reduxjs/toolkit'
import { CouponType } from '~/types/couponStage'
import * as httpRequest from '~/untils/httpRequest'

export const getCoupon = createAsyncThunk('coupon/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`coupon/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
export const getCoupons = createAsyncThunk('coupon/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('coupon', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
export const createCoupon = createAsyncThunk('coupon/create', async (data: CouponType, thunkAPI) => {
   try {
      const response = await httpRequest.post('coupon', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})

export const updateACoupon = createAsyncThunk(
   'coupon/update',
   async ({ id, body }: { id: string; body: CouponType }, thunkAPI) => {
      try {
         const response = await httpRequest.put(`coupon/${id}`, body, {
            signal: thunkAPI.signal,
         })
         return response
      } catch (error: any) {
         if (error.name === 'AxiosError' && error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data)
         }
         throw error
      }
   },
)

export const deleteCoupon = createAsyncThunk('coupon/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`coupon/${id}`)
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
