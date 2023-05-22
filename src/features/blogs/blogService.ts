import { createAsyncThunk } from '@reduxjs/toolkit'
import { BlogType } from '~/types/blogStage'
import * as httpRequest from '~/untils/httpRequest'

export const getBlog = createAsyncThunk('blog/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`blog/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const toggleBlogToTrashBin = createAsyncThunk('blog/add-to-trash-bin', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.put(`blog/trash/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getBlogs = createAsyncThunk('blog/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('blog', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const createBlog = createAsyncThunk('blog/create', async (data: BlogType, thunkAPI) => {
   try {
      const response = await httpRequest.post('blog', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const updateABlog = createAsyncThunk(
   'blog/update',
   async ({ id, body }: { id: string; body: BlogType }, thunkAPI) => {
      try {
         const response = await httpRequest.put(`blog/${id}`, body, {
            signal: thunkAPI.signal,
         })
         return response
      } catch (error: any) {
         if (error.name === 'AxiosError' && error.response.status === 422) {
            return thunkAPI.rejectWithValue(error.response.data)
         }
         throw error
      }
   },
)

export const deleteBlog = createAsyncThunk('blog/delete', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`blog/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
