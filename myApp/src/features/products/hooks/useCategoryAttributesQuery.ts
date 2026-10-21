import { useQuery } from "@tanstack/react-query";

import categoryAttributesApi from "@/apis/categoryAttributesApi";

function useCategoryAttributesQuery(categoryId?: string) {
  return useQuery({
    queryKey: ["categoryAttributes", categoryId],

    queryFn: () => categoryAttributesApi.getCategoryAttributes(categoryId),

    enabled: !!categoryId,
  });
}

export default useCategoryAttributesQuery;
