import { ProductType } from './productStage'

export interface UserType {
   _id?: string
   fist_name?: string
   last_name?: string
   role?: string
   email?: string
   cart?: string[]
   mobile?: string
   wishlist?: ProductType[]
   isBlocked?: boolean
   isDelete?: boolean
   deleteDate?: Date | any
   token?: string
}
export interface AdminType {
   _id?: string
   fist_name?: string
   last_name?: string
   role?: string
   email?: string
   mobile?: string

   token?: string
}

export interface UserStageType {
   isAdmin?: boolean
   admin?: AdminType
   wishlist?: ProductType[]
   userList?: UserType[]
   user?: UserType
   userCreate?: UserType
   userUpdate?: UserType
   order?: []
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: any
}
