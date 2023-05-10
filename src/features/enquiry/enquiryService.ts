import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'

export const getEnquiries = createAsyncThunk('enquiry/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('enquiry', {
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

export const deleteEnquiry = createAsyncThunk('enquiry/delete', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`enquiry/${id}`)
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
