import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { buildQueryString } from '@/shared/helpers'

export const createHttpRequests = (clientApi: AxiosInstance) => {
  const getRequest = async <T, A = Record<string, string | string[]>>(
    url: string,
    params?: A,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    if (params) {
      url += buildQueryString(params)
    }

    return await clientApi
      .get(url, config)
      .then((response: AxiosResponse<T>) => response.data)
      .catch((error) => {
        return Promise.reject(error.response)
      })
  }

  const postRequest = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return await clientApi
      .post(url, data, config)
      .then((response: AxiosResponse<T>) => {
        return response.data
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  }

  const patchRequest = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return await clientApi
      .patch(url, data, config)
      .then((response: AxiosResponse<T>) => {
        return response.data
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  }

  const putRequest = async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    return await clientApi
      .put(url, data, config)
      .then((response: AxiosResponse<T>) => {
        return response.data
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  }

  const deleteRequest = async <T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    if (params) {
      url += buildQueryString(params)
    }

    return await clientApi
      .delete(url, config)
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  }

  const headRequest = async <T>(
    url: string,
    params?: Record<string, string>,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    if (params) {
      url += buildQueryString(params)
    }

    return await clientApi
      .head(url, config)
      .then((response: AxiosResponse<T>) => {
        return response.data
      })
      .catch((error) => {
        return Promise.reject(error.response)
      })
  }

  return {
    getRequest,
    postRequest,
    deleteRequest,
    patchRequest,
    putRequest,
    headRequest,
  }
}
