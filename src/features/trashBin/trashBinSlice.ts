import { createAction, createSlice } from '@reduxjs/toolkit'

import { ProductType } from '~/types/productStage'
import { geBlogsTrash, getCustomersTrash, getProductTrash } from './trashBinService'
import { BlogType } from '~/types/blogStage'
import { UserType } from '~/types/userStage'

interface TrashType {
   products: ProductType[]
   blogs: BlogType[]
   customers: UserType[]
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}

const initialState: TrashType = {
   products: [],
   blogs: [],
   customers: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}
export const resetTrashBinState = createAction('Reset_TrashBin_State')

export const productSlice = createSlice({
   name: 'trash-bin',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getProductTrash.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getProductTrash.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.products = action.payload
         })
         .addCase(getProductTrash.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(getCustomersTrash.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getCustomersTrash.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.customers = action.payload
         })
         .addCase(getCustomersTrash.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(geBlogsTrash.pending, (state) => {
            state.isLoading = true
         })
         .addCase(geBlogsTrash.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.blogs = action.payload
         })
         .addCase(geBlogsTrash.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })

         .addCase(resetTrashBinState, () => initialState)
   },
})

export default productSlice.reducer
