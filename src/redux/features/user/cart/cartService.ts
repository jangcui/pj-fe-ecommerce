import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/utils/httpRequest'

interface DataCartType {
   productId?: string
   colorId?: string
   quantity?: number
}

export const addToCart = createAsyncThunk('cart/add_to_cart', async (cartData: DataCartType, thunkAPI) => {
   try {
      const response = await httpRequest.post(`cart`, cartData, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getCart = createAsyncThunk('cart/get', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get(`cart`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const removeProductFromCart = createAsyncThunk(
   'cart/remove-product',
   async ({ productId, colorId }: { productId: string; colorId: string }, thunkAPI) => {
      try {
         const response = await httpRequest.post(
            'cart/del',
            { productId, colorId },
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
export const emptyCart = createAsyncThunk('user/cart/clear', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.Delete(`user/cart`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const updateQuantityProduct = createAsyncThunk(
   'user/cart/update-product-quantity',
   async (cartData: DataCartType, thunkAPI) => {
      try {
         const response = await httpRequest.put('cart', cartData, {
            signal: thunkAPI.signal,
         })
         return response
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
   },
)
