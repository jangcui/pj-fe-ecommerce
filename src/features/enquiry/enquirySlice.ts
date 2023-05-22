import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { EnquiryStageType } from '~/types/enquiryState'
import { createEnquiry, deleteEnquiry, getAEnquiry, getEnquiries, updateStatusEnquiry } from './enquiryService'
import { toast } from 'react-toastify'

const initialState: EnquiryStageType = {
   enquiries: [],
   enquiry: {},
   enqCreate: {},
   enqUpdate: {},
   enqDelete: {},
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
         .addCase(getAEnquiry.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAEnquiry.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.enquiry = action.payload
         })
         .addCase(getAEnquiry.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
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
         .addCase(createEnquiry.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createEnquiry.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.enqCreate = action.payload
            toast.success('Success')
         })
         .addCase(createEnquiry.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload.error)
         })
         .addCase(updateStatusEnquiry.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateStatusEnquiry.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.enqUpdate = action.payload
         })
         .addCase(updateStatusEnquiry.rejected, (state, action) => {
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
            state.enqDelete = action.payload
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
