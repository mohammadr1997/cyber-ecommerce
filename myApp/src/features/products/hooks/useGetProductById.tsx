
import productApi from '@/apis/productsApi'
import { useQuery } from '@tanstack/react-query'
function useGetProductById(productId: string | undefined) {
return useQuery({
    queryKey: ['productId',productId],
    queryFn: () => {
            if (!productId) {
        throw new Error('Product ID is required');
      }
      return  productApi.getProductById(productId)},
    enabled: !!productId,
})

}


export default useGetProductById