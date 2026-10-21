import productApi from "@/apis/productsApi";
import { useQuery } from "@tanstack/react-query";

function useGetProductPaginationQuery(page:number,name:string){
    return useQuery({
        queryKey:['products',page,name],
        queryFn:()=>productApi.getProductsPaginated(page,name)
    })
}

export default useGetProductPaginationQuery