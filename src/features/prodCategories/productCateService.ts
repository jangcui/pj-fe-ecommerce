import { createAsyncThunk } from '@reduxjs/toolkit'
import { StuffType } from '~/types/stuffStage'
import * as httpRequest from '~/untils/httpRequest'

export const getProdCates = createAsyncThunk('productCategory/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('prod-category', {
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
export const updateAProdCate = createAsyncThunk('productCategory/update', async (body: StuffType, thunkAPI) => {
   try {
      const response = await httpRequest.put(`prod-category/${body.id}`, body, {
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

export const deleteProdCate = createAsyncThunk('productCategory/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`prod-category/${id}`)
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
export const getProdCate = createAsyncThunk('productCategory/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`prod-category/${id}`, {
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
export const createProdCate = createAsyncThunk('productCategory/create', async (data: StuffType, thunkAPI) => {
   try {
      const response = await httpRequest.post('prod-category', data, {
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
