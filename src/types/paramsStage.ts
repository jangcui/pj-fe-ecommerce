export interface ParamsType {
   page?: number
   limit?: number
   brand?: string
   tag?: string
   minPrice?: number | undefined
   maxPrice?: number | undefined
   category?: string
   sort?: string
   fields?: boolean
}
