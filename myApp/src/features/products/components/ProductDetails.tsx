import {  useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useParams } from "react-router-dom";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { attributeIcons } from "@/constants/attributes-icon";
import useGetCart from "@/features/cart/hooks/useGetCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import useGetProductById from "../hooks/useGetProductById";
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { colors, PRODUCT_COLORS, type IProductColor } from "@/constants/colors";
import type { IProductType } from "@/apis/productsApi";
import useAddToWhishlist from "@/features/whisllist/hooks/useAddToWishlist";
import useProductsQuery from "../hooks/useProductsQuery";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch } from "react-redux";
import { showToast } from "@/redux/toast/toastSlice";
import type { Swiper as SwiperType } from "swiper";
import { IconButton } from "@mui/material"; 
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "swiper/css";
import "swiper/css/navigation";
import Reviews from "./Reviews";
import useAddToCart from "@/features/cart/hooks/useAddToCart";
import { getProductImageUrl } from "@/constants/api";
import useGetWishlist from "@/features/whisllist/hooks/useGetWishlist";
import Loading from "@/features/loading/loading";
import ProductSkeleton from "@/features/loading/productSkeleton";
import ErrorComp from "@/features/error/Error";
import guard from "@/constants/guard";
interface Attribute {
  _id: string;
  name: string;
  key: string;
  type: "text" | "number" | "select" | "boolean";
  options: string[];
  order: number;
  status: string;
  categoryId: string;
}

interface ProductAttribute {
  attributeId: Attribute;
  value: string;
  _id: string;
}

const navButtonSx = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  width: { xs: 36, md: 44 },
  height: { xs: 36, md: 44 },
  borderRadius: "8px",
  backgroundColor: colors.charocal,
  color: colors.mainWhite,
  boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
  transition: "opacity .2s ease, background-color .2s ease",
  "&:hover": {
    backgroundColor: colors.charocal,
    opacity: 0.85,
  },
  "&.Mui-disabled": {
    backgroundColor: colors.charocal,
    color: colors.mainWhite,
    opacity: 0.25,
  },
};
function formatAttributeValue(attribute: ProductAttribute) {
  if (attribute.attributeId.type !== "boolean") {
    return attribute.value;
  }

  return String(attribute.value).toLowerCase() === "true" ? "Yes" : "No";
}

interface ProductImage {
  url: string;
  colorId: string;
  _id: string;
}
export default function ProductDetails() {
  const dispatch=useDispatch()
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
const [isBeginning, setIsBeginning] = useState(true);
const [isEnd, setIsEnd] = useState(false);

const syncNavState = (s: SwiperType) => {
  setIsBeginning(s.isBeginning);
  setIsEnd(s.isEnd);
};
   const { id } = useParams();

const addToCartMutation=useAddToCart()
  const [mainColor, setMainColor] = useState<string>("");
  const [, setProductsColors] = useState<string[]>([]);
const {data:shoppingCart}=useGetCart()

const cart = shoppingCart?.data.data.items;

const isInCart =
  cart?.some(
    (productCart) => productCart?.productId?._id === id
  ) ?? false
 

  const { data, isLoading, isError } = useGetProductById(id);
  const { data: productsData, isLoading: isRelatedLoading  } = useProductsQuery();
const {data:wishlistData}=useGetWishlist()
  const addToWhishlistMutation=useAddToWhishlist()
const handleAddToWhishlist = (id: string) => {
      const isAuthenticicated=guard()
    if (!isAuthenticicated){
      console.log('nt authenticicate')
        dispatch(showToast({
          message:'Please sign in to continue',
        type:'info'
        }))
        
    }else{
       if (!id) return;
  addToWhishlistMutation.mutate({productId:id});
}
    }
 
const isInWishlist = wishlistData?.data.data.items.some(
  (item) => item?.productId?._id === id
) ?? false;
const handleAddToCart = (id: string) => {
    const isAuthenticicated=guard()
    if (!isAuthenticicated){
        dispatch(showToast({
          message:'Please sign in to continue',
        type:'info'
        }))
     
    }else{ if (!id || !mainColor || !mainImageUrl) return;

  addToCartMutation.mutate({
    productId: id,
    colorId: mainColor,
  });}
 
};
  const product = data?.data.data;
if(product)console.log('check product',product)
  const relatedProducts = product?.categoryId?._id
    ? ((productsData?.data?.data ?? []) as IProductType[])
        .filter(
          (candidate) =>
            candidate._id !== product._id &&
            candidate.categoryId?._id === product.categoryId._id,
        )
        .sort((first, second) => {
          const firstMatchesBrand = first.brand?._id === product.brand?._id;
          const secondMatchesBrand = second.brand?._id === product.brand?._id;

          return Number(secondMatchesBrand) - Number(firstMatchesBrand);
        })
        .slice(0, 12)
    : [];
    if(relatedProducts)console.log('check related products',relatedProducts)
  // عکس اصلی فعلی
  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);

  // لیست عکس‌های Gallery
  const [galleryImages, setGalleryImages] = useState<ProductImage[]>([]);

  // --------------------------------
  // وقتی اطلاعات محصول دریافت شد
  // --------------------------------

  useEffect(() => {
    if (!product) return;

    const mainColor = product.colors[0];

    const mainImage: ProductImage = {
      _id: "main-image",
      url: product.mainImage,
      colorId: mainColor,
    };

    const allImages: ProductImage[] = [
      mainImage,
      ...(product.images || []),
    ];

    setMainImageUrl(mainImage.url);
    setMainColor(mainColor);

    setGalleryImages(allImages.slice(1));

    setProductsColors(
      allImages.map((image) => image.colorId)
    );

   
  }, [product]);

 if (!id) {
  return (
    <ErrorComp
      variant="section"
      text="Product not found."
    />
  );
}

