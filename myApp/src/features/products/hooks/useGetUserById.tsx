import { useQuery } from "@tanstack/react-query";
import userApi from "@/apis/userApi";

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],

    queryFn: () => userApi.getUserById(id),

    enabled: !!id,
  });
};