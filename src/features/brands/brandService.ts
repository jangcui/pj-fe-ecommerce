import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'
import * as adminRequest from '~/untils/adminRequest'

import { ItemType } from '~/types/itemStage'

export const getBrand = createAsyncThunk('brand/get', async (id: string, thunkAPI) => {
   try {
      const response = await adminRequest.get(`brand/${id}`, {
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
export const createBrand = createAsyncThunk('brand/create', async (data: ItemType, thunkAPI) => {
   try {
      const response = await adminRequest.post('brand', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const updateABrand = createAsyncThunk('brand/update', async (body: ItemType, thunkAPI) => {
   try {
      const response = await adminRequest.put(`brand/${body.id}`, body, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const deleteBrand = createAsyncThunk('brand/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await adminRequest.Delete(`brand/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
