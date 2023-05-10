export interface CouponType {
   _id?: string
   name?: string | number
   expiry?: string | Date
   __v?: number
   discount?: number
}

export interface CouponStageType {
   coupons: CouponType[]
   coupon?: CouponType
   couponCreate: object
   couponDelete: object
   couponUpdate: object
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: string
}
