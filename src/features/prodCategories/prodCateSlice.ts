import { createAction, createSlice } from '@reduxjs/toolkit'

import { StuffStageType } from '~/types/stuffStage'
import { createProdCate, deleteProdCate, getProdCate, getProdCates, updateAProdCate } from './productCateService'

const initialState: StuffStageType = {
   stuff: [],
   item: {},
   itemCreate: {},
   itemUpdate: {},
   name: '',
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const resetProdCateState = createAction('Reset_ProdCate_State')
export const prodCateSlice = createSlice({
   name: 'prod-Categories',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getProdCates.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getProdCates.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.stuff = action.payload
         })
         .addCase(getProdCates.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(createProdCate.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createProdCate.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemCreate = action.payload
         })
         .addCase(createProdCate.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(getProdCate.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getProdCate.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.name = action.payload.title
         })
         .addCase(getProdCate.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(updateAProdCate.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateAProdCate.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemUpdate = action.payload.title
         })
         .addCase(updateAProdCate.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteProdCate.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteProdCate.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'Deleted'
         })
         .addCase(deleteProdCate.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(resetProdCateState, () => initialState)
   },
})

export default prodCateSlice.reducer
