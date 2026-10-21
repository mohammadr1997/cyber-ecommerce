import productApi from "@/apis/productsApi"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"

const useAddImageGallery=(productId:string)=>{
    const queryClient=useQueryClient();
return useMutation({
    mutationFn:({id,data}:{id:string,data:FormData})=>productApi.addProductImages(id,data),
    onSuccess:(data)=>{
        console.log('images successfully added',data)
        queryClient.invalidateQueries({
            queryKey:['productId',productId]
        })
    },
    onError:(error)=>{
        console.log('error while adding images in galllery',error.message)
    }
})
}


export default useAddImageGallery