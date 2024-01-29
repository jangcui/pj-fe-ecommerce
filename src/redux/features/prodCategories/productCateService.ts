import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/utils/httpRequest'

export const getAllProdCates = createAsyncThunk('productCategory/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('prod-category', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
