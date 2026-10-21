import categoryApi from "@/apis/categoryApi";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
function useDeleteCategory(handleCloseConfirmModal:()=>void){
const queryClient=useQueryClient()

return useMutation({
    mutationFn:(id:string)=>categoryApi.deleteCategory(id),
    onSuccess:(data)=>{
        console.log('category successfully deleted',data)
        queryClient.invalidateQueries({
            queryKey:['categories']
        }),
        handleCloseConfirmModal()
    },
    onError:(error)=>{
        console.log('category was nopt deleted',error)
    }
})
}
export default useDeleteCategory