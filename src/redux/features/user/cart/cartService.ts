import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'

type itemType = {
   cartItemId: string
   quantity: number
}

interface DataCartType {
   productId?: string
   color?: string
   price?: number
   quantity?: number
}

export const addToCart = createAsyncThunk('user/cart/add', async (cartData: DataCartType, thunkAPI) => {
   try {
      const response = await httpRequest.post(`user/cart`, cartData, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getCart = createAsyncThunk('user/cart/get', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get(`user/cart`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const removeProductFromCart = createAsyncThunk(
   'user/cart/remove-product',
   async (cartItemId: string, thunkAPI) => {
      try {
         const response = await httpRequest.Delete(`user/delete-product-cart/${cartItemId}`, {
            signal: thunkAPI.signal,
         })
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

export const updateQuantityProductFromCart = createAsyncThunk(
   'user/cart/update-product-quantity',
   async (item: itemType, thunkAPI) => {
      try {
         const response = await httpRequest.put(`user/update-product-cart/${item.cartItemId}/${item.quantity}`, {
            signal: thunkAPI.signal,
         })
         return response
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
   },
)
