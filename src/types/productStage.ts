import { ImgType } from './imageStage'
import { ItemType } from './itemStage'
import { UserType } from './userStage'

interface RatingType {
   star: number
   comment: string
   postedBy: UserType
}
export interface ProductType {
   _id?: string
   isDelete?: boolean
   deleteDate?: Date | any
   totalRating?: number
   ratings?: RatingType[]
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
   color: ItemType[] | string[]
}

export interface ProductStageType {
   productList: ProductType[]
   product: ProductType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
