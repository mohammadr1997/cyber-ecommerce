import { useMutation, useQueryClient } from "@tanstack/react-query";
import productApi from "@/apis/productsApi";

export default function useDeleteProduct(
  handleCloseConfirmModal: () => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id),

    onSuccess: (data) => {
      console.log("Product was deleted successfully", data);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      handleCloseConfirmModal();
    },

    onError: (error) => {
      console.log("Product cannot be deleted", error.message);
    },
  });
}
