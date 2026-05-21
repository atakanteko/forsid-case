export interface IProduct {
    id: number
    name: string
    sku: string
    price: number
    stock_quantity: number
    is_active: boolean
    updated_at: string
}

export interface IProductResponse {
    data: IProduct[]
    meta: {
        current_page: number
        last_page: number
        total: number
    }
}