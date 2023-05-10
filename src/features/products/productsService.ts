import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ParamsType } from '~/types/paramsStage'
import { ProductType } from '~/types/productStage'
import * as httpRequest from '~/untils/httpRequest'
export const resetState = createAction('Reset_State')
export const getAProduct = createAsyncThunk('product/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`product/${id}`, {
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
export const getProducts = createAsyncThunk('product/get-all', async (config: ParamsType, thunkAPI) => {
   try {
      const response = await httpRequest.get('product', {
         params: config,
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
export const createProduct = createAsyncThunk('product/create', async (data: ProductType, thunkAPI) => {
   try {
      const response = await httpRequest.post('product', data, {
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
export const updateAProduct = createAsyncThunk(
   'product/update',
   async ({ id, body }: { id: string; body: ProductType }, thunkAPI) => {
      try {
         const response = await httpRequest.put(`product/${id}`, body, {
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

export const deleteProduct = createAsyncThunk('product/delete', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`product/delete/${id}`)
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
