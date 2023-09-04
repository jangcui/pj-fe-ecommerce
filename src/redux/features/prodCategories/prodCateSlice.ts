import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getAllProdCates } from './productCateService'

interface InitialType {
   categoriesList: string[]
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}

const initialState: InitialType = {
   categoriesList: [],

   isError: false,
   isLoading: false,
   isSuccess: false,
}

export const prodCateSlice = createSlice({
   name: 'prod-Categories',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllProdCates.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAllProdCates.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            if (action.payload) {
               const result = action?.payload?.map((data: any) => data?.title)
               state.categoriesList = [...result]
            }
         })
         .addCase(getAllProdCates.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })
   },
})

export default prodCateSlice.reducer
