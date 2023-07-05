import { createSlice, createAction } from '@reduxjs/toolkit'

import { ItemStageType } from '~/types/itemStage'
import { createColor, deleteColor, getColor, getColors, updateAColor } from './colorService'
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
export const resetColorState = createAction('Reset_Color_State')

export const colorSlice = createSlice({
   name: 'color',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getColors.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getColors.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemList = action.payload
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
            state.item = action.payload
            toast.success('Color Added Successfully')
         })
         .addCase(createColor.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
            toast.success('Something went wrong')
         })
         .addCase(getColor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getColor.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.item = action.payload
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
            state.item = action.payload
            toast.success('Color Updated Successfully')
         })
         .addCase(updateAColor.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Something went wrong')
            state.message = action.error as string
         })
         .addCase(deleteColor.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteColor.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'Deleted'
         })
         .addCase(deleteColor.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(resetColorState, () => initialState)
   },
})

export default colorSlice.reducer
