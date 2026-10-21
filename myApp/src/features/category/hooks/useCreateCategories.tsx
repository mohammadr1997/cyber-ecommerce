import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import categoryApi from "@/apis/categoryApi";
interface ICreateCategoryType{
    name:string,
    icon:string,
    status?:boolean
}
function useCreateCategories(){
const queryClient=useQueryClient();
return useMutation({
    mutationFn:(data:ICreateCategoryType)=>categoryApi.addCategory(data),
    onSuccess:(data)=>{
           console.log('category successfully created',data)
           queryClient.invalidateQueries({
            queryKey:['categories']
           }) 
    },
    onError:(error)=>{
        console.log('check error',error)
    }
})

}

export default useCreateCategories