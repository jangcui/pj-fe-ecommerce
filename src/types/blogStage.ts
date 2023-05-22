import { ImgType } from './imageStage'

export interface BlogType {
   _id?: string
   title?: string
   description?: string
   numViews?: string
   category?: string
   author?: string
   role?: string
   images?: ImgType[]
   likes?: string[]
   dislikes?: string[]
   __v?: string
   isLiked?: boolean
   isDisLiked?: boolean
   updatedAt?: Date | any
   createdAt?: Date | any
   deleteDate?: Date | any
}

export interface BlogStageType {
   blogs: BlogType[]
   blog: BlogType
   blogCreate: BlogType
   blogUpdate: BlogType
   blogDelete: BlogType
   isError?: boolean
   isLoading?: boolean
   isSuccess?: boolean
   message?: string
}
