import bannerApi from "@/apis/bannerApi";
import {  useQuery } from "@tanstack/react-query";


export default function useGetBanner(){

    return useQuery({
        queryKey:['get banner'],
        queryFn:()=>bannerApi.getBanners()
    })
}