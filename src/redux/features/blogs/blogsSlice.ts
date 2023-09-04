import { createAction, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getBlog, getAllBlogs } from './blogService'
import { toast } from 'react-toastify'

export interface BlogType {
   _id: string
   title: string
   description: string
   numViews: string
   category: string
   images: string
   likes: number
   dislikes: number
   isLiked: boolean
   isDisLiked: boolean
   updatedAt: string
}

interface BlogStageType {
   blogList: BlogType[]
   blog: BlogType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}

const initialState: BlogStageType = {
   blogList: [],
   blog: {
      _id: '',
      title: '',
      description: '',
      numViews: '',
      category: '',
      images: '',
      likes: 0,
      dislikes: 0,
      isLiked: false,
      isDisLiked: false,
      updatedAt: '',
   },
   isError: false,
   isLoading: false,
   isSuccess: false,
}
export const resetBlogState = createAction('Reset_Blog_State')
export const blogSlice = createSlice({
   name: 'blogs',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllBlogs.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAllBlogs.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            if (action.payload) {
               const result = action?.payload?.map((data: any) => {
                  const filterData = {
                     _id: data?._id,
                     title: data?.title,
                     description: data?.description,
                     numViews: data?.numViews,
                     category: data?.category,
                     images: data?.images[0]?.url,
                     likes: data?.likes?.length,
                     dislikes: data?.dislikes?.length,
                     isLiked: data?.isLiked,
                     isDisLiked: data?.isDisLiked,
                     updatedAt: data?.updatedAt,
                  }
                  return filterData
               })
               state.blogList = [...result]
            }
         })
         .addCase(getAllBlogs.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })

         .addCase(getBlog.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getBlog.fulfilled, (state, action) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            if (action.payload) {
               const result = action.payload
               const data = {
                  _id: result?._id,
                  title: result?.title,
                  description: result?.description,
                  numViews: result?.numViews,
                  category: result?.category,
                  images: result?.images[0]?.url,
                  likes: result?.likes?.length,
                  dislikes: result?.dislikes?.length,
                  isLiked: result?.isLiked,
                  isDisLiked: result?.isDisLiked,
                  updatedAt: result?.updatedAt,
               }
               state.blog = data
            }
         })
         .addCase(getBlog.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Blog get failed')
         })

         .addCase(resetBlogState, () => initialState)
   },
})

export default blogSlice.reducer
