import { createSlice, createAction } from '@reduxjs/toolkit'
import { ItemStageType } from '~/types/itemStage'
import { createBlogCate, deleteBlogCate, getBlogCate, getBlogCates, updateABlogCate } from './blogCateService'

const initialState: ItemStageType = {
   itemList: [],
   item: {},
   itemCreate: {},
   itemUpdate: {},
   name: '',
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}
export const resetBlogCateState = createAction('Reset_BlogCate_State')

export const blogCateSlice = createSlice({
   name: 'blogCategory',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getBlogCates.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getBlogCates.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemList = action.payload
         })
         .addCase(getBlogCates.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(createBlogCate.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createBlogCate.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemCreate = action.payload
         })
         .addCase(createBlogCate.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(getBlogCate.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getBlogCate.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.name = action.payload.title
         })
         .addCase(getBlogCate.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(updateABlogCate.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateABlogCate.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemUpdate = action.payload.title
         })
         .addCase(updateABlogCate.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteBlogCate.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteBlogCate.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.message = 'Deleted'
         })
         .addCase(deleteBlogCate.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(resetBlogCateState, () => initialState)
   },
})

export default blogCateSlice.reducer
