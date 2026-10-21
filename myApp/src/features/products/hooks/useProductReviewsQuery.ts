import { useQuery } from "@tanstack/react-query";
import reviewApi from "@/apis/reviewApi";

export const useProductReviewsQuery = (productId: string) => {
  return useQuery({
    queryKey: ["productReviews", productId],

    queryFn: () => reviewApi.getProductReviews(productId),

    enabled: !!productId,
  });
};
