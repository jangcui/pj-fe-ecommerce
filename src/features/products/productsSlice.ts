import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'

import { ProductStageType, ProductType } from '~/types/productStage'

interface TypeOption {
   page?: number
   limit?: number
   sort?: boolean
   fields?: boolean
}

export const getProducts = createAsyncThunk('product/get-all', async (config: TypeOption, thunkAPI) => {
   try {
      const response = await httpRequest.get('product', {
         params: config,
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
export const addProducts = createAsyncThunk('product/create', async (data: ProductType, thunkAPI) => {
   try {
      const response = await httpRequest.post('product', data, {
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
const initialState: ProductStageType = {
   product: [],
   createdProduct: {},
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const productSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getProducts.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.product = action.payload
         })
         .addCase(getProducts.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
         .addCase(addProducts.pending, (state) => {
            state.isLoading = true
         })
         .addCase(addProducts.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.createdProduct = action.payload
         })
         .addCase(addProducts.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
   },
})

export default productSlice.reducer
