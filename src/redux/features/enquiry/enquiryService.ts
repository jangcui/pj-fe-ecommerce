import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'

interface EnquiryType {
   name: string
   email: string
   mobile: string
   comment: string
}

export const getAEnquiry = createAsyncThunk('enquiry/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`enquiry/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getAllEnquiries = createAsyncThunk('enquiry/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('enquiry', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const createEnquiry = createAsyncThunk('enquiry/create', async (data: EnquiryType, thunkAPI) => {
   try {
      const response = await httpRequest.post('enquiry', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
