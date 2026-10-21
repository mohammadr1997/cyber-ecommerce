import { useQuery } from "@tanstack/react-query";

import wishlistApi from "@/apis/wishlistApi";

const useGetWishlist = () => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: wishlistApi.getWishlist,
  });
};

export default useGetWishlist;
