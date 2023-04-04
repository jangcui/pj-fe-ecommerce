import * as httpRequest from '~/untils/httpRequest'

export const getAllProducts = async ({ page, limit }: { page: number; limit: number }) => {
   try {
      const res = await httpRequest.get('product', {
         params: {
            page,
            limit,
         },
      })
      return res
   } catch (error) {
      console.log('error')
   }
}
