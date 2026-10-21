import FilterUser from "../components/FilterUser";

import { useProductFilterContext } from "../context/useProductFilterContext";

export default function FilterUserPage() {
  const {
    products: filteredProducts,
  } = useProductFilterContext();

  return (
    <FilterUser
      filteredProducts={filteredProducts}
      filteredproducts={filteredProducts}
    />
  );
}