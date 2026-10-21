

import { useNavigate } from "react-router-dom";

export default function useHandleNavigateCategory() {
  const navigate = useNavigate();

  const handleNavigateCategory = (categoryName: string) => {
    // const trimCategoryName = categoryName
    //   .trim()
    //   .replace(/\s+/g, "")
    //   .toLowerCase();

    navigate(`/catalog/?category=${categoryName}`);
  };

  return handleNavigateCategory;
}