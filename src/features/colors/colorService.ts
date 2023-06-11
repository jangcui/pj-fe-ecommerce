import { createAsyncThunk } from '@reduxjs/toolkit'
import { ItemType } from '~/types/itemStage'
import * as adminRequest from '~/untils/adminRequest'

export const getColors = createAsyncThunk('color/get-all', async (__, thunkAPI) => {
   try {
      const response = await adminRequest.get('color', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const updateAColor = createAsyncThunk('color/update', async (body: ItemType, thunkAPI) => {
   try {
      const response = await adminRequest.put(`color/${body.id}`, body, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const deleteColor = createAsyncThunk('color/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await adminRequest.Delete(`color/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getColor = createAsyncThunk('color/get', async (id: string, thunkAPI) => {
   try {
      const response = await adminRequest.get(`color/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const createColor = createAsyncThunk('color/create', async (data: ItemType, thunkAPI) => {
   try {
      const response = await adminRequest.post('color', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
