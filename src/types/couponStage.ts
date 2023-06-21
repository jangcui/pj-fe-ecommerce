export interface CouponType {
   _id?: string
   name?: string | number
   expiry?: string | Date
   __v?: number
   discount?: number
}
export interface DiscountType {
   _id?: string
   name?: string
   expiry?: string | Date
   percentage?: number
}

export interface CouponStageType {
   coupons: CouponType[]
   coupon?: CouponType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
export interface DiscountStageType {
   discounts: DiscountType[]
   discount?: DiscountType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
