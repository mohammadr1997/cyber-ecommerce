import wishlistApi from "@/apis/wishlistApi";
import { type IAddToWishlistPayload } from "@/apis/wishlistApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAddToWishlistPayload) =>
      wishlistApi.addToWishlist(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },
  });
};

export default useAddToWishlist;
