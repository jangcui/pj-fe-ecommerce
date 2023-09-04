import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'

export const toggleWWishListProduct = createAsyncThunk(
   'product/add-wishlist',
   async ({ prodId }: { prodId: string }, thunkAPI) => {
      try {
         const response = await httpRequest.put(
            `product/wishlist`,
            { prodId },
            {
               signal: thunkAPI.signal,
            },
         )
         return response
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
   },
)
export const getUserWishList = createAsyncThunk('user/get-wishlist', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get(`user/wishlist`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
