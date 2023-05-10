export interface UserType {
   _id?: string
   fist_name?: string
   last_name?: string
   role?: string
   email?: string
   cart?: string[]
   mobile?: string
   wishlist?: string[]
   isBlocked?: boolean
   token?: string
}

export interface UserStageType {
   user: UserType[]
   order?: []
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
   message: any
}
