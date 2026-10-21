import { useMutation, useQueryClient } from "@tanstack/react-query";

import categoryAttributesApi from "@/apis/categoryAttributesApi";

function useCreateCategoryAttribute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryAttributesApi.createCategoryAttribute,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["categoryAttributes", variables.categoryId],
      });
    },
  });
}

export default useCreateCategoryAttribute;
