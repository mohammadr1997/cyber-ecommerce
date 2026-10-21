
import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import useGetCart from "@/features/cart/hooks/useGetCart";
import { colors} from "@/constants/colors";
import CartProducts from "@/features/products/components/CartProducts";
import { getProductImageUrl } from "@/constants/api";
import Loading from "@/features/loading/loading";
import ErrorComp from "@/features/error/Error";
import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
export interface ICartProductAttribute {
  key: string;
  value: string | number | boolean;
}

export interface ICartProductImage {
  url: string;
  colorId: string;
  _id?: string;
}
export interface ICartProduct {
  _id: string;

  name: string;
  shortDescription: string;
  longDescription: string;

  price: number;
  quantity: number;

  brand: string;
  categoryId: string;
  shopId: number;

  colors: string[];

  mainImage: string;
  mainImageColorId: string;

  images: ICartProductImage[];

  attributes: ICartProductAttribute[];

  isBestSeller: boolean;
  isFeatured: boolean;

  createdAt: string;
  updatedAt: string;

  __v: number;
}
export interface ICartItem {
  _id?: string;

  productId: ICartProduct;

  colorId: string;

  quantity?: number;
}
const Estimated_Tax=50
const Estimated_Shipping_handling=29
export default function ShoppingCart() {
  const navigate=useNavigate()
    const token=localStorage.getItem('token')
    useEffect(()=>{
      if(!token){
        navigate('/sign-in')
      }
    },[token])
const {
  data: shoppingCartProducts,
  isLoading,
  isError,
} = useGetCart();

if (isLoading) {
  return (
    <Loading
      variant="section"
      text="Loading cart..."
    />
  );
}

if (isError) {
  return (
    <ErrorComp
      variant="section"
      text="Failed to load your shopping cart."
      onRetry={() => window.location.reload()}
    />
  );
}

if (!shoppingCartProducts) return null;
const productInCart=shoppingCartProducts.data.data.items as ICartItem[]
if (productInCart.length === 0) {
  return (
    <Box
      component="main"
      sx={{
        padding: { xs: "12px", md: "160px 112px" },
        marginBottom: { xs: "40px" },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "18px", md: "32px" },
          fontWeight: 600,
          marginTop: { xs: "40px", md: 0 },
          marginBottom: "32px",
          color: colors.charocal,
        }}
      >
        Shopping Cart{" "}
        <Typography
          component="span"
          sx={{
            fontSize: { xs: "12px", md: "18px" },
            fontWeight: 400,
            color: colors.textBanner,
          }}
        >
          (0 items)
        </Typography>
      </Typography>

      <Box
        sx={{
          border: "1px dashed #d0d0d0",
          borderRadius: "16px",
          minHeight: { xs: "320px", md: "450px" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "16px",
          padding: "24px",
        }}
      >
        <ShoppingCartOutlinedIcon
          sx={{ fontSize: { xs: 48, md: 64 }, color: "#b5b5b5" }}
        />

        <Typography
          sx={{
            fontSize: { xs: "18px", md: "24px" },
            fontWeight: 600,
            color: colors.charocal,
          }}
        >
          Your cart is empty
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: "14px", md: "18px" },
            color: colors.textBanner,
            maxWidth: "320px",
          }}
        >
          Add the products you love and they will show up here
        </Typography>

        <Button
          onClick={() => navigate("/")}
          sx={{
            marginTop: "8px",
            backgroundColor: colors.charocal,
            color: colors.backgroundCategory,
            borderRadius: "7px",
            padding: "12px 32px",
            fontSize: { xs: "14px", md: "16px" },
            fontWeight: 500,
            textTransform: "none",
            "&:hover": { backgroundColor: colors.charocal, opacity: 0.9 },
          }}
        >
          Continue shopping
        </Button>
      </Box>
    </Box>
  );
}
const subTotal = productInCart.reduce(
  (total, product) => total + product?.productId?.price,
  0
);
const total=subTotal+Estimated_Shipping_handling+Estimated_Tax
  return (
   <Box sx={{display:'flex',gap:'48px',flexDirection:{xs:'column',md:'row'},padding:{xs: "12px",
            md: "160px 112px"},marginBottom:{xs:'40px'}}} component='main'>
                 <Grid sx={{display:'flex',flexDirection:'column',padding:'0',
    overflow: 'hidden',
    flex: 1,
    minWidth: 0,}}>
                    <Typography sx={{fontSize:{xs:'18px',md:'24px'},fontWeight:'600',marginTop:{xs:'40px',md:'-0px'},marginBottom:'40px',color:`${colors.charocal}`,paddingLeft:{xs:'0',md:'12px'}}} variant="h4">Shopping Cart</Typography>
                    <Box component='section' sx={{width:{xs:'100%',md:'100%'},boxSizing:'border-box', scrollbarGutter: 'stable',height:{md:'550px'},overflow:'auto',padding:'25px',display:'flex',flexDirection:{xs:'column',md:'column'},gap:{xs:'60px',md:'40px '},  direction: 'rtl',

    '& > *': {
      direction: 'ltr',
    },  }}>
                           {productInCart && productInCart.map((product:ICartItem)=>{
                            const productData = product?.productId;

 let imageUrl = getProductImageUrl(productData?.mainImage);

if (productData?.colors.length > 1) {
  const selectedImage = productData.images.find(
    (image) => image.colorId === product.colorId
  );

  if (selectedImage) {
    imageUrl = getProductImageUrl(selectedImage.url);
  }
}
                                return <CartProducts imageUrl={imageUrl} product={product}/>
                           })}
                    </Box>
                    </Grid>   
                 <Grid component='aside' sx={{display:'flex',padding:{xs:'24px',md:'32px'},flexDirection:'column',gap:{xs:'16px',md:'8px',border:`1px solid ${colors.charocal}`,borderRadius:'7px'}}}>
                  <Grid>
                    <Typography  sx={{fontSize:{xs:'18px',md:'24px'},fontWeight:'600',marginTop:{xs:'0px',md:'-0px'},marginBottom:'40px',color:`${colors.charocal}`,paddingLeft:'0px'}}>Order of Summary</Typography>
                  </Grid>
                  
                  <Grid sx={{display:'flex',flexDirection:'column',gap:'14px'}}>
                    <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.textBanner}`}} component='span'>Discount code/ Promo code</Typography>
                   <TextField
  type="text"
  placeholder="code"
  variant="outlined"
  sx={{
    "& .MuiOutlinedInput-root": {
      padding: "8px 12px",
      borderRadius: "7px",

      "& fieldset": {
        border: `1px solid ${colors.textBanner}`,
      },

      "&:hover fieldset": {
        border: `1px solid ${colors.textBanner}`,
      },

      "&.Mui-focused fieldset": {
        border: `1px solid ${colors.textBanner}`,
      },
    },

    "& .MuiInputBase-input": {
      padding: "8px 0",
    },
  }}
/>
                  </Grid>
                    <Grid sx={{display:'flex',flexDirection:'column',gap:'14px'}}>
                    <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.textBanner}`}} component='span'>Your Bonus Card Number</Typography>
  <TextField
  type="text"
  placeholder="Enter Card Number"
  variant="outlined"
  sx={{
    "& .MuiOutlinedInput-root": {
      padding: "8px 12px",
      borderRadius: "7px",

      "& fieldset": {
        border: `1px solid ${colors.textBanner}`,
      },

      "&:hover fieldset": {
        border: `1px solid ${colors.textBanner}`,
      },

      "&.Mui-focused fieldset": {
        border: `1px solid ${colors.textBanner}`,
      },
    },

    "& .MuiInputBase-input": {
      padding: "8px 0",
    },
  }}
  slotProps={{
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <Button
            variant="outlined"
            sx={{
              border: `1px solid ${colors.charocal}`,
              borderRadius: "6px",
              padding: "5px 14px",
              minWidth: "auto",
              textTransform: "none",
              color: colors.textBanner,
            }}
          >
            Apply
          </Button>
        </InputAdornment>
      ),
    },
  }}
