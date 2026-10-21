import { useQuery } from "@tanstack/react-query";

import colorApi from "@/apis/colorApi";

export default function useColorsByCategoryAndBrandQuery(
  categoryId: string,
  brandId: string,
) {
  return useQuery({
    queryKey: ["colors", categoryId, brandId],

    queryFn: async () => {
      const response = await colorApi.getColorsByCategoryAndBrand(
        categoryId,
        brandId,
      );

      return response.data;
    },

    enabled: Boolean(categoryId) && Boolean(brandId),
  });
}
