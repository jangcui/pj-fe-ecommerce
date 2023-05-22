import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import * as httpRequest from '~/untils/httpRequest'
import { ImgStageType } from '~/types/imageStage'

const initialState: ImgStageType = {
   img: [],
   isError: false,
   isLoading: false,
   isSuccess: false,
   message: '',
}

export const uploadImgs = createAsyncThunk('images/uploadImgs', async (data: any, thunkAPI) => {
   try {
      const formData: FormData = new FormData()
      for (let i = 0; i < data.length; i++) {
         formData.append('images', data[i])
      }
      const response = await httpRequest.post('upload', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
         signal: thunkAPI.signal,
      })
      return response
   } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data)
   }
})

export const uploadSlice = createSlice({
   name: 'images',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(uploadImgs.pending, (state) => {
            state.isLoading = true
         })
         .addCase(uploadImgs.fulfilled, (state, action: PayloadAction<any>) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = true
            state.img = action.payload
         })
         .addCase(uploadImgs.rejected, (state, action) => {
            state.isError = true
            state.isSuccess = false
            state.isLoading = false
            state.message = action.error as string
         })
   },
})

export default uploadSlice.reducer
