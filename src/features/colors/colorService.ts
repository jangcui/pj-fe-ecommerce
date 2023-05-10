import { createAsyncThunk } from '@reduxjs/toolkit'
import { StuffType } from '~/types/stuffStage'
import * as httpRequest from '~/untils/httpRequest'

export const getColors = createAsyncThunk('color/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('color', {
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
export const updateAColor = createAsyncThunk('color/update', async (body: StuffType, thunkAPI) => {
   try {
      const response = await httpRequest.put(`color/${body.id}`, body, {
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

export const deleteColor = createAsyncThunk('color/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`color/${id}`)
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
export const getColor = createAsyncThunk('color/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`color/${id}`, {
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
export const createColor = createAsyncThunk('color/create', async (data: StuffType, thunkAPI) => {
   try {
      const response = await httpRequest.post('color', data, {
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
