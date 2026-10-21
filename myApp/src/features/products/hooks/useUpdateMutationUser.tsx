import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import userApi from "@/apis/userApi";

import type { IUpdateUser } from "@/apis/userApi";



const useUpdateMutationUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateUser;
    }) => {
      return userApi.updateUser(id, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },

    onError: (error) => {
      console.error(
        "Update user error:",
        error,
      );
    },
  });
};

export default useUpdateMutationUser;