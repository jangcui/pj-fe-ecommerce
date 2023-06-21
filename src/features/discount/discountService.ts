import { createAsyncThunk } from '@reduxjs/toolkit'
import { DiscountType } from '~/types/couponStage'
import * as adminRequest from '~/untils/adminRequest'

export const getDiscount = createAsyncThunk('discount/get', async (id: string, thunkAPI) => {
   try {
      const response = await adminRequest.get(`discount/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getDiscounts = createAsyncThunk('discount/get-all', async (__, thunkAPI) => {
   try {
      const response = await adminRequest.get('discount', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const createDiscount = createAsyncThunk('discount/create', async (data: DiscountType, thunkAPI) => {
   try {
      const response = await adminRequest.post('discount', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const updateADiscount = createAsyncThunk(
   'discount/update',
   async ({ id, body }: { id: string; body: DiscountType }, thunkAPI) => {
      try {
         const response = await adminRequest.put(`discount/${id}`, body, {
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

export const deleteDiscount = createAsyncThunk('discount/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await adminRequest.Delete(`discount/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
