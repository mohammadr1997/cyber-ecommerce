import { useCallback } from "react";
import useProductsQuery from "./useProductsQuery";

import type { IProductType } from "@/apis/productsApi";

export default function useGetproductByCategory() {
  const { data, isLoading, isError } = useProductsQuery();

  const getproductsByFilterCategory = useCallback(
    (categoryName: string) => {
      if (isLoading || isError) {
        return [];
      }

      const filteredByCategory = data?.data.data.filter(
        (product: IProductType) =>
          product.categoryId.name
            .toLowerCase()
            .includes(categoryName.toLowerCase()),
      );

      return filteredByCategory ?? [];
    },
    [data, isLoading, isError],
  );

  return getproductsByFilterCategory;
}