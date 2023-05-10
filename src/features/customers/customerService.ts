import { UserType } from '~/types/userStage'
import httpRequest from '~/untils/httpRequest'

export const getUser = async () => {
   const res = await httpRequest.get<UserType[]>('user')
   if (res) {
      return res.data
   } else {
      console.log('error')
   }
}

const customerService = {
   getUser,
}
export default customerService
