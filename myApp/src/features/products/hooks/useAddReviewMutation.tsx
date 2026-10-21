import { useMutation, useQueryClient } from "@tanstack/react-query";
import reviewApi from "@/apis/reviewApi";

export const useAddReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.addReview,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["productReviews", variables.productId],
      });
      
    },
      onError: (error: any) => {
      console.error("ADD REVIEW ERROR:", error.response?.data ?? error);
    },
  });
};