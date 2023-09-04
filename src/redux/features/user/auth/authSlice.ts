import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { login, checkIsLogin, register, updateProfile, forgotPwdToken, resetPwdToken, logout } from './authService'
import { toast } from 'react-toastify'

interface UserType {
   _id: string
   first_name: string
   last_name: string
   email: string
   mobile: string
}

export interface InitialType {
   user: UserType
   token: string
   isLogin: boolean
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}

const initialState: InitialType = {
   user: { _id: '', first_name: '', last_name: '', mobile: '', email: '' },
   token: '',
   isLogin: false,
   isError: false,
   isLoading: false,
   isSuccess: false,
}

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(logout.pending, (state) => {
            state.isLoading = true
         })
         .addCase(logout.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.isLogin = false
            toast.info('Logged Out')
            localStorage.removeItem('TOKEN')
         })
         .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload.message)
         })
         .addCase(checkIsLogin.pending, (state) => {
            state.isLoading = true
         })
         .addCase(checkIsLogin.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.isLogin = true
            if (action.payload) {
               state.user = action.payload.user
            }
            toast.success(`Welcome back, ${action.payload.user.first_name} ${action.payload.user.last_name}`)
         })
         .addCase(checkIsLogin.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLogin = false
            state.isLogin = false
            state.isLoading = false
         })

         .addCase(login.pending, (state) => {
            state.isLoading = true
         })
         .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isLogin = true
            state.isSuccess = true
            if (action.payload) {
               const { token, ...data } = action.payload
               state.user = data
               state.token = token
               localStorage.setItem('TOKEN', JSON.stringify(action.payload.token))
            }
         })
         .addCase(login.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload.message)
         })
         .addCase(updateProfile.pending, (state) => {
            state.isLoading = true
         })
         .addCase(updateProfile.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            const userResult = {
               _id: action.payload._id,
               first_name: action.payload.first_name,
               last_name: action.payload.last_name,
               email: action.payload.email,
               mobile: action.payload.mobile,
            }
            state.user = userResult
            state.token = action.payload.token
            toast.success('Updated')
         })
         .addCase(updateProfile.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload.message)
         })
         .addCase(register.pending, (state) => {
            state.isLoading = true
         })
         .addCase(register.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Register Successfully')
         })
         .addCase(register.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload.message)
         })
         .addCase(forgotPwdToken.pending, (state) => {
            state.isLoading = true
         })
         .addCase(forgotPwdToken.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.token = action.payload.token
            toast.success('Email sent')
         })
         .addCase(forgotPwdToken.rejected, (state, action: PayloadAction<any>) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error(action.payload.message)
         })
         .addCase(resetPwdToken.pending, (state) => {
            state.isLoading = true
         })
         .addCase(resetPwdToken.fulfilled, (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            toast.success('Successfully, passWord changed.')
         })
         .addCase(resetPwdToken.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            toast.error('Some thing went wrong!')
         })
   },
})

export default authSlice.reducer
