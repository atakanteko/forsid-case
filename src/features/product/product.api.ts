import { ENDPOINTS } from '@/constants'
import { axiosInstance, createHttpRequests } from '@/http-client'
import type {
  IProductResponse,
  IProductStockUpdatePayload,
  IProductStockUpdateResponse,
} from './product.types'

const { getRequest, patchRequest } = createHttpRequests(axiosInstance)

export const getProducts = async (params: Record<string, string | string[]>) => {
  return getRequest<IProductResponse>(ENDPOINTS.PRODUCT.ROOT, params)
}

export const updateProductStock = async (payload: IProductStockUpdatePayload) => {
  return patchRequest<IProductStockUpdateResponse>(
    ENDPOINTS.PRODUCT.UPDATE_STOCK(payload.productId),
    { stock_quantity: payload.stockQuantity },
  )
}
