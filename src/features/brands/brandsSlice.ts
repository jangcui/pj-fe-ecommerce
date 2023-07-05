import { createAction, createSlice } from '@reduxjs/toolkit'
import { ItemStageType } from '~/types/itemStage'
import { createBrand, deleteBrand, getBrand, getBrands, updateABrand } from './brandService'
import { toast } from 'react-toastify'

const initialState: ItemStageType = {
   itemList: [],
   item: {},
   name: '',
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}
export const resetBrandState = createAction('Reset_Brand_State')

export const brandsSlice = createSlice({
   name: 'brands',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getBrands.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getBrands.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemList = action.payload
         })
         .addCase(getBrands.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(createBrand.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createBrand.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.item = action.payload
            toast.success('Brand created successfully')
         })
         .addCase(createBrand.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
            toast.error('Something went wrong')
         })
         .addCase(getBrand.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getBrand.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.name = action.payload.title
         })
         .addCase(getBrand.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(updateABrand.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateABrand.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Brand updated successfully')
            state.item = action.payload.title
         })
         .addCase(updateABrand.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            toast.error('Something went wrong')
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteBrand.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteBrand.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'Deleted'
         })
         .addCase(deleteBrand.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(resetBrandState, () => initialState)
   },
})

export default brandsSlice.reducer
