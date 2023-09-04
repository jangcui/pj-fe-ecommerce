import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'

export const getAllBrands = createAsyncThunk('brand/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('brand', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