if (isLoading) {
  return (
    <Loading
      variant="fullscreen"
      text="Loading product..."
    />
  );
}


if (isError || !product) {
  return (
    <ErrorComp
      variant="section"
      text="Failed to load product details."
      onRetry={() => window.location.reload()}
    />
  );
}

  // --------------------------------
  // Swap Main Image <-> Gallery Image
  // --------------------------------

  const handleImageClick = (
    clickedImage: ProductImage,
    index: number
  ) => {
    if (!mainImageUrl) return;

    const previousMainImage = mainImageUrl;
    const previousMainColor = mainColor;

    // عکس انتخاب‌شده می‌شود Main
    setMainImageUrl(clickedImage.url);
    setMainColor(clickedImage.colorId);

    // عکس Main قبلی می‌رود جای عکس انتخاب‌شده
    setGalleryImages((prevImages) => {
      const updatedImages = [...prevImages];

      updatedImages[index] = {
        ...clickedImage,
        url: previousMainImage,
        colorId: previousMainColor,
      };

      return updatedImages;
    });
  };

  // --------------------------------
  // Select Color
  // --------------------------------

  const handleSelectColor = (productColor: string) => {
   
  
    if (productColor === mainColor) return;

    const selectedImageIndex = galleryImages.findIndex(
      (image) => image.colorId === productColor
    );


    if (selectedImageIndex !== -1) {
      const selectedImage = galleryImages[selectedImageIndex];

      const previousMainImage = mainImageUrl;
      const previousMainColor = mainColor;

   
      setMainImageUrl(selectedImage.url);
      setMainColor(productColor);

      
      setGalleryImages((prevImages) => {
        const updatedImages = [...prevImages];

        updatedImages[selectedImageIndex] = {
          ...selectedImage,
          url: previousMainImage!,
          colorId: previousMainColor,
        };

        return updatedImages;
      });

      return;
    }

    // --------------------------------
    // اگر رنگ انتخاب‌شده رنگ اول است
    // --------------------------------

    if (productColor === product.colors[0]) {
      const previousMainImage = mainImageUrl;
      const previousMainColor = mainColor;

      setMainImageUrl(product.mainImage);
      setMainColor(productColor);

      // عکس Main فعلی باید وارد Gallery شود
      setGalleryImages((prevImages) => [
        {
          _id: `previous-main-${Date.now()}`,
          url: previousMainImage!,
          colorId: previousMainColor,
        },
        ...prevImages,
      ]);

      return;
    }
  };

  return (
    <main>
      <Box
        component="article"
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },

          gap: {
            xs: "53px",
            md: "48px",
          },

          justifyContent: {
            xs: "center",
            md: "space-between",
          },

          padding: {
            xs: "12px",
            md: "160px 112px",
          },
        }}
      >
        {/* =========================
            PRODUCT IMAGES
        ========================= */}

        <Box
          sx={{
            display: "grid",

            gridTemplateColumns: {
              xs: "1fr",
              md: "95px 380px",
            },

            gap: "16px",

            alignItems: "stretch",
          }}
        >
          {/* =========================
              MAIN IMAGE
          ========================= */}

          <Box
            sx={{
              gridColumn: {
                xs: "1",
                md: "2",
              },
              
              alignContent:'center',
              gridRow: {
                xs: "1",
                md: "1",
              },

              width: "100%",
            }}
          >

            {mainImageUrl && (
              <img
              src={getProductImageUrl(mainImageUrl)}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              gridColumn: {
                xs: "1",
                md: "1",
              },

              gridRow: {
                xs: "2",
                md: "1",
              },

              display: "flex",

              flexDirection: {
                xs: "row",
                md: "column",
              },

              minHeight: 0,

              paddingTop: {
                md: "0px",
              },

              paddingBottom: {
                md: "0px",
              },

              height: {
                xs: "auto",
                md: "100%",
              },

              overflowY: {
                xs: "hidden",
                md: "auto",
              },

              overflowX: {
                xs: "auto",
                md: "hidden",
              },

              gap: "8px",
              justifyContent:'center'
            }}
          >
            {galleryImages.map(
              (image: ProductImage, index: number) => (
                <Box
                  key={image._id || index}
                  sx={{
                    width: {
                      xs: "70px",
                      md: "95px",
                    },

                    height: {
                      xs: "70px",
                      md: "95px",
                    },

                    flexShrink: 0,
                  }}
                >
                  <img
                    onClick={() =>
                      handleImageClick(image, index)
                    }
                   src={getProductImageUrl(image.url)}
                    alt={product.name}
                    style={{
                      cursor: "pointer",

                      width: "100%",

                      height: "100%",

                      objectFit: "cover",

                      display: "block",
                    }}
                  />
                </Box>
              )
            )}
          </Box>
        </Box>

        {/* =========================
            PRODUCT DETAILS
        ========================= */}

        <Paper elevation={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            width: "100%",
            justifyContent: "flex-start",
            backgroundColor: `${colors.backgroundSecondary}`,
            padding: "40px",
            marginBottom:{md:'125px'}
           
          }}
        >
          <Grid
            sx={{
              textAlign: "left",
              width: "100%",
              fontWeight: "700",
              fontSize: {
                xs: "30px",
                md: "40px",
              },
            }}
          >
            {product.name}
          </Grid>

          <Grid
            sx={{
              fontWeight: "500",
              fontSize: {
                xs: "28px",
                md: "32px",
              },
            }}
          >
            ${product.price}
          </Grid>

          <Grid
            sx={{
              fontWeight: "500",
              fontSize: {
                xs: "16px",
                md: "20px",
                display: "flex",
                flexDirection: "row",
                gap: "16px",
              },
            }}
          >
            <Grid>{product.colors.length>1 ?'Select Colors :':'Color :'}</Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                justifyContent: "end",
              }}
            >
              {product.colors.map( 
                (color: string) => {
                const productColor= PRODUCT_COLORS.find((productColor:IProductColor)=>productColor.id==color)
                
                    return (
                  <Grid
                    onClick={() =>
                      handleSelectColor(color)
                    }
                    key={color}
                    sx={{
                      backgroundColor: productColor?.hexCode,
                      width: "32px",
                      cursor: `${product.colors.length>1 ?'pointer':'default'}`,
                      
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  />
              )}
              )}
            </Box>
            
          </Grid>
        <Box sx={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap:'8px',justifyContent:{xs:'center',md:'center'},width:'100%',padding:'16px',borderRadius:'7px'}}>
        <Grid  container
  spacing={2}>
           { product.attributes.slice(1).map((attribute:ProductAttribute,index:number)=>{
            const iconKey=attribute.attributeId.key
            const Icon=attributeIcons[iconKey]
            return <Grid size={{xs:12,md:4}} sx={{display:'flex',flexDirection:'row',gap:'8px',padding:'16px',borderRadius:'7px',backgroundColor:`${colors.bgProdutDetail}`,justifyContent:'space-between'}} key={index} >
                <Grid size={10} sx={{display:'flex',flexDirection:'column',gap:'4px',justifyContent:'start',textAlign:'left'}}>
                <Grid  sx={{fontSize:{xs:'14px',md:'14px'},textAlign:'left',color:`${colors.textBanner}`}}>{attribute.attributeId.name}</Grid>
              <Grid  sx={{fontSize:{xs:'14px',md:'14px'},textAlign:'left',color:`${colors.charocal}`}}>{formatAttributeValue(attribute)}</Grid>
              </Grid>
              <Grid size={2} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><Icon/></Grid>
            
              
            </Grid>
          })}
        </Grid>
         
        </Box>
        <Grid sx={{width:'100%',display:'flex',justifyContent:'center',textAlign:'left',fontSize:'14px',fontWeight:'400',color:`${colors.textBanner}`,padding:{xs:'16px',md:'18px'}}}>{product.shortDescription}</Grid>
          <Grid size={12} sx={{display:'flex',flexDirection:{xs:'column',md:'row',gap:'16px',justifyContent:'center'}}}>
            <Grid sx={{display:'flex',position:'relative' ,backgroundColor:`${colors.backgroundPrimary}`,flexDirection:'row',flexwrap:'nowrap',gap:{md:'14px',xs:'8px'},padding:{md:'10px 16px',xs:'14px 10px'},width:{xs:'100%',md:'35%'},justifyContent:'space-evenly',borderRadius:'6px',border:`2px solid ${colors.charocal}`,cursor:'pointer',color:`${colors.mainWhite}`}}>
                  <Button   disabled={isInWishlist  || addToWhishlistMutation.isPending} onClick={()=>handleAddToWhishlist(id)} sx={{color:`${colors.charocal}`,"&.Mui-disabled": {
      color: colors.charocal,
    },fontSize:{xs:'12px',md:'14px'}}}
      
     
     >{addToWhishlistMutation.isPending
    ? "Adding..."
    : isInWishlist
      ? "Already is in whishlist"
      : "Add To Whishlist"}</Button>
     {isInWishlist ? <FavoriteIcon sx={{marginTop:{md:'4px',xs:'4px'},color:'black',width:'20%',position:'absolute',top:{xs:'22.5%',md:'20%'}  ,right:'15px'}}  fontSize="medium"/>: <FavoriteBorderIcon  sx={{marginTop:{md:'4px',xs:'4px'},color:'black',position:'absolute',top:{xs:'22.5%',md:'20%'},right:'15px'}}  fontSize="medium"/>}
   
            </Grid>
            <Grid sx={{display:'flex',position:'relative',flexwrap:'nowrap',backgroundColor:`${colors.charocal}`,flexDirection:'row',gap:{md:'14px',xs:'8px'},padding:{md:'10px 16px',xs:'14px 10px'},width:{xs:'100%',md:'35%'},justifyContent:'space-evenly',borderRadius:'6px',border:`2px solid ${colors.charocal}`,cursor:'pointer',color:`${colors.mainWhite}`}}>
                  <Button   disabled={isInCart || addToCartMutation.isPending} onClick={()=>handleAddToCart(id)} sx={{color:`${colors.backgroundPrimary}`, "&.Mui-disabled": {
      color: colors.backgroundPrimary,
    },fontSize:{xs:'12px',md:'14px'}}}
      
     
     >  {addToCartMutation.isPending
    ? "Adding..."
    : isInCart
      ? "Already is in Cart"
      : "Add To Cart"}</Button>
    <ShoppingCartOutlinedIcon sx={{marginTop:{md:'4px',xs:'4px'},width:'20%',position:'absolute',top:{xs:'22.5%',md:'20%'},right:'0px'}}  fontSize="medium"/>
            </Grid>
        
          </Grid>
          <Grid sx={{display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',gap:'16px',marginTop:'32px'}}>
            <Grid sx={{display:'flex',flexDirection:'row',gap:'16px',justifyContent:'space-between'}}>
              <Grid sx={{display:'flex',alignItems:'center',justifyContent:'center'}}><AirportShuttleIcon/></Grid>
              <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Grid sx={{fontSize:'14px',color:`${colors.textBanner}`}}>free delivery</Grid>
                <Grid sx={{fontSize:'14px',color:`${colors.charocal}`}}>1-2 days</Grid>
              </Grid>
            </Grid>
            <Grid sx={{display:'flex',flexDirection:'row',gap:'16px',justifyContent:'space-between'}}>
              <Grid sx={{display:'flex',alignItems:'center',justifyContent:'center'}}><Inventory2Icon/></Grid>
              <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Grid sx={{fontSize:'14px',color:`${colors.textBanner}`}}>In Stock</Grid>
                <Grid sx={{fontSize:'14px',color:`${colors.charocal}`}}>Today</Grid>
              </Grid>
            </Grid><Grid sx={{display:'flex',flexDirection:'row',gap:'16px',justifyContent:'space-between'}}>
              <Grid sx={{display:'flex',alignItems:'center',justifyContent:'center'}}><WorkspacePremiumIcon/></Grid>
              <Grid sx={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Grid sx={{fontSize:'14px',color:`${colors.textBanner}`}}>Guaranteed</Grid>
                <Grid sx={{fontSize:'14px',color:`${colors.charocal}`}}>1 year</Grid>
              </Grid>
            </Grid>
          </Grid>
         
        </Paper>
     
      </Box>
       <Box sx={{marginTop:{md:'-280px'},display:'flex',flexDirection:'column',gap:'32px', padding:{xs: "12px",
            md: "160px 112px"}}}>
              <Typography variant="h4" sx={{textAlign:'left',color:`${colors.charocal}`, fontSize: { xs: '18px', md: '24px' },
    width: '100%',
    fontWeight: '600',}}>Details</Typography>
              <Grid sx={{fontSize:{xs:'14px',md:'16px',fontWeight:'500'},color:`${colors.textBanner}`,textAlign:'left',marginTop:'8px'}}>{product.longDescription}</Grid>
              <Grid sx={{display:'flex',flexDirection:'column',gap:'10px',justifyContent:'center',alignItems:'center',width:'100%',}}>
           
              {product.attributes.map((attributes:ProductAttribute,index:number)=>{
                return <Grid size={12} key={index} sx={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between',marginTop:'32px'}}>
                  <Grid sx={{fontSize:{xs:'16px',md:'18px',fontWeight:'500'}}}>{attributes.attributeId.name}</Grid>
              <Grid sx={{fontSize:{xs:'14px',md:'16px',fontWeight:'400'}}}>{formatAttributeValue(attributes)}</Grid>
              </Grid>
              })}
              
            </Grid>
          </Box>
          <Box sx={{display:'flex',flexDirection:'column',gap:'45px'}}>
<Reviews id={id}/>
{(isRelatedLoading || relatedProducts.length > 0) && (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
   
      gap: {xs:'32px',md:'16px'},
   
      width: "100%",
      padding: { xs: "12px", md: "40px 112px" },
    }}
  >
    <Typography
      sx={{
        fontSize: { xs: "18px", md: "24px" },
        textAlign: "left",
        fontWeight: "600",
        marginTop: { xs: "45px" },
      }}
      variant="h4"
    >
      Related Products
    </Typography>

    <Box
      sx={{
        position: "relative",
        width: "100%",
        marginTop: { xs: "-25px", md: "80px" },
      }}
    >
      {isRelatedLoading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 250px)",
            },
            gap: "16px",
            overflow: "hidden",
          }}
        >
          <ProductSkeleton count={4} />
        </Box>
      ) : (
        <>
          {!(isBeginning && isEnd) && (
            <>
              <IconButton
                aria-label="Previous products"
                disabled={isBeginning}
                onClick={() => swiper?.slidePrev()}
                sx={{ ...navButtonSx, left: { xs: 4, md: -56 } }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <IconButton
                aria-label="Next products"
                disabled={isEnd}
                onClick={() => swiper?.slideNext()}
                sx={{ ...navButtonSx, right: { xs: 4, md: -56 } }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}

          <Swiper
            onSwiper={(s) => {
              setSwiper(s);
              syncNavState(s);
            }}
            onSlideChange={syncNavState}
            onBreakpoint={syncNavState}
            onResize={syncNavState}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              600: { slidesPerView: 2 },
              1000: { slidesPerView: 4 },
            }}
            style={{ width: "100%", padding: "8px 0px 16px" }}
          >
            {relatedProducts.map((relatedProduct) => (
              <SwiperSlide
                key={relatedProduct._id}
                style={{ display: "flex", justifyContent: "flex-start", padding: 0 }}
              >
                <ProductCard product={relatedProduct} />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </Box>
  </Box>
)}
          </Box>

          {/* <Box sx={{display:'flex',flexDirection:'column',gap:'32px',width:'100%',padding:{xs: "12px",
            md: "160px 112px"}}}>
        <Typography sx={{fontSize: { xs: '18px', md: '24px' },textAlign:'left', fontWeight: '600' 
   
   
  
    ,marginTop:{xs:'45px'}}} variant="h4">Related Products</Typography>
        <Box sx={{width:'100%',marginTop:{xs:'-25px',md:'20px'}}}>  {relatedProducts.length > 0 && (
         <Swiper
  modules={[Navigation]}
  navigation
  spaceBetween={16}
  slidesPerView={1}
  breakpoints={{
    600: {
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 4,
    },
  }}
  style={{
    width: "100%",
    padding: "8px 0px 16px",
  }}
>
  {relatedProducts.map((relatedProduct) => (
    <SwiperSlide
      key={relatedProduct._id}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        padding: 0,
      }}
    >
      <ProductCard product={relatedProduct} />
    </SwiperSlide>
  ))}
</Swiper>
        )}</Box>
      
          </Box> */}
        
    </main>
  );
}