import { useQuery } from "@tanstack/react-query";
import userApi from "@/apis/userApi";

// =====================================================
// GET USERS QUERY
// =====================================================

const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],

    queryFn: () => userApi.getAllUsers(),
  });
};

export default useUsersQuery;