import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createEnquiry, getAEnquiry, getAllEnquiries } from './enquiryService'
import { toast } from 'react-toastify'

interface EnquiryType {
   _id: string
   name: string
   email: string
   status: string
   mobile: string
   comment: string
}

interface InitialType {
   enquiryList: EnquiryType[]
   enquiry: EnquiryType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}

const initialState: InitialType = {
   enquiryList: [],
   enquiry: { _id: '', name: '', email: '', status: '', mobile: '', comment: '' },
   isError: false,
   isLoading: false,
   isSuccess: false,
}

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
         .addCase(getAEnquiry.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            if (action.payload) {
               const result = action.payload
               state.enquiry = {
                  _id: result?._id,
                  name: result?.name,
                  email: result?.email,
                  status: result?.status,
                  mobile: result?.mobile,
                  comment: result?.comment,
               }
            }
         })
         .addCase(getAllEnquiries.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAllEnquiries.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            if (action.payload) {
               const result = action?.payload?.map((data: any) => {
                  const filterData = {
                     _id: data?._id,
                     name: data?.name,
                     email: data?.email,
                     status: data?.status,
                     mobile: data?.mobile,
                     comment: data?.comment,
                  }
                  return filterData
               })
               state.enquiryList = [...result]
            }
         })
         .addCase(getAllEnquiries.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })
         .addCase(createEnquiry.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createEnquiry.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Enquiry created')
         })
         .addCase(createEnquiry.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload.error)
         })
   },
})

export default enquirySlice.reducer
