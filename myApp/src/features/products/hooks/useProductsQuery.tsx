import productApi from "@/apis/productsApi";
import { useQuery } from "@tanstack/react-query";

function useProductsQuery(){

    return useQuery({
        queryKey:['products'],
        queryFn:()=>productApi.getAllProducts()
    })
}

export default useProductsQuery