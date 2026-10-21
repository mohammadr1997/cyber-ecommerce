import { useMutation, useQueryClient } from "@tanstack/react-query";
import bannerApi from "@/apis/bannerApi"; 

interface ICreateBannerInput {
  title: string;
  type: "banner" | "small";
  image: File;
  description?: string;
}

export default function useCreateBanner(handleClose :() => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ title, type, image, description }: ICreateBannerInput) =>
      bannerApi.addBanner(title, type, image, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      handleClose();
      console.log('banner added in backend')
    },
    onError: (error) => {
      console.error("Failed to create banner:", error);
    },
  });
}