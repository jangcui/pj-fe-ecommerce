import { CartType } from './cartStage'
import { OrderDataStage } from './orderStage'
import { ProductType } from './productStage'

export interface UserType {
   _id: string
   fist_name: string
   last_name: string
   role: string
   email: string
   cart: string[]
   mobile: string
   wishlist: ProductType[]
   isBlocked: boolean
   isDelete: boolean
   deleteDate: Date | any
   token: string
}

export interface AdminType {
   _id: string
   fist_name: string
   last_name: string
   role: string
   email: string
   mobile: string
   token: string
}
export interface IncomeType {
   _id: {
      month: string
   }
   amount: number
   count: number
}

export interface UserStageType {
   cart: CartType | object
   cartList: CartType[]
   wishlist: ProductType[]
   orderList: OrderDataStage[]
   totalPrice: number
   user: UserType | null
   order: OrderDataStage | object
   token: string
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: any
}

export interface AdminStageType {
   isAdmin: boolean
   admin: AdminType | null
   userList: UserType[]
   order?: OrderDataStage
   orderList: OrderDataStage[]
   monthlyIncome: IncomeType[]
   yearlyIncome: IncomeType[]
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: any
}
