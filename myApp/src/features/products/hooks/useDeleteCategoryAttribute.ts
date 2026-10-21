import { useMutation, useQueryClient } from "@tanstack/react-query";

import categoryAttributesApi from "@/apis/categoryAttributesApi";

interface IDeletePayload {
  id: string;

  categoryId: string;
}

function useDeleteCategoryAttribute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: IDeletePayload) =>
      categoryAttributesApi.deleteCategoryAttribute(id),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["categoryAttributes", variables.categoryId],
      });
    },
  });
}

export default useDeleteCategoryAttribute;
