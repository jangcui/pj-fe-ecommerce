import { createAsyncThunk } from '@reduxjs/toolkit'
import * as httpRequest from '~/utils/httpRequest'

interface LoginType {
   email: string
   password: string
}

interface RegisterType extends LoginType {
   first_name: string
   last_name: string
   mobile: number | string
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
export const checkIsLogin = createAsyncThunk('auth/check', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('user/login', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const logout = createAsyncThunk('auth/logout', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.Delete('user/logout', {
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

export const forgotPwdToken = createAsyncThunk(
   'user/password/token',
   async ({ email, mobile }: { email: string; mobile: number }, thunkAPI) => {
      try {
         const response = await httpRequest.post(
            'user/forgot-password-token',
            { email, mobile },
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
