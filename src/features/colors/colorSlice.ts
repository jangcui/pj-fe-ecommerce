import { createSlice, createAction } from '@reduxjs/toolkit'

import { StuffStageType } from '~/types/stuffStage'
import { createColor, deleteColor, getColor, getColors, updateAColor } from './colorService'

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
export const resetState = createAction('Reset_State')

export const colorSlice = createSlice({
   name: 'color',
   initialState,
   reducers: {
      resetState(state) {
         Object.assign(state, initialState)
      },
   },
   extraReducers: (builder) => {
      builder
      builder
         .addCase(getColors.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getColors.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.stuff = action.payload
         })
         .addCase(getColors.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(createColor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createColor.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemCreate = action.payload
         })
         .addCase(createColor.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(getColor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getColor.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.name = action.payload.title
         })
         .addCase(getColor.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(updateAColor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateAColor.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemUpdate = action.payload.title
         })
         .addCase(updateAColor.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteColor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteColor.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemDelete = action.payload.title
         })
         .addCase(deleteColor.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addDefaultCase(() => initialState)
   },
})

export default colorSlice.reducer
