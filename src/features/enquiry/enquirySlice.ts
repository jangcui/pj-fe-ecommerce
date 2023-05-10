import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import enquiryService from './enquiryService'
import { EnquiryStageType } from '~/types/enquiryState'

export const getEnquiries = createAsyncThunk('enquiry', async (thunkAPI) => {
   try {
      return await enquiryService.getEnquiries()
   } catch (err) {
      return console.log(thunkAPI)
   }
})
const initialState: EnquiryStageType = {
   enquiry: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const enquirySlice = createSlice({
   name: 'enquiry',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getEnquiries.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getEnquiries.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.enquiry = action.payload
         })
         .addCase(getEnquiries.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
   },
})

export default enquirySlice.reducer
