import cartApi from "@/apis/cartApi";
import { type IAddToCartPayload } from "@/apis/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IAddToCartPayload) => cartApi.addToCart(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useAddToCart;
