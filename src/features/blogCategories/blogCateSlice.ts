import { createSlice, createAction } from '@reduxjs/toolkit'
import { StuffStageType } from '~/types/stuffStage'
import { createBlogCate, deleteBlogCate, getBlogCate, getBlogCates, updateABlogCate } from './blogCateService'

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

export const blogCateSlice = createSlice({
   name: 'blogCategory',
   initialState,
   reducers: {
      resetState(state) {
         Object.assign(state, initialState)
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(getBlogCates.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getBlogCates.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.stuff = action.payload
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
         .addCase(deleteBlogCate.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.itemDelete = action.payload.title
         })
         .addCase(deleteBlogCate.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
      // .addDefaultCase(() => initialState)
   },
})

export default blogCateSlice.reducer
