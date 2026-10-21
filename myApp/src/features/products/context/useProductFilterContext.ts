import { useContext } from "react";

import { ProductFilterContext } from "./ProductFilterContext";

export function useProductFilterContext() {
  const context = useContext(ProductFilterContext);

  if (!context) {
    throw new Error(
      "useProductFilterContext must be used inside ProductFilterProvider",
    );
  }

  return context;
}
