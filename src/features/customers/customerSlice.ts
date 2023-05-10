import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './customerService'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserStageType } from '~/types/userStage'

const initialState: UserStageType = {
   user: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const getUsers = createAsyncThunk('user/getUsers', async (thunkAPI) => {
   try {
      return await customerService.getUser()
   } catch (err) {
      return console.log(thunkAPI)
   }
})

export const customerSlice = createSlice({
   name: 'customer',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getUsers.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload
         })
         .addCase(getUsers.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
   },
})

export default customerSlice.reducer
