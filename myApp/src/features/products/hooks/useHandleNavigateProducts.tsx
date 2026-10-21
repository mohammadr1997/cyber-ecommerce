import { useNavigate } from "react-router-dom";
export default function useHandleNavigateProducts() {
  const navigate = useNavigate();

  const handleNavigateProduct = (productId: string, categoryName: string) => {
    navigate(`/catalog/product/${productId}?category=${categoryName}`);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  return handleNavigateProduct;
}
