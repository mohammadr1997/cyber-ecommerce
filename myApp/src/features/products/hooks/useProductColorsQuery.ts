import { useQuery } from "@tanstack/react-query";
// @ts-expect-error Preserve this currently unreferenced hook's existing import.
import productColorApi from "@/apis/productColorApi";

export default function useProductColorsQuery(
  categoryId?: string,
  brandId?: string,
) {
  return useQuery({
    queryKey: ["product-colors", categoryId, brandId],

    queryFn: () => {
      return productColorApi.getColorsByCategoryAndBrand(categoryId!, brandId!);
    },

    enabled: Boolean(categoryId) && Boolean(brandId),
  });
}
