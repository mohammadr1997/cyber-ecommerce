import { authApi } from "@/apis/authApi";
import { useQuery } from "@tanstack/react-query";
export const useGetMeQuery = () => {
    const token=localStorage.getItem('token')
  return useQuery({
    queryKey: ["user registered"],
    queryFn: () => authApi.getMe(),
    enabled:!!token,
    retry:1
  });
};
