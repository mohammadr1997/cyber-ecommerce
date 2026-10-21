import {  useMutation } from "@tanstack/react-query";
import productApi from "@/apis/productsApi";

import { useQueryClient } from "@tanstack/react-query";


export default function  useCreateProducts(handleClose:()=>void){
    const queryClient=useQueryClient()
return useMutation({
    mutationFn:(data:FormData)=>productApi.createProduct(data),
    onSuccess:(data)=>{
        console.log('produc has been created successfully',data)
        queryClient.invalidateQueries({
            queryKey:['products']
        })
        handleClose()
    },
   onError: (error: any) => {
  console.log("CREATE PRODUCT ERROR:", error);
  console.log("STATUS:", error.response?.status);
  console.log("SERVER RESPONSE:", error.response?.data);
}
})
}