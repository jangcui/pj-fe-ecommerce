import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserStageType } from '~/types/userStage'
import * as httpRequest from '~/untils/httpRequest'

type LoginType = {
   email: string
   password: string | number
}

const getUserFromLocalStorage: string | null = localStorage.getItem('USER')
const user = getUserFromLocalStorage ? JSON.parse(getUserFromLocalStorage) : null

const initialState: UserStageType = {
   user: user,
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const login = createAsyncThunk('user/login', async (user: LoginType, thunkAPI) => {
   try {
      const response = await httpRequest.post('user/login', user, {
         signal: thunkAPI.signal,
      })
      if (response) {
         localStorage.setItem('USER', JSON.stringify(response))
      }
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(login.pending, (state) => {
            state.isLoading = true
         })
         .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
            state.message = 'Success'
         })
         .addCase(login.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = 'Fail'
         })
   },
})

export default authSlice.reducer
