import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'

interface LoginType {
   email: string
   password: string
}

interface RegisterType extends LoginType {
   fist_name: string
   last_name: string
   mobile: number
}

export const login = createAsyncThunk('auth/login', async (user: LoginType, thunkAPI) => {
   try {
      const response = await httpRequest.post('user/login', user, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const register = createAsyncThunk('auth/register', async (userData: RegisterType, thunkAPI) => {
   try {
      const response = await httpRequest.post('/user/register', userData, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const addToWishList = createAsyncThunk(
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
export const addToCart = createAsyncThunk('user/cart/add', async (cartData, thunkAPI) => {
   try {
      const response = await httpRequest.post(`user/cart`, cartData, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
