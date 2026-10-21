import { useMutation } from "@tanstack/react-query";
import cartApi from "@/apis/cartApi";
import { useQueryClient } from "@tanstack/react-query";
const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => cartApi.removeFromCart(productId),
    onSuccess: (data) => {
      console.log("product successfully removed from cart", data);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      console.log("product not deleted from cart", error.message);
    },
  });
};

export default useRemoveFromCart;
