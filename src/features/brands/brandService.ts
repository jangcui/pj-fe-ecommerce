import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'
import { StuffType } from '~/types/stuffStage'

export const getBrand = createAsyncThunk('brand/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`brand/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getBrands = createAsyncThunk('brand/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('brand', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const createBrand = createAsyncThunk('brand/create', async (data: StuffType, thunkAPI) => {
   try {
      const response = await httpRequest.post('brand', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const updateABrand = createAsyncThunk('brand/update', async (body: StuffType, thunkAPI) => {
   try {
      const response = await httpRequest.put(`brand/${body.id}`, body, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const deleteBrand = createAsyncThunk('brand/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`brand/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
