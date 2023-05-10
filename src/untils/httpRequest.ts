import axios from 'axios'

import { base_url } from './base_url'

interface User {
   token: string
}
const requests = axios.create({
   baseURL: base_url,
   headers: {
      'Content-Type': 'application/json',
   },
})

requests.interceptors.request.use(
   function (config) {
      const user: string | null = localStorage.getItem('USER')
      if (user) {
         const userObj: User = JSON.parse(user)
         const token = userObj.token
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   function (error) {
      return Promise.reject(error)
   },
)
export const get = async (path: string, config?: any) => {
   const response = await requests.get(path, config)
   return response.data
}

export const post = async (path: string, data?: any, config?: any) => {
   const response = await requests.post(path, data, config)
   return response.data
}
export const Delete = async (path: string, config?: any) => {
   const response = await requests.delete(path, config)
   return response.data
}
export const put = async (path: string, data?: any, config?: any) => {
   const response = await requests.put(path, data, config)
   return response.data
}
export default requests
