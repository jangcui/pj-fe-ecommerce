import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import authService from './authService'

interface AuthState {
   user: any
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: any
}

type LoginType = {
   email: string
   password: string | number
}

const getUserFromLocalStorage: string | null = localStorage.getItem('USER')
const user = getUserFromLocalStorage ? JSON.parse(getUserFromLocalStorage) : null

const initialState: AuthState = {
   user: user,
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const login = createAsyncThunk<AuthState, LoginType>('user/login', async (user: LoginType, thunkAPI) => {
   try {
      console.log(authService.login(user))
      return await authService.login(user)
   } catch (err) {
      return thunkAPI.rejectWithValue(err)
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
            state.message = action.error
         })
   },
})

export default authSlice.reducer
