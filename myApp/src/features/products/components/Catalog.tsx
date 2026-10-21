import { useNavigate, useSearchParams } from "react-router-dom";
import useFirstLetterUpperCase from "../hooks/useFirstLetterUpperCase";
import { colors } from "@/constants/colors";
import { Box, Grid, Stack, Typography } from "@mui/material";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import {
  Menu,
  MenuItem,
} from "@mui/material";
import TuneSharpIcon from "@mui/icons-material/TuneSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";

import type { IProductType } from "@/apis/productsApi";
import ProductCard from "./ProductCard";
import FilterUser from "./FilterUser";

import { useProductFilterContext } from "../context/useProductFilterContext";
import { useState } from "react";

import BreadCrumbsIndicator from "./BreadCrumbsIndicator";
import ProductSkeleton from "@/features/loading/productSkeleton";
import Loading from "@/features/loading/loading";

export default function Catalog() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
const [sortAnchorEl, setSortAnchorEl] =
  useState<null | HTMLElement>(null);

const handleSortClick = (
  event: React.MouseEvent<HTMLElement>
) => {
  setSortAnchorEl(event.currentTarget);
};


 const {
  products: filteredproducts,
  filteredProducts: productFiltered,
  priceSort,
  setPriceSort,
   isLoading
} = useProductFilterContext();
const handlePriceSort = (
  sort: "lowToHigh" | "highToLow"
) => {
  setPriceSort(sort);

  setSortAnchorEl(null);
};
  const productsToDisplay = productFiltered;
