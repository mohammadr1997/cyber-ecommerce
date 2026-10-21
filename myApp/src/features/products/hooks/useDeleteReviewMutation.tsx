import { useMutation, useQueryClient } from "@tanstack/react-query";
import reviewApi from "@/apis/reviewApi";

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.deleteReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productReviews"],
      });
    },
  });
};