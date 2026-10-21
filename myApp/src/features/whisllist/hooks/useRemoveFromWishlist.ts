
import { useMutation, useQueryClient } from "@tanstack/react-query";

import wishlistApi from "@/apis/wishlistApi";

const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) =>
      wishlistApi.removeFromWishlist(productId),

    onSuccess: (data) => {
      console.log("product successfully removed from wishlist", data);

      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error) => {
      console.log("product not deleted from wishlist", error.message);
    },
  });
};

export default useRemoveFromWishlist;
