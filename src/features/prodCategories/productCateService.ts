import { createAsyncThunk } from '@reduxjs/toolkit'
import { ItemType } from '~/types/itemStage'
import * as httpRequest from '~/untils/httpRequest'
import * as adminRequest from '~/untils/adminRequest'

export const getProdCates = createAsyncThunk('productCategory/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('prod-category', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const updateAProdCate = createAsyncThunk('productCategory/update', async (body: ItemType, thunkAPI) => {
   try {
      const response = await adminRequest.put(`prod-category/${body.id}`, body, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const deleteProdCate = createAsyncThunk('productCategory/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await adminRequest.Delete(`prod-category/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getProdCate = createAsyncThunk('productCategory/get', async (id: string, thunkAPI) => {
   try {
      const response = await adminRequest.get(`prod-category/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const createProdCate = createAsyncThunk('productCategory/create', async (data: ItemType, thunkAPI) => {
   try {
      const response = await adminRequest.post('prod-category', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
