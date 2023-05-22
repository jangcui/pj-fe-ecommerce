import { createAction, createSlice } from '@reduxjs/toolkit'
import { BlogStageType } from '~/types/blogStage'
import { createBlog, deleteBlog, getBlog, getBlogs, toggleBlogToTrashBin, updateABlog } from './blogService'

const initialState: BlogStageType = {
   blogs: [],
   blog: {},
   blogCreate: {},
   blogUpdate: {},
   blogDelete: {},
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}
export const resetBlogState = createAction('Reset_Blog_State')
export const blogSlice = createSlice({
   name: 'blogs',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getBlogs.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getBlogs.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.blogs = action.payload
         })
         .addCase(getBlogs.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(createBlog.pending, (state) => {
            state.isLoading = true
         })
         .addCase(createBlog.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.blogCreate = action.payload
         })
         .addCase(createBlog.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(getBlog.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getBlog.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.blog = action.payload
         })
         .addCase(getBlog.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error.message as string
         })
         .addCase(updateABlog.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateABlog.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.blogUpdate = action.payload
         })
         .addCase(updateABlog.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(deleteBlog.pending, (state) => {
            state.isLoading = true
         })
         .addCase(deleteBlog.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.blogDelete = action.payload
         })
         .addCase(deleteBlog.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(toggleBlogToTrashBin.pending, (state) => {
            state.isLoading = true
         })
         .addCase(toggleBlogToTrashBin.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.blogUpdate = action.payload
         })
         .addCase(toggleBlogToTrashBin.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(resetBlogState, () => initialState)
   },
})

export default blogSlice.reducer
