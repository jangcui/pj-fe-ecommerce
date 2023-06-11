import { createAction, createSlice } from '@reduxjs/toolkit'
import { ProductStageType } from '~/types/productStage'
import type { PayloadAction } from '@reduxjs/toolkit'

import {
   createProduct,
   deleteProduct,
   getAProduct,
   getProducts,
   rateProduct,
   toggleProductToTrashBin,
   updateAProduct,
} from './productsService'
import { toast } from 'react-toastify'

const initialProduct = {
   tags: '',
   title: '',
   images: [],
   description: '',
   price: 0,
   quantity: 0,
   category: '',
   brand: '',
   color: [],
   rating: [],
   totalRating: 0,
}

const initialState: ProductStageType = {
   productList: [],
   product: initialProduct,
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
         .addCase(createProduct.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Product Create successfully')
         })
         .addCase(createProduct.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
            toast.error('Something went wrong')
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
            toast.error('Something went wrong')
         })
         .addCase(updateAProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateAProduct.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Product Update successfully')
         })
         .addCase(updateAProduct.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
            toast.error('Something went wrong')
         })
         .addCase(deleteProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteProduct.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
         })
         .addCase(deleteProduct.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
            toast.error('Something went wrong')
         })
         .addCase(toggleProductToTrashBin.pending, (state) => {
            state.isLoading = true
         })
         .addCase(toggleProductToTrashBin.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
         })
         .addCase(toggleProductToTrashBin.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
            toast.error('Something went wrong')
         })
         .addCase(rateProduct.pending, (state) => {
            state.isLoading = true
         })
         .addCase(rateProduct.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Ratting added successfully')
            state.product = action.payload
            console.log(action.payload)
         })
         .addCase(rateProduct.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
            toast.error('Something went wrong')
         })

         .addCase(resetProductState, () => initialState)
   },
})

export default productSlice.reducer
