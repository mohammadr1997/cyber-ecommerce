import { RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, Stack, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import type { IProductType } from "@/apis/productsApi";
interface IProductInfoProp{
    product:IProductType,
    setQuantity:(quantity:number)=>void,
    quantity:number,
    handleAddToCart:(productId:string,quantity:number)=>void
}

export default function ProductInfo({product,quantity,setQuantity,handleAddToCart}:IProductInfoProp) {
    const handleDecrement=()=>{
        if(quantity <=1) {
                setQuantity(1)
            return
        }
        setQuantity(quantity-1)
    }
  return (
     <Box sx={{alignItems:'center',margin:'auto auto'}}>

            <Typography variant="h4">
                {product.name}
                </Typography>
                  <Rating name="read-only" value={4} readOnly />
                   <Typography sx={{fontWeight:'bold'}} variant="h6">
                    {product.price}                </Typography>
                <p style={{fontSize:'18px',padding:'8px'}}>
                    {product.longDescription}        </p>
                <Stack direction={{xs:'column',md:'row'}} >
                    <Stack sx={{marginTop:'5px'}} direction={'row'}>
                         <IconButton onClick={handleDecrement}><RemoveCircleOutlineOutlined/></IconButton>
                <TextField value={quantity} sx={{width:{xs:'190px',margin:'0 auto'}}} type="text"></TextField>
                <IconButton onClick={()=>setQuantity(quantity+1)} ><AddIcon/></IconButton>

                    </Stack>
                    <Stack sx={{marginTop:'15px'}}>
                         <Button sx={{width:{xs:'100%',md:'230px'}}} variant="contained" color="warning" onClick={()=>handleAddToCart(product._id || '6a81a7a40a7d2ae3abf30211',quantity)}>Add To Cart</Button>
                    </Stack>
                                  
                </Stack>
                

        </Box>
  )
}
