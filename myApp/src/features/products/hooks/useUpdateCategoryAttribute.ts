import { useMutation, useQueryClient } from "@tanstack/react-query";

import categoryAttributesApi from "@/apis/categoryAttributesApi";

interface IUpdatePayload {
  id: string;

  categoryId: string;

  data: {
    name?: string;

    key?: string;

    type?: "text" | "number" | "select" | "boolean";

    options?: string[];

    order?: number;

    status?: boolean;
  };
}

function useUpdateCategoryAttribute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: IUpdatePayload) =>
      categoryAttributesApi.updateCategoryAttribute(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["categoryAttributes", variables.categoryId],
      });
    },
  });
}

export default useUpdateCategoryAttribute;
