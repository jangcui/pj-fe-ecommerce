import { createSlice } from '@reduxjs/toolkit'
import { getAllBrands } from './brandService'
import type { PayloadAction } from '@reduxjs/toolkit'

interface BrandType {
   _id: string
   title: string
}

export interface ItemStageType {
   brandList: BrandType[]
   brand: BrandType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}

const initialState: ItemStageType = {
   brandList: [],
   brand: { _id: '', title: '' },
   isError: false,
   isLoading: false,
   isSuccess: false,
}

export const brandsSlice = createSlice({
   name: 'brands',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getAllBrands.pending, (state) => {
            state.isLoading = true
         })
         .addCase(getAllBrands.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            if (action.payload) {
               const result = action?.payload?.map((data: any) => {
                  const filterData = {
                     _id: data?._id,
                     title: data?.title,
                  }
                  return filterData
               })
               state.brandList = [...result]
            }
         })
         .addCase(getAllBrands.rejected, (state) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
         })
   },
})

export default brandsSlice.reducer
