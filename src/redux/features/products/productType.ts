interface RatingType {
   star: number
   comment: string
   postedBy: string
}
interface ImgType {
   url: string
}

interface ColorType {
   _id: string
   title: string
}

interface DiscountType {
   _id: string
   name: string
   expiry: string
   percentage: number
}

export interface ProductType {
   _id: string
   title: string
   totalRating: number
   slug: string
   ratings: RatingType[]
   sold: number
   discountCode?: DiscountType
   price_after_discount: number
   tags: string
   images: ImgType[]
   description: string
   price: number
   quantity: number
   category: string
   brand: string
   color: ColorType[]
}

export interface ProductStageType {
   productList: Omit<ProductType[], 'color'>
   product: ProductType
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}
