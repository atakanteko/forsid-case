import { ENDPOINTS } from "@/constants"
import { axiosInstance, createHttpRequests } from "@/http-client"
import type { IProductResponse } from "./product.types"

const { getRequest} = createHttpRequests(axiosInstance)

export const getProducts = async () => {
  return getRequest<IProductResponse>(ENDPOINTS.PRODUCT.ROOT)
}
