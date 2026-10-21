
import { useQuery } from "@tanstack/react-query";

import brandApi from "@/apis/brandApi";

export default function useBrandsQuery(
  categoryId?: string,
) {
  return useQuery({
    queryKey: ["brands", categoryId ?? "all"],

    queryFn: async () => {
      // ==========================
      // GET ALL BRANDS
      // ==========================

      if (!categoryId) {
        const response =
          await brandApi.getAllBrands();

        return response.data.data;
      }

      // ==========================
      // GET BRANDS BY CATEGORY
      // ==========================

      const response =
        await brandApi.getBrandsByCategory(
          categoryId,
        );

      return response.data.data;
    },

    enabled: true,
  });
}
