import { useMutation, useQueryClient } from "@tanstack/react-query";
import reviewApi from "@/apis/reviewApi";

export const useUpdateReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reviewApi.updateReview,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productReviews"],
      });
    },
  });
};
