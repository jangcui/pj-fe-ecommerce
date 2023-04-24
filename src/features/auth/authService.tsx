import axios from 'axios'
import { base_url } from '~/untils/base_url'

const request = axios.create({
   baseURL: base_url,
   headers: {
      'Content-Type': 'application/json',
   },
})
request.interceptors.request.use(
   function (config) {
      const token = localStorage.getItem('TOKEN')
      if (token) {
         config.headers.Authorization = `Bearer ${token.slice(1, token.length - 1)}`
      }
      return config
   },
   function (error) {
      return Promise.reject(error)
   },
)
type TypeUserData = {
   email: string
   password: string | number
}

export const login = async (userData: TypeUserData) => {
   const res = await request.post('user/login', userData)
   // localStorage.setItem('USER', JSON.stringify(res))
   // localStorage.setItem('TOKEN', JSON.stringify(res.token))
   console.log(res)
   return res.data
}

const authService = {
   login,
}
export default authService
