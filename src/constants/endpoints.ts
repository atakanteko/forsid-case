export const ENDPOINTS = {
  PRODUCT: {
    ROOT: '/products',
    UPDATE_STOCK: (productId: string) => `/products/${productId}/stock`,
  },
}
