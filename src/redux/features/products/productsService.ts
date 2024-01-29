import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/utils/httpRequest'
interface RatingType {
   star: number
   comment: string
   prodId?: string
}
interface ParamsType {
   page?: number
   limit?: number
   brand?: string
   tag?: string
   minPrice?: number
   maxPrice?: number
   category?: string
   sort?: string
   fields?: boolean
}

export const getAProduct = createAsyncThunk('product/get', async (slug: string, thunkAPI) => {
   try {
      const response = await httpRequest.get(`product/${slug.trim()}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const getAllProducts = createAsyncThunk('product/get-all', async (data: ParamsType, thunkAPI) => {
   try {
      const queryString = `?${data?.brand ? `brand=${data?.brand}&&` : ''}${data?.tag ? `tags=${data?.tag}&&` : ''}${
         data?.category ? `category=${encodeURIComponent(data?.category)}&&` : ''
      }${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ''}${
         data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ''
      }${data?.sort ? `sort=${data?.sort}&&` : ''}`

      const response = await httpRequest.get(`product${data ? queryString : ''}`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const rateProduct = createAsyncThunk('product/rating', async (data: RatingType, thunkAPI) => {
   try {
      const response = await httpRequest.put('product/rating', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
