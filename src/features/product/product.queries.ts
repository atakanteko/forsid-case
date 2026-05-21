import { useQuery } from "@tanstack/vue-query";
import type { IProductResponse } from "./product.types";
import { getProducts } from "./product.api";

export function useProducts() {
    return useQuery<IProductResponse>({
      queryKey: ["products"],
      queryFn: getProducts,
    })
  }
    