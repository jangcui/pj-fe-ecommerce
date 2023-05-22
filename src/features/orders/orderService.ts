import { createAsyncThunk } from '@reduxjs/toolkit'
import { OrderType } from '~/types/orderStage'
import * as httpRequest from '~/untils/httpRequest'

export const getAOrder = createAsyncThunk('enquiry/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`user/order-user/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getAllOrders = createAsyncThunk('orders', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('user/all-orders', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const createOrder = createAsyncThunk('enquiry/create', async (data: OrderType, thunkAPI) => {
   try {
      const response = await httpRequest.post('enquiry', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const updateStatusOrder = createAsyncThunk(
   'enquiry/update',
   async ({ id, status }: { id: string; status: string }, thunkAPI) => {
      try {
         const response = await httpRequest.put(
            `enquiry/${id}`,
            { status },
            {
               signal: thunkAPI.signal,
            },
         )
         return response
      } catch (error: any) {
         if (error.name === 'AxiosError' && error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data)
         }
         throw error
      }
   },
)

export const deleteOrder = createAsyncThunk('enquiry/delete', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`enquiry/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
