import { useQuery } from "@tanstack/react-query";
import colorApi from "@/apis/colorApi";

export default function useColorsQuery() {
  return useQuery({
    queryKey: ["colors"],

    queryFn: colorApi.getColors,
  });
}
