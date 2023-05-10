import { createAsyncThunk } from '@reduxjs/toolkit'
import { StuffType } from '~/types/stuffStage'
import * as httpRequest from '~/untils/httpRequest'

export const getBlogCates = createAsyncThunk('blogCategory/get-all', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('blog-category', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
export const updateABlogCate = createAsyncThunk('blogCategory/update', async (body: StuffType, thunkAPI) => {
   try {
      const response = await httpRequest.put(`blog-category/${body.id}`, body, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})

export const deleteBlogCate = createAsyncThunk('blogCategory/delete', async (id: string | any, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`blog-category/${id}`)
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
export const getBlogCate = createAsyncThunk('blogCategory/get', async (id: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`blog-category/${id}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
export const createBlogCate = createAsyncThunk('blogCategory/create', async (data: StuffType, thunkAPI) => {
   try {
      const response = await httpRequest.post('blog-category', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
