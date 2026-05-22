import axios, { type InternalAxiosRequestConfig } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(new Error(error))
  },
)
export default axiosInstance
