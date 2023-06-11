import { createAsyncThunk } from '@reduxjs/toolkit'
import { ItemType } from '~/types/itemStage'
import * as adminRequest from '~/untils/adminRequest'

export const getBlogCates = createAsyncThunk('blogCategory/get-all', async (__, thunkAPI) => {
   try {
      const response = await adminRequest.get('blog-category', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const updateABlogCate = createAsyncThunk('blogCategory/update', async (body: ItemType, thunkAPI) => {
   try {
      const response = await adminRequest.put(`blog-category/${body.id}`, body, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const deleteBlogCate = createAsyncThunk('blogCategory/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await adminRequest.Delete(`blog-category/${id}`)
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getBlogCate = createAsyncThunk('blogCategory/get', async (id: string, thunkAPI) => {
   try {
      const response = await adminRequest.get(`blog-category/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const createBlogCate = createAsyncThunk('blogCategory/create', async (data: ItemType, thunkAPI) => {
   try {
      const response = await adminRequest.post('blog-category', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
