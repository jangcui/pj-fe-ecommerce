import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'

export const getBlog = createAsyncThunk('blog/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`blog/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const getAllBlogs = createAsyncThunk('blog/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('blog', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
