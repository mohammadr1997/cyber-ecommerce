import bannerApi from "@/apis/bannerApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteBanner(){

    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:(id:string)=>bannerApi.deleteBanner(id),
        onSuccess:(data)=>{
            console.log('banner successfully deleted',data)
            queryClient.invalidateQueries({
                queryKey:['banner']
            })
        },
        onError:(error)=>{
                console.log('banner can not be deleted',error)
        }
    })
}