/>
                  </Grid>
             
             <Grid sx={{display:'flex',flexDirection:'column',justifyContent:'center',gap:'12px',marginTop:'18px'}}>
              <Grid sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.charocal}`,fontWeight:'600'}} component='span'>Subtotal</Typography>
                <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.charocal}`,fontWeight:'600'}} component='span'>{subTotal}$</Typography>
              </Grid>
                <Grid sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.textBanner}`,fontWeight:'600'}} component='span'>Estimated Tax</Typography>
                <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.charocal}`,fontWeight:'600'}} component='span'>{Estimated_Tax}$</Typography>
              </Grid>
                <Grid sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:{md:'10px'}}}>
                <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.textBanner}`,fontWeight:'600'}} component='span'>Estimated Shpping & Handling</Typography>
                <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.charocal}`,fontWeight:'600'}} component='span'>{Estimated_Shipping_handling}$</Typography>
              </Grid>
                <Grid sx={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.charocal}`,fontWeight:'600'}} component='span'>Total</Typography>
                <Typography sx={{fontSize:{xs:'14px',md:'18px'},color:`${colors.charocal}`,fontWeight:'600'}} component='span'>{total}$</Typography>
              </Grid>
             </Grid>
                  <Grid>
<Grid sx={{boxSizing:'border-box',marginTop:{xs:'14px',md:'32px'}}}>
  <Button sx={{width:'100%',backgroundColor:`${colors.charocal}`,color:`${colors.backgroundCategory}`,borderRadius:'7px',border:`1px solid ${colors.charocal}`,textAlign:'center',padding:'8px 12px',fontSize:{xs:'12px',md:'18px',fontWeight:'400'}}}>CheckOut</Button>
</Grid>

                  </Grid>
                  </Grid>  

   </Box>
  )
}