console.log('product to display',productsToDisplay)
  console.log("category name", category);

  console.log(
    "check filtered products",
    filteredproducts
  );

  const navigate = useNavigate();

  const categoryName =
    useFirstLetterUpperCase(category || "");

  const handleFilterMobile = () => {
    console.log(
      "check search params",
      searchParams
    );

    navigate(`/catalog/filter?${searchParams}`);
  };

  return (
    <Stack
      sx={{
        marginBottom: {
          md: "250px",
          xs: "100px",
        },
      
      }}
    >
      <Stack sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          justifyContent: "start",
          width: "100%",
          flexDirection: "row",
          padding: "12px",
         
        
        }} >
          <BreadCrumbsIndicator thirdPage="Catalog" fourthPage={categoryName}/>
        </Stack>
      
      {/* <Stack
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
          justifyContent: "start",
          width: "100%",
          flexDirection: "row",
          padding: "12px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: `${colors.secondary}`,
              width: "54px",
              height: "16px",
              fontSize: "18px",
            }}
          >
            Home
          </span>

          &nbsp;

          <ChevronRightIcon
            fontSize="large"
            sx={{
              color: `${colors.secondary}`,
            }}
          />

          <span
            style={{
              color: `${colors.secondary}`,
              width: "54px",
              height: "16px",
              fontSize: "18px",
            }}
          >
            Catalog
          </span>

          &nbsp; &nbsp; &nbsp;

          <ChevronRightIcon
            fontSize="large"
            sx={{
              color: `${colors.secondary}`,
            }}
          />

          <span
            style={{
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {categoryName}
          </span>
        </Typography>
      </Stack> */}

      <Grid
        container
        sx={{
          width: "85%",
          margin: "0 auto",
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          
          },
        
        }}
      >
       
          {/* <FilterUser/> */}

        <Grid 
          sx={{
            width:'100%',
            display: {
              xs: "flex",
              md: "none",
            },
            
            position: "relative",
            justifyContent: "left",
            textAlign: "left",
            paddingLeft: "67px",
            marginTop: "24px",
            flexDirection: "row",
          
          }}
        >
       
                  </Grid>

      
      </Grid>

      <Grid
        sx={{
          width: "100%",
          position: "relative",
          margin: "0 auto",
        
   
        
          marginTop: {
            xs: "40px",
            
            marginLeft: {
              md: "0px",
            },
          },
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            md: "row-reverse",
          },
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          
        }}
      >
        
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "16px",
          
            justifyContent: "center",
            marginLeft: {
              md: "300px",
            },
            alignItems: "center",
            width: "100%",
           
            marginTop: {
              xs: "40px",
            },
          }}
          size={{ xs: 12,md: 8 }}
        >
          <Box sx={{display:'flex',justifyContent:{xs:'center',md:'start'},flexDirection:'row',flexWrap:'wrap',width:'100%',margin:'0 auto',marginLeft:{md:'100px'},gap:'16px'}}>
          <Grid sx={{ width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between',flexWrap:{xs:'wrap',md:'nowrap',marginBottom:'24px'}}}>
              <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          size={{ xs: 12, md: 8 }}
        >
          <Grid
            spacing={4}
            container
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
                  
            }}
          >
            <Grid
              sx={{
                textAlign: "left",
               
                width:'100%',
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
              size={6}
            >
              <span
                style={{
                  color: `${colors.textColorHeader}`,
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                Selected Products:
              </span>

              &nbsp;

              <span
                style={{
                  color: `${colors.charocal}`,
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                {productsToDisplay.length}
              </span>
            </Grid>

            <Grid
              spacing={4}
              sx={{
                textAlign: "left",
               
                display: {
                  xs: "flex",
                  md: "none",
                },
                flexDirection: "column",
                justifyContent: "center",
              }}
              size={6}
            >
              <Grid
                onClick={handleFilterMobile}
                sx={{
                  display: "flex",
                     border: `1px solid ${colors.borderColor}`, 
                  position: {
                    xs: "absolute",
                  },
                  left: {
                    xs: "7.5%",
                  },
                  flexDirection: "row",
                  justifyContent: "space-between",
                
                 
                  width: "40%",
                  height: "56px",
                  padding: "16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                spacing={4}
              >
                <Grid>filter</Grid>

                <Grid>
                  <TuneSharpIcon />
                </Grid>
              </Grid>
            </Grid>

            <Grid
             onClick={handleSortClick}
              sx={{
                display: "flex",
            
                  border: `1px solid ${colors.borderColor}`,
                position: {
                  xs: "absolute",
                },
                right: {
                  xs: "7.5%",
                },
                flexDirection: "row",
                justifyContent: "space-between",
                
               
            
   
    alignItems: "center",
   
    width: {xs:'40%',md:'156px'},
    height: "56px",
    padding: "16px",
    borderRadius: "8px",
    textAlign: "right",
    cursor: "pointer",
                
              }}
              size={6}
            >
               <Typography
    sx={{
      fontSize: "14px",
      whiteSpace: "nowrap",
    }}
  >
    {priceSort === "lowToHigh" &&
      "Low to High"}

    {priceSort === "highToLow" &&
      "High to Low"}

    {!priceSort &&
      "Sort by price"}
  </Typography>

  <KeyboardArrowDownSharpIcon />
  
             {/* <Grid
 
  sx={{
    display: "flex",
    position: {
      xs: "absolute",
    },
    right: {
      xs: "7.5%",
    },
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   
    width: "164px",
    height: "56px",
    padding: "16px",
    borderRadius: "8px",
    textAlign: "right",
    cursor: "pointer",
  }}
  size={6}
>
 
</Grid> */}


            </Grid>
            <Menu
    anchorEl={sortAnchorEl}
  open={Boolean(sortAnchorEl)}
  onClose={() => setSortAnchorEl(null)}
>
  <MenuItem
    selected={
      priceSort === "lowToHigh"
    }
    onClick={() =>{
      handlePriceSort("lowToHigh")
   
    }}
  >
    Price: Low to High
  </MenuItem>

  <MenuItem
    selected={
      priceSort === "highToLow"
    }
    onClick={() =>{
      handlePriceSort("highToLow")
   
    }}
  >
    Price: High to Low
  </MenuItem>
</Menu>

          </Grid>
          
        </Grid>
           <Box sx={{position:'absolute',left:'7.5%',width:'100%',display:{xs:'flex',md:'none'},flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:'42px',marginBottom:'28px'}}>
            <span
            style={{
              color: `${colors.textColorHeader}`,
              display:'inline-block',
              fontSize: "16px",
              fontWeight: "500",
              
            
            }}
          >
            Selected Products:
          </span>

          &nbsp;

          <span
            style={{
              color: `${colors.charocal}`,
                 display:'inline-block',
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
         {   productsToDisplay.length}
          </span>

          </Box>
          </Grid>
         
           {isLoading ? (
  <ProductSkeleton count={8} />
) : (
  productsToDisplay.map((product: IProductType) => (
    <ProductCard key={product._id} product={product} />
  ))
)}
          </Box>
        

       {!isLoading && productsToDisplay.length === 0 && (
<Box
  sx={{
    border: "1px dashed #d0d0d0",
    borderRadius: "16px",
    minHeight: { xs: "320px", md: "48.72vh" },
    margin: { xs: "16px 0", md: "24px 0" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: "16px",
    padding: "24px",
  }}
>
  <SearchOffOutlinedIcon
    sx={{ fontSize: { xs: 48, md: 64 }, color: "#b5b5b5" }}
  />

  <Typography
    sx={{
      fontSize: { xs: "18px", md: "24px" },
      fontWeight: 600,
      color: colors.charocal,
    }}
  >
    No products found
  </Typography>

  <Typography
    sx={{
      fontSize: { xs: "14px", md: "18px" },
      color: colors.textBanner,
      maxWidth: "360px",
    }}
  >
    Try adjusting your filters or search to find what you're looking for.
  </Typography>

  {/* <Button
  
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
    Clear filters
  </Button> */}
</Box>
)}
        </Grid>
            {(isLoading || filteredproducts.length !== 0) && (
  <Grid
    sx={{display:{xs:'none',md:'flex'},position:'absolute',left:'10px  ',top:'0%' ,height:'85vh',overflow:'auto'}}
    size={{ xs: 12, md:4}}
  >
    {isLoading ? (
      <Loading  variant="section"  />
    ) : (
      <FilterUser
        filteredProducts={filteredproducts}
        filteredproducts={filteredproducts}
      />
    )}
  </Grid>
)}


      </Grid>
    </Stack>
  );
}