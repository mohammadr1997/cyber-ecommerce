// // import {  Paper, Stack, TextField } from "@mui/material";
// // import ProductCard from "./ProductCard";
// // import useProductsQuery from "../hooks/useProductsQuery";
// // import {  type SetURLSearchParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import useDebouncedValue from "../hooks/useDebouncedValue";
// // interface IProductListUserProp{
// //   searchParams:URLSearchParams,
// //   setSearchParams:SetURLSearchParams
// // }
// // export default function ProductListUser({searchParams,setSearchParams}:IProductListUserProp) {
// //   const [search,setSearch]=useState<string>('')
// //   const debounce=useDebouncedValue(search,500)
// //    const searchNameParams=searchParams.get('name') || ''
// //   useEffect(()=>{

// //     setSearch(searchNameParams)
// //   },[searchNameParams])
// //   useEffect(() => {
// //   setSearchParams((prevParams) => {
// //     if (debounce) {
// //       prevParams.set("name", debounce);
// //     } else {
// //       prevParams.delete("name");
// //     }

// //     return prevParams;
// //   });
// // }, [debounce, setSearchParams]);
// //   const handleChangeSearch=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>)=>{

    
// //     setSearch(event.target.value);
   

// //   }
  
// //          const {isLoading,error} =useProductsQuery()
// //          if(isLoading) return <>isLoading...</>
// //          if(error) return <>erro...</>

       
        
       
// //   return (
// // <Paper sx={{margin:'0 auto', width:'100%'}}>

// //     < >

// //                 < >
// //                    <Stack direction={'column'} spacing={2} sx={{display:'flex',flexDirection:'row',width:{xs:'100%',md:'50%',justifyContent:'center',margin:'10px auto',padding:'10px'}}}>

// //         <TextField  sx={{width:'100%',backgroundColor:'white'}}   onChange={handleChangeSearch} value={search} variant="filled" aria-label="search"></TextField>
       

// //     </Stack>
// //                         <ProductCard searchName={search} searchParams={searchParams} setSearchParams={setSearchParams} />
// //                 </>
             
// //             </>
// // </Paper>
            
    
 
//   )
// }

import { useState } from "react";
import { Box, Tabs, Tab, Grid, Typography} from "@mui/material";
import ProductCard from "./ProductCard";
import type { IProductType } from "@/apis/productsApi";
import { colors } from "@/constants/colors";
import useProductsFilterTabs from "../hooks/useProductsFilterTabs";
import Loading from "@/features/loading/loading";
import ErrorComp from "@/features/error/Error";
import { Pagination } from "@mui/material";


const TABS = [
  { label: "New Arrival", value: "New Arrival" },
  { label: "Best Seller", value: "BestSeller" },
  { label: "Featured Products", value: "Featured Product" },
];

export interface IProductImage {
  _id?: string;
  url?: string;
 
}

