import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EnquiryStageType } from '~/types/enquiryState'
import { deleteEnquiry, getEnquiries } from './enquiryService'

const initialState: EnquiryStageType = {
   enquiries: [],
   enquiry: {},
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}
export const resetEnquiryState = createAction('Reset_Enquiry_State')

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
            state.enquiries = action.payload
         })
         .addCase(getEnquiries.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteEnquiry.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteEnquiry.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.enquiry = action.payload
         })
         .addCase(deleteEnquiry.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(resetEnquiryState, () => initialState)
   },
})

export default enquirySlice.reducer
