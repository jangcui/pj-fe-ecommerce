import { createAsyncThunk } from '@reduxjs/toolkit'
import { PaymentInfo } from '~/types/orderStage'
import * as httpRequest from '~/untils/httpRequest'

interface LoginType {
   email: string
   password: string
}
type itemType = {
   cartItemId: string
   quantity: number
}

interface RegisterType extends LoginType {
   fist_name: string
   last_name: string
   mobile: number | string
}
interface DataCartType {
   productId?: string
   color?: string
   price?: number
   quantity?: number
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
export const updateProfile = createAsyncThunk(
   'auth/profile/update',
   async (userData: Omit<RegisterType, 'password'>, thunkAPI) => {
      try {
         const response = await httpRequest.put('/user', userData, {
            signal: thunkAPI.signal,
         })
         return response
      } catch (error: any) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
   },
)
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
export const getCarts = createAsyncThunk('user/cart/get', async (__, thunkAPI) => {
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
export const createOrder = createAsyncThunk('user/order/create', async (data: any, thunkAPI) => {
   try {
      const response = await httpRequest.post(`user/cart/order`, data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const getMyOrder = createAsyncThunk('user/order/get', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get(`user/order`, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const checkout = createAsyncThunk('user/order/checkout', async ({ amount }: { amount: number }, thunkAPI) => {
   try {
      const response = await httpRequest.post(
         `user/order/checkout`,
         { amount },
         {
            signal: thunkAPI.signal,
         },
      )
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const paymentVerify = createAsyncThunk('user/order/payment-verify', async (data: PaymentInfo, thunkAPI) => {
   try {
      const response = await httpRequest.post('user/order/payment-verify', data, {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})
export const forgotPwdToken = createAsyncThunk(
   'user/password/token',
   async ({ email }: { email: string }, thunkAPI) => {
      try {
         const response = await httpRequest.post(
            'user/forgot-password-token',
            { email },
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
export const resetPwdToken = createAsyncThunk(
   'user/password/reset',
   async ({ token, password }: { password: string; token?: string }, thunkAPI) => {
      try {
         const response = await httpRequest.put(
            `user/reset-password/${token}`,
            { password },
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
