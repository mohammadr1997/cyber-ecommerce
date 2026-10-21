import { useQuery } from "@tanstack/react-query";
import cartApi from "@/apis/cartApi";

const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
  });
};

export default useGetCart;
