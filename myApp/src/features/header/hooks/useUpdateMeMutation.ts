import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import userApi from "@/apis/userApi";

type UpdateMePayload = {
  firstName: string;
  lastName: string;
  email: string;
};

export default function useUpdateMeMutation(onClose: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateMePayload) => {
      const response = await userApi.updateMe(data);
      return response.data;
    },

    onSuccess: async () => {
      onClose();
      await queryClient.invalidateQueries({
        queryKey: ["user registered"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["user registered"],
      });
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        console.error("STATUS:", error.response?.status);
        console.error("SERVER ERROR:", error.response?.data);
      } else {
        console.error("UPDATE PROFILE ERROR:", error);
      }
    },
  });
}
