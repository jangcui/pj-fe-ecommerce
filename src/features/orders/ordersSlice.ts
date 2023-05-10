import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'
import { OrderStageType } from '~/types/orderStage'

export const getOrders = createAsyncThunk('user/all-orders', async (__, thunkAPI) => {
   try {
      const response = await httpRequest.get('color', {
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
         return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
   }
})
const initialState: OrderStageType = {
   order: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const ordersSlice = createSlice({
   name: 'orders',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getOrders.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getOrders.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.order = action.payload
            state.message = 'Success'
         })
         .addCase(getOrders.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
   },
})

export default ordersSlice.reducer
