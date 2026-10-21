import { useMutation } from "@tanstack/react-query";
import categoryApi from "@/apis/categoryApi";
import type { ICategoryType } from "./useCategoriesQuery";
import { useQueryClient } from "@tanstack/react-query";

export default function useCategoriesUpdate(handleClose:()=>void){
    const queryClient=useQueryClient()
return useMutation({
    mutationFn:(data:ICategoryType)=>categoryApi.updateCategory(data._id,data),
    onSuccess:(data)=>{
      
        console.log('category successfully updated',data)
        queryClient.invalidateQueries({
            queryKey:['categories']
        })
        handleClose()
    },
    onError:(error)=>{
console.log('category was not updated ',error)
    }
})
}