export interface IProduct {
  _id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  quantity: number;
  price: number;
  mainImage: string;
  images: IProductImage[];
  categoryId: string | null;
  shopId: number;
  createdAt: string;
  updatedAt: string;  
isBestSeller:boolean,
isFeatured:boolean


  
}
export default function ProductListUser() {
  const [activeTab, setActiveTab] = useState(TABS[0].value);
 const {filteredProducts,isLoading,isError}=useProductsFilterTabs(activeTab)

  // const { data, isLoading, isError } = useProductsQuery();

//   const products = data?.data?.data || [];
// console.log('check product',products)
const handleChange = (_: React.SyntheticEvent, newValue: string) => {
  setActiveTab(newValue);
  setPage(1);
};



//   return (

//     <Box sx={{ width: "100%", padding: "25px" }}>
//       {/* Tabs - top left */}
// <Tabs
//   value={activeTab}
//   onChange={handleChange}
//   sx={{
//     marginBottom: "24px",
//     "& .MuiTabs-indicator": {
//       display: "none",
//     },
//     "& .MuiTab-root": {
//       textTransform: "none",
//       fontWeight: 500,
//       fontSize: { xs: "16px", md: "18px" },
//       minWidth: "unset",
//       marginRight: { xs: "28px", md: "32px" },
//       padding: "0 0 8px 0",

//       // حالت عادی
//       color: colors.textBanner,
//       borderBottom: "3px solid transparent",

//       // حالت انتخاب شده
//       "&.Mui-selected": {
//         color: colors.charocal,
//         borderBottom: `3px solid ${colors.charocal}`,
//       },
//     },
//   }}
// >
//   {TABS.map((tab) => (
//     <Tab
//       key={tab.value}
//       label={tab.label}
//       value={tab.value}
//     />
//   ))}
// </Tabs>

     
//     {isError ? (
//   <ErrorComp
//     variant="section"
//     text="Failed to load products."
//     onRetry={() => window.location.reload()}
//   />
// ) : (
//   <Grid container spacing={2}>
//     {isLoading ? (
//       <Grid size={12}>
//         <Loading
//           variant="section"
//           text="Loading products..."
//         />
//       </Grid>
//     ) : (
//       filteredProducts.map((product) => (
//         <Grid
//           key={product._id}
//           size={{ xs: 6, sm: 4, md: 2 }}
//         >
//           <ProductCard
//             product={product as unknown as IProductType}
//           />
//         </Grid>
//       ))
//     )}
//   </Grid>
// )}

//       <Grid container spacing={2}>
//   {isLoading ? (
//     <Grid size={12}>
//       <Loading variant="section" text="Loading products..." />
//     </Grid>
//   )
//         // <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i}>
//         //   <Skeleton
//         //     variant="rectangular"
//         //     height={200}
//         //     sx={{ borderRadius: "8px" }}
//         //   />
//         //   <Skeleton width="80%" sx={{ marginTop: 1 }} />
//         //   <Skeleton width="40%" />
//         // </Grid>
      
//     :filteredProducts.map((product)=>{
//       return <ProductCard product={product as unknown as IProductType}/>
//     })}
// </Grid>

//       {!isLoading && !isError && filteredProducts.length === 0 && (
//         <Typography sx={{ textAlign: "center", padding: "40px 0" }} color="text.secondary">
//           No products found
//         </Typography>
//       )}
//     </Box>
//   );



const [page, setPage] = useState(1);

const productsPerPage = 8;
const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

const startIndex = (page - 1) * productsPerPage;
const paginatedProducts = filteredProducts.slice(
  startIndex,
  startIndex + productsPerPage
);
return (
  <Box sx={{ width: "100%", padding: "25px" ,overflow:'hidden'}}>
    <Tabs
      value={activeTab}
      onChange={handleChange}
      sx={{
        marginBottom: "24px",
        
        width:{xs:'100%',md:'100%'},
        margin:{xs:'0 auto'},
        
        justifyContent:{xs:'space-between'},
        "& .MuiTabs-indicator": {
          display: "none",
        },
        "& .MuiTab-root": {
          textTransform: "none",
          fontWeight: 500,
          fontSize: { xs: "14px", md: "18px" },
          minWidth: "unset",
          marginRight: { xs: "14px", md: "32px" },
          padding: "0 0 8px 0",
          color: colors.textBanner,
          borderBottom: "3px solid transparent",

          "&.Mui-selected": {
            color: colors.charocal,
            borderBottom: `3px solid ${colors.charocal}`,
          },
        },
      }}
    >
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          label={tab.label}
          value={tab.value}
        />
      ))}
      
    </Tabs>

    {isError ? (
      <ErrorComp
        variant="section"
        text="Failed to load products."
        onRetry={() => window.location.reload()}
      />
    ) : isLoading ? (
      <Loading
        variant="section"
        text="Loading products..."
      />
    ) : filteredProducts.length === 0 ? (
      <Typography
        sx={{
          textAlign: "center",
          padding: "40px 0",
        }}
        color="text.secondary"
      >
        No products found
      </Typography>
    ) : (
      <>
         <Grid container spacing={4} sx={{ marginTop: "48px" }}>
  {paginatedProducts.map((product) => (
  <Grid
    key={product._id}
    size={{ xs: 12, sm: 4, md: 3 }}
  >
    <ProductCard
      product={product as unknown as IProductType}
    />
  </Grid>
))}
    </Grid>
     {Math.ceil(filteredProducts.length / 8) > 1 && (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 5,
          mb: 3,
        }}
      >
        <Pagination
         count={pageCount}
      page={page}
      onChange={(_, value) => setPage(value)}
      color="standard"
      shape="rounded"
        />
      </Box>
    )}</>
      // <Grid container spacing={4} sx={{marginTop:'48px'}}>
      //   {filteredProducts.map((product) => (
      //     <Grid
          
      //       key={product._id}
      //       size={{ xs: 12, sm: 4, md: 3 }}
      //     >
      //       <ProductCard
      //         product={product as unknown as IProductType}
      //       />
      //     </Grid>
      //   ))}
      // </Grid>
    )}
  </Box>
)

}
