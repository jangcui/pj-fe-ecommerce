import { createAction, createSlice } from '@reduxjs/toolkit'

import { ProductStageType } from '~/types/productStage'
import { createProduct, deleteProduct, getAProduct, getProducts, updateAProduct } from './productsService'

const initialState: ProductStageType = {
   productList: [],
   product: {},
   productCreate: {},
   productUpdate: {},
   productDelete: {},
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}
export const resetProductState = createAction('Reset_Product_State')

export const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
      builder
         .addCase(getProducts.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getProducts.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.productList = action.payload
         })
         .addCase(getProducts.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(createProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createProduct.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.productCreate = action.payload
         })
         .addCase(createProduct.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(getAProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAProduct.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.product = action.payload
         })
         .addCase(getAProduct.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(updateAProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateAProduct.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.productUpdate = action.payload
         })
         .addCase(updateAProduct.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteProduct.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.productDelete = action.payload
         })
         .addCase(deleteProduct.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(resetProductState, () => initialState)
   },
})

export default productSlice.reducer
