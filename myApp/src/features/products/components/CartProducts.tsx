import { Box, Grid, Typography } from "@mui/material"
import {type ICartItem } from "@/features/cart/components/ShoppingCart"

import { useState } from "react"
import { colors } from "@/constants/colors"
import CloseIcon from "@mui/icons-material/Close";
import useRemoveFromCart from "@/features/cart/hooks/useRemoveFromCart";
interface cartProductsprops{
    imageUrl:string,
    product:ICartItem
} 

export default function CartProducts({imageUrl,product}:cartProductsprops) {
    const removeProductMutation=useRemoveFromCart()
      const maximumAvailableProduct=product?.productId?.quantity
    const [productCounter,setproductCounter]=useState<number>(1)
     const productData = product.productId;
     const handleRemove=(id:string)=>{
            removeProductMutation.mutate(id)
     }
     const handleIncrement=()=>{
      if(productCounter < maximumAvailableProduct){
        setproductCounter((prev)=>prev+1)
      }
        
        
     }
     const handleDecrement=()=>{
        if(productCounter <=1) return
        setproductCounter((prev)=>prev-1)
     }
    return <Box  sx={{display:'flex',width:'100%',position:'relative',flexDirection:{xs:'column',md:'row'},gap:{xs:'10px',md:'40px'},marginTop:{xs:'20px'},justifyContent:'space-between'}} component='aside'>
                                    <Grid sx={{display:'flex',flexDirection:'row',gap:'20px'}}>
                                       <Box
  sx={{
    width: { xs: "90px", md: "120px" },
    height: { xs: "90px", md: "120px" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  }}
>
  <Box
    component="img"
    sx={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
    }}
    src={imageUrl}
    alt={productData?.name}
  />
</Box>
                                        <Grid sx={{display:'flex',flexDirection:'column',gap:'10px'}} >
                                          <Typography sx={{fontSize:{xs:'16px',md:'20px'},fontWeight:'600',color:`${colors.charocal}`}}> {product?.productId?.name}</Typography> 
                                          <Typography sx={{fontSize:{xs:'14px',md:'18px'},fontWeight:'400',color:`${colors.textBanner}`}}>{product.colorId}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid  sx={{display:'flex',flexDirection:'row',gap:{xs:'4px',md:'80px'},justifyContent:'space-evenly',}}>
                                        <Typography onClick={handleDecrement} component='span' sx={{fontSize:{xs:'18px',md:'24px'},cursor:'pointer'}}>-</Typography>
                                        <Typography component='span' sx={{fontSize:{xs:'18px',md:'24px'}}}>{productCounter}</Typography>
                                        <Typography onClick={handleIncrement} component='span' sx={{fontSize:{xs:'18px',md:'24px'},cursor:'pointer'}}>+</Typography>
                                        <Typography sx={{color:`${colors.charocal}`,fontSize:{xs:'16px',md:'20px'},fontWeight:'600'}} component='span'>{product?.productId?.price}$</Typography>
                                       <CloseIcon onClick={()=>handleRemove(product?.productId?._id)} sx={{cursor:'pointer'}} fontSize="small" />
                                    </Grid>
                                </Box>
}
