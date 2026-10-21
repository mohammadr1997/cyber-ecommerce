import useProductsQuery from "../hooks/useProductsQuery";
import type { IProduct } from "../components/ProductListUser";
export default function useProductsFilterTabs(activeTab:string){
  
const {data,isLoading,isError}=useProductsQuery();
  const products: IProduct[] | []= data?.data?.data ?? [];

  let filteredProducts = products;
if(activeTab=='BestSeller' && data ){
console.log('best seller')
  filteredProducts=data?.data.data.filter((product:IProduct)=>product.isBestSeller===true) 
 
  return {filteredProducts,isLoading,isError}
}else if(activeTab=='Featured Product' && data){
   console.log('feautere dprodutc')
      filteredProducts=data?.data.data.filter((product:IProduct)=>product.isFeatured===true) || []
    return {filteredProducts,isLoading,isError}
}
 else if (activeTab === "New Arrival") {
    const thirtyDaysAgo = new Date();

    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    filteredProducts = products.filter((product: IProduct) => {
      return new Date(product.createdAt) >= thirtyDaysAgo;
    });
  }

return {filteredProducts,isLoading,isError}

}