import { createAsyncThunk } from '@reduxjs/toolkit'
import { EnquiryType } from '~/types/enquiryState'
import * as httpRequest from '~/untils/httpRequest'
import * as adminRequest from '~/untils/adminRequest'

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
export const getEnquiries = createAsyncThunk('enquiry/get-all', async (__, thunkAPI) => {
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
export const updateStatusEnquiry = createAsyncThunk(
   'enquiry/update',
   async ({ id, status }: { id: string; status: string }, thunkAPI) => {
      try {
         const response = await httpRequest.put(
            `enquiry/${id}`,
            { status },
            {
               signal: thunkAPI.signal,
            },
         )
         return response
      } catch (error: any) {
         if (error.name === 'AxiosError' && error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data)
         }
         throw error
      }
   },
)

export const deleteEnquiry = createAsyncThunk('enquiry/delete', async (id: string, thunkAPI) => {
   try {
      const response = await adminRequest.Delete(`enquiry/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
