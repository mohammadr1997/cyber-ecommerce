import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import userApi from "@/apis/userApi";

// =====================================================
// DELETE USER MUTATION
// =====================================================

const useDeleteUserMutationUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
   

    mutationFn: (id: string) => {
      return userApi.deleteUser(id);
    },

    

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },



    onError: (error) => {
      console.error(
        "Delete user error:",
        error,
      );
    },
  });
};

export default useDeleteUserMutationUser;