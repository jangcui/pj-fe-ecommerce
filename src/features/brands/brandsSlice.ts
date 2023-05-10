import { createAction, createSlice } from '@reduxjs/toolkit'
import { StuffStageType } from '~/types/stuffStage'
import { createBrand, deleteBrand, getBrand, getBrands, updateABrand } from './brandService'

const initialState: StuffStageType = {
   stuff: [],
   item: {},
   itemCreate: {},
   itemUpdate: {},
   itemDelete: {},
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
            state.stuff = action.payload
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
            state.itemCreate = action.payload
         })
         .addCase(createBrand.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
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
            state.itemUpdate = action.payload.title
         })
         .addCase(updateABrand.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteBrand.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteBrand.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemDelete = action.payload.title
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
