
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import bannerApi from "@/apis/bannerApi";

interface IUpdateBannerInput {
  id: string;
  updates: {
    title?: string;
    type?: "banner" | "small";
    description?: string;
    isActive?: boolean;
    image?: File;
  };
}

export default function useUpdateBanner(onSuccessCallback?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: IUpdateBannerInput) =>
      bannerApi.updateBanner(id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      onSuccessCallback?.();
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.error("UPDATE BANNER STATUS:", error.response?.status);
        console.error("UPDATE BANNER RESPONSE:", error.response?.data);
        console.error("UPDATE BANNER URL:", error.config?.url);
        console.error("UPDATE BANNER MESSAGE:", error.message);
      } else {
        console.error("UPDATE BANNER ERROR:", error);
      }
    },
  });
}
