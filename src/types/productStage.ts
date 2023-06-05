import { ImgType } from './imageStage'
import { StuffType } from './stuffStage'

export interface ProductType {
   _id?: string
   isDelete?: boolean
   deleteDate?: Date | any
   totalRating?: number
   ratings?: string[]
   __v?: number | string
   slug?: string
   sold?: number

   tags: string
   title: string
   images: ImgType[]
   description: string
   price: number
   quantity: number
   category: string
   brand: string
   color: StuffType[] | string[]
}

export interface ProductStageType {
   productList: ProductType[]
   product: ProductType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
