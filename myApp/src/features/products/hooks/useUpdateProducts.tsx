import {useMutation} from '@tanstack/react-query'
import productApi from '@/apis/productsApi'
import { useQueryClient } from '@tanstack/react-query'
function useUpdateProducts(handleClose:()=>void){
const queryClient = useQueryClient();
return useMutation({
    mutationFn:({id,formData}:{id:string,formData:FormData})=>{ return productApi.updateProduct(id,formData)},
    onSuccess:(data)=>{
        console.log('product updated successfully',data);
        queryClient.invalidateQueries({ queryKey: ['products'] });
        handleClose()
    },
   onError: (error: any) => {
  console.log("STATUS:", error.response?.status);
  console.log("SERVER ERROR:", error.response?.data);
  console.log("FULL ERROR:", error);
}
})
}

export default useUpdateProducts