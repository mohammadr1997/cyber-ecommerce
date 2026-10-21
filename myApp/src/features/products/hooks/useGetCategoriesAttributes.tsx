import categoryAttributeApi from "@/apis/categoryAttributeApi";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategoriesAttributes(categoryId?: string) {
    return useQuery({
        queryKey: ['categoriesAttributes', categoryId],
        queryFn: () => categoryAttributeApi.getCategoryAttributes(categoryId),
    })
}