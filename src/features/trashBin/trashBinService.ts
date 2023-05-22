import { createAsyncThunk } from '@reduxjs/toolkit'

import * as httpRequest from '~/untils/httpRequest'

export const getProductTrash = createAsyncThunk('trash/products', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('trash/products', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getCustomersTrash = createAsyncThunk('trash/customers', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('trash/users', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const geBlogsTrash = createAsyncThunk('trash/blogs', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('trash/blogs', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
