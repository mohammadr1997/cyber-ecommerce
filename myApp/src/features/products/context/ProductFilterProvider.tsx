import {
  type ReactNode,
} from "react";

import type { IProductType } from "@/apis/productsApi.ts";

import {
  useProductFilters,
} from "@/features/products/hooks/useProductFilters";

import {
  ProductFilterContext,
} from "./ProductFilterContext";

interface IProductFilterProvider {
  products: IProductType[];
  isLoading:boolean;
  children: ReactNode;
}

export function ProductFilterProvider({
  products,
  children,
  isLoading
}: IProductFilterProvider) {
  const filters = useProductFilters(products);

  return (
    <ProductFilterContext.Provider
      value={{
        products,
        isLoading,
        ...filters,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  );
}