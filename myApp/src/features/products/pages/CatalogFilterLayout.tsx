
import { Outlet, useSearchParams } from "react-router-dom";

import useGetproductByCategory from "@/features/products/hooks/useGetProductsByCategory.tsx";

import { ProductFilterProvider } from "@/features/products/context/ProductFilterProvider.tsx";

export default function CatalogFilterLayout() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "";

  const {
    getproductsByFilterCategory,
    isLoading,
  } = useGetproductByCategory();

  const filteredproducts = getproductsByFilterCategory(category);

  return (
    <ProductFilterProvider
      isLoading={isLoading}
      products={filteredproducts}
    >
      <Outlet />
    </ProductFilterProvider>
  );
}
