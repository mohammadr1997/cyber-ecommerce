import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material";
import { getProductImageUrl } from "@/constants/api";

import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import type { IWishlistItem } from "@/apis/wishlistApi";
import useGetWishlist from "@/features/whisllist/hooks/useGetWishlist";
import useRemoveFromWishlist from "../hooks/useRemoveFromWishlist";
    import {colors} from "@/constants/colors";
import { useNavigate } from "react-router-dom";
import Loading from "@/features/loading/loading";
import ErrorComp from "@/features/error/Error";
import { useEffect} from "react";
import useAddToCart from "@/features/cart/hooks/useAddToCart";
import useGetCart from "@/features/cart/hooks/useGetCart";
import { type ICartItem } from "@/apis/cartApi";
const BLACK = `${colors.charocal}`;




export default function Whishlist() {
  const useAddToCartMutation=useAddToCart()

    const navigate=useNavigate()
  const { data: wishlistItems, isLoading, isError } = useGetWishlist();
  const removeFromwhislListMutation = useRemoveFromWishlist();
  const {data:cartProducts}=useGetCart()
  const token=localStorage.getItem('token')
  useEffect(()=>{
    if(!token){
      navigate('/sign-in')
    }
  },[token])


  const handleAddToCart=(productId:string,colorId:string)=>{
      useAddToCartMutation.mutate({productId,colorId})
  }



 if (isLoading) {
  return <Loading variant="section" text="Loading wishlist..." />;
}
  if (isError) {
  return (
    <ErrorComp
      variant="section"
      text="Failed to load your wishlist."
      onRetry={() => window.location.reload()}
    />
  );
}
  console.log("check whisllist items", wishlistItems?.data.data.items);

  const rawItems: IWishlistItem[] = wishlistItems?.data.data.items ?? [];

  
  const items = rawItems.map((raw: IWishlistItem) => {
    const p = raw.productId  ?? raw;
    return {
      id: String(p._id ?? raw._id),
      name: p.name ??  "",
      image: getProductImageUrl(p.mainImage ?? p.images?.[0] ?? ""),
      price: p.price ?? 0,
      color: p.mainImageColorId ?? "",
    };
  });

  const handleRemove = (productId: string) => {
    removeFromwhislListMutation.mutate(productId);
  };

  const handleNavigateToProductDetail = (productId: string) => {
    navigate(`/catalog/product/${productId}`);
  };
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 8 },
        minHeight: "50vh",
      }}
    >
     
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 5 }}>
        <Typography
          component="h1"
          sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 600, color: BLACK }}
        >
          Wishlist
        </Typography>
        <Typography sx={{ fontSize: 16, color: "#6C6C6C" }}>
          ({items.length} {items.length === 1 ? "item" : "items"})
        </Typography>
      </Box>

      {/* Empty state */}
      {items.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
            py: 10,
            border: "1px dashed #CFCFCF",
            borderRadius: "12px",
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 56, color: "#CFCFCF" }} />
          <Typography sx={{ fontSize: 20, fontWeight: 600, color: BLACK }}>
            Your wishlist is empty
          </Typography>
          <Typography sx={{ color: "#6C6C6C", maxWidth: 360 }}>
            Save the products you love and they will show up here.
          </Typography>
          <Button
            href="/"
            variant="contained"
            sx={{
              mt: 1,
              px: 5,
              py: 1.5,
              bgcolor: BLACK,
              color: "#fff",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": { bgcolor: "#2b2b2b", boxShadow: "none" },
            }}
          >
            Continue shopping
          </Button>
        </Box>
      ) : (
      
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {items.map((item) =>{ 
            
            const items=cartProducts?.data.data.items ?? []
            const isInCart=items.some((itemCart:ICartItem)=>itemCart.productId._id===item.id)
            
            
            return(
            <Card
      
              key={item.id}
              elevation={0}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                borderRadius: "12px",
                border: "1px solid #EBEBEB",
                transition: "box-shadow .2s, transform .2s",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                },
              }}
            >
            
              <IconButton
                aria-label="Remove from wishlist"
                size="small"
                disabled={removeFromwhislListMutation.isPending}
                onClick={() => handleRemove(item.id)}
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  zIndex: 1,
                  bgcolor: "#fff",
                  border: "1px solid #EBEBEB",
                  color: BLACK,
                  "&:hover": { bgcolor: BLACK, color: "#fff" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              {/* Image */}
              <Box
                    onClick={()=>handleNavigateToProductDetail(item.id)}
                sx={{
                  bgcolor: "#F6F6F6",
                  height: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </Box>

              {/* Info */}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  flexGrow: 1,
                  p: 2.5,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: BLACK,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: 48,
                  }}
                >
                  {item.name}
                </Typography>

                {item.color && (
                  <Typography sx={{ fontSize: 14, color: "#6C6C6C" }}>
                    {item.color}
                  </Typography>
                )}

                <Typography
                  sx={{ fontSize: 20, fontWeight: 600, color: BLACK, mt: 1 }}
                >
                  {item.price}$
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingCartOutlinedIcon />}
                  onClick={()=>handleAddToCart(item.id,item.color)}
                  sx={{
                    mt: "auto",
                    pt: 1.5,
                    pb: 1.5,
                    bgcolor: BLACK,
                    color: "#fff",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 500,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#2b2b2b", boxShadow: "none" },
                  }}
                >
               {useAddToCartMutation.isPending?'Adding to Cart':isInCart? 'Already in Cart':'Add to Cart'}
                </Button>
              </CardContent>
            </Card>
          )})}
        </Box>
      )}
    </Box>
  );
}