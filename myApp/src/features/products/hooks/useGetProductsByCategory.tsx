
import { useCallback } from "react";
import useProductsQuery from "@/features/products/hooks/useProductsQuery";
import type { IProductType } from "@/apis/productsApi.ts";

export default function useGetproductByCategory() {
  const { data, isLoading, isError } = useProductsQuery();

  const getproductsByFilterCategory = useCallback(
    (categoryName: string): IProductType[] => {
      if (isLoading || isError) {
        return [];
      }

      const filteredByCategory = data?.data.data.filter(
        (product: IProductType) =>
          product.categoryId.name.toLowerCase() ===
          categoryName.toLowerCase(),
      );

      return filteredByCategory ?? [];
    },
    [data, isLoading, isError],
  );

  return {
    getproductsByFilterCategory,
    isLoading,
    isError,
  };
}
