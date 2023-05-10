import { ImgType } from './imageStage'

export interface ProductType {
   _id?: string
   tags?: string
   title?: string
   slug?: string
   description?: string
   price?: number
   quantity?: number
   category?: string
   brand?: string
   role?: string
   sold?: number
   images?: ImgType[]
   color?: any[]
   totalRating?: string
   ratings?: string[]
   __v?: number
}

export interface ProductStageType {
   product: ProductType[]
   createdProduct?: ProductType
   isError?: boolean
   isLoading?: boolean
   isSuccess?: boolean
   message?: string
}
