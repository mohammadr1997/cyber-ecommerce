
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { getProductImageUrl } from "@/constants/api";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useHandleNavigateProducts from "../hooks/useHandleNavigateProducts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { showToast } from "@/redux/toast/toastSlice";
import { useDispatch } from "react-redux";
import useGetCart from "@/features/cart/hooks/useGetCart";
import { colors } from "@/constants/colors";

import { Box, Paper } from "@mui/material";
import useAddToWishlist from "@/features/whisllist/hooks/useAddToWishlist";
import useRemoveFromWishlist from "@/features/whisllist/hooks/useRemoveFromWishlist";
import useGetWishlist from "@/features/whisllist/hooks/useGetWishlist";
import Loading from "@/features/loading/loading";
import guard from "@/constants/guard";
import useAddToCart from "@/features/cart/hooks/useAddToCart";
import { useNavigate } from "react-router-dom";
import {type ICartItem } from "@/apis/cartApi";
import { type IProductType } from "@/apis/productsApi";
interface IProductCardProps {
  product: IProductType;
}



export default function ProductCard({ product }: IProductCardProps) {
 const dispatch=useDispatch();
  const useAddToCartMutation=useAddToCart()
  const navigate=useNavigate()
const {data:cartProducts}=useGetCart()
  const addToWhishlistMutation=useAddToWishlist()
  const removeFromWhishlistMutation=useRemoveFromWishlist()
  const {data:whishlistData,isLoading}=useGetWishlist()
  // const [favoriteProductsIds, setFavoriteProductsIds] = useState<string[]>(
  //   [],
  // );
  const handleNavigateProduct=useHandleNavigateProducts()
            if (!product) return null;
     const handleFavorite = (productId: string) => {
  const isFavorite = whishlistData?.data.data.items.some(
    (item) => item?.productId?._id === productId,
  );

  if (isFavorite) {
    removeFromWhishlistMutation.mutate(productId);

    // setFavoriteProductsIds((prev) =>
    //   prev.filter((id) => id !== productId),
    // );

    return;
  }

  addToWhishlistMutation.mutate({ productId });

  // setFavoriteProductsIds((prev) => [...prev, productId]);
};


  const isFavoriteBtn = whishlistData?.data.data.items.some(
    (item) => item?.productId?._id === product._id
  );
const isFavoriteBusy =
  isLoading ||
  addToWhishlistMutation.isPending ||
  removeFromWhishlistMutation.isPending;




const handleProduct=(id:string | undefined,category:string)=>{
  if(!id) return
handleNavigateProduct(id,category)
}

const handleBuyNow=(event: React.MouseEvent<HTMLButtonElement>,productBuyNow:IProductType)=>{
    event.stopPropagation()
   const isAuthenticicated=guard()
    if(!isAuthenticicated){
      dispatch(showToast({
        message:'Please sign in to continue',
        type:'info'
      }))
    return
    }

  if(!product?._id) return
if(Array.isArray(productBuyNow.colors)){
  const colorId=productBuyNow.colors[0]
  const productId=product._id
  if( typeof colorId==='string'){
  useAddToCartMutation.mutate({productId:productId,colorId:colorId},{
    onSuccess:()=>{
      navigate('/cart')
    
    }
  })}
}
}
const cartItems=cartProducts?.data.data.items ?? []
const isInCart=cartItems.some((item:ICartItem)=>item?.productId?._id===product._id)

  return (
    <Paper  sx={{
     
        cursor:'pointer',
        
        height:{md:'480px'},
        marginTop:{xs:'48px',md:'0px'},
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: colors.backgroundPrimary,
        width: { xs: "100%", md: "250px" },
      }} elevation={8}>
         <Card
         sx={{
          width: { xs: "100%", md: "250px" },
          height: { xs: "100%", md: "480px" },   "&:hover": {
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                }, }} 
    onClick={()=>handleProduct(product._id,product.categoryId.name)}
     
    >
      <CardHeader
        sx={{
          display: "flex",
          justifyContent: "end",
          width: "100%",
       
          height: { md: "60px" },
        }}
        action={
        <IconButton
  disabled={isFavoriteBusy}
  onClick={(event) => {
    event.stopPropagation();
    handleFavorite(product._id!);
  }}
  aria-label="favorite"
>
  {isFavoriteBusy ? (
    <Loading variant="inline" size={20} />
  ) : !isFavoriteBtn ? (
    <FavoriteBorderIcon fontSize="medium" />
  ) : (
    <FavoriteIcon fontSize="medium" />
  )}
</IconButton>
        }
      />
  <Box   sx={{width: { xs: "100%", md: "250px" },
  
    height: { xs: "180px", md: "170px" },
    display: "flex",
   
    alignItems: "center",
    justifyContent: "center"}}>
       <CardMedia
        component="img"
        decoding="async"
        loading="lazy"
        sx={{
              width: "100%",
      height: "180px",
          // height: { xs: "104px", md: "160px" },
          // width: { xs: "104px", md: "160px" },
          // marginBottom: { xs: "16px", md: "40px" },
           objectFit: {xs:'contain',md:'contain'},
        }}
     image={getProductImageUrl(product.mainImage)}
        alt={product.name}
      />
    </Box>
     

      <CardContent sx={{ height: {'md':'150px'}  }}>
        <Typography
          variant="body2"
          sx={{
            color: colors.charocalSecondary,
            marginBottom: { xs: "16px", md: "0px" },
           
            textAlign: "center",
            direction: "ltr",
            fontSize: "16px",
            fontWeight: "600",
            marginTop:'16px'
          }}
        >
          {product.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: colors.charocal,
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "14px",
            marginTop:'14px',
            textAlign: "center",
            height: "24px",
          }}
        >
          {product.price}$
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
   <Button
  onClick={(event) => handleBuyNow(event, product)}
  sx={{
    backgroundColor: colors.charocal,
    padding: "16px 64px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "18px",
    width: "100%",
    height: "58px",
    color: colors.mainWhite,
    marginTop: "18px",
    fontSize:{xs:'12px',md:'16px'},

    transition: "all 0.25s ease",

    "&:hover": {
      backgroundColor: colors.charocalSecondary,
      transform: "translateY(-3px) scale(1.01)",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
    },

    "&:active": {
      transform: "translateY(0) scale(0.98)",
    },
  }}
>
{useAddToCartMutation.isPending?'Adding...':isInCart? 'Added to Cart':'Buy Now'}
</Button>
      </CardActions>
    </Card>
    </Paper>
 
  );
}
