import { useQuery } from "@tanstack/react-query";
import productApi from "@/apis/productsApi";

export default function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ["search-products", query],
    queryFn: async () => {
      const response = await productApi.searchProducts(query);
      return response.data;
    },
    enabled: query.length >= 2,
    staleTime: 30_000,
  });
}
