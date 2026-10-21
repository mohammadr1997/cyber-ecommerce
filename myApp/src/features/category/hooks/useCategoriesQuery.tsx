import { useQuery } from "@tanstack/react-query";
import categoryApi from "@/apis/categoryApi";

export interface ICategoryType{
    name:string,
    icon:string,
    status:boolean,
    _id:string
}
export default function useCategoriesQuery(){
  return useQuery({
  queryKey:['categories'],
  queryFn:categoryApi.getAllCategories
 })

 

}