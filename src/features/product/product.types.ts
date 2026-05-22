export interface IProduct {
  id: number
  name: string
  sku: string
  price: number
  stock_quantity: number
  is_active: boolean
  updated_at: string
}

export interface IProductMeta {
  current_page: number
  last_page: number
  total: number
}
export interface IProductResponse {
  data: IProduct[]
  meta: IProductMeta
}

export interface IProductStockUpdatePayload {
  productId: string
  stockQuantity: number
}

export interface IProductStockUpdateResponse {
  success: boolean
}
