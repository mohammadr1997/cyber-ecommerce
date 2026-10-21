import productApi from "@/apis/productsApi"
import { useMutation } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { showToast } from "@/redux/toast/toastSlice";
import { useDispatch } from "react-redux";
interface IDeleteImageGallery{
    productId:string,
    imageId:string
}
const useDeleteImageGallery=(productId:string)=>{
    const dispatch=useDispatch()
    const queryClient=useQueryClient();
return useMutation({
    mutationFn:({productId,imageId}:IDeleteImageGallery)=>productApi.deleteProductImage(productId,imageId),
    onSuccess:(data)=>{
        console.log('images successfully deleted',data)
        queryClient.invalidateQueries({
            queryKey:['productId',productId]
        })
        dispatch(showToast({message:data.data.message,type:'success'}))
    },
    onError:(error)=>{
        console.log('error while deleting images in galllery',error.message)
    }
})
}


export default useDeleteImageGallery