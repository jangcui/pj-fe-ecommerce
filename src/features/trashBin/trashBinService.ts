import { createAsyncThunk } from '@reduxjs/toolkit'

import * as adminRequest from '~/untils/adminRequest'

export const getProductTrash = createAsyncThunk('trash/products', async (__, thunkAPI) => {
   try {
      const response = await adminRequest.get('trash/products', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getCustomersTrash = createAsyncThunk('trash/customers', async (__, thunkAPI) => {
   try {
      const response = await adminRequest.get('trash/users', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const geBlogsTrash = createAsyncThunk('trash/blogs', async (__, thunkAPI) => {
   try {
      const response = await adminRequest.get('trash/blogs', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
