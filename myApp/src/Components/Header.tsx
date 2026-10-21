import { colors } from "@/constants/colors";
import logo from "@/assets/logo/logo-on-light.svg";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import WatchOutlinedIcon from "@mui/icons-material/WatchOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import {
  Badge,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";



import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import useHandleNavigateCategory from "@/features/products/hooks/useHandleNavigateCategory";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { useNavigate } from "react-router-dom";
import useGetCart from "@/features/cart/hooks/useGetCart";
import { useState } from "react";
import { GridCloseIcon } from "@mui/x-data-grid";
import useGetWishlist from "@/features/whisllist/hooks/useGetWishlist";
import Search from "@/features/header/components/Search";


// ==============================
// TOP MENU ITEMS
// ==============================

const menuItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Contact Us",
    path: "/contact",
  },
  {
    label: "Blog",
    path: "/blog",
  },
];
const menuItemMobile = [
  {
    label: "Home",
    path: "/",
    icon: HomeOutlinedIcon,
  },
  {
    label: "About",
    path: "/about",
    icon: InfoOutlinedIcon,
  },
  {
    label: "Contact Us",
    path: "/contact",
    icon: ContactMailOutlinedIcon,
  },
  {
    label: "Blog",
    path: "/blog",
    icon: ArticleOutlinedIcon,
  },
];


const categoryItems = [
  {
    label: "Phones",
    icon: PhoneAndroidOutlinedIcon,
   
  },
  {
    label: "Computers",
    icon: LaptopOutlinedIcon,
   
  },
  {
    label: "Smart watches",
    icon: WatchOutlinedIcon,
   
  },
  {
    label: "Cameras",
    icon: PhotoCameraOutlinedIcon,
   
  },
    {
    label: "HeadPhones",
    icon: HeadphonesOutlinedIcon,
   
  },
    {
    label: "Gaming",
    icon: SportsEsportsOutlinedIcon,
  
  },
];
// const categoryItems = [
//   {
//     label: "Phones",
//     icon: phone,
//   },
//   {
//     label: "Computers",
//     icon: computer,
//   },
//   {
//     label: "Smart watches",
//     icon: gaming,
//   },
//   {
//     label: "Cameras",
//     icon: camera,
//   },
//   {
//     label: "HeadPhones",
//     icon: headPhone,
//   },
//   {
//     label: "Gaming",
//     icon: gaming,
//   },
// ];


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {data:cartproducts}=useGetCart()
  const {data:whishlistproducts}=useGetWishlist()
  const badgeCounterCart=cartproducts?.data.data.items.length ?? 0
  const badgeCounterWishlist=whishlistproducts?.data.data.items.length ?? 0
  const handleNavigate = useHandleNavigateCategory();
const handleMobileMenu=()=>{
  setMobileMenuOpen((prev) => !prev);
}

  // ==============================
  // SHOPPING CART
  // ==============================

  const handleShoppingCart = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/sign-in");
         setMobileMenuOpen(false)
      return;
    }

    navigate("/cart");
       setMobileMenuOpen(false)
  };
const handleWhishlist = () => {
  navigate("/whishlist");
     setMobileMenuOpen(false)
}

  // ==============================
  // CATEGORY NAVIGATION
  // ==============================

  const handleCategoryClick = (category: string) => {
    handleNavigate(category);
  };


  return (
    <header
      style={{
        width: "100%",
        backgroundColor: colors.backgroundPrimary,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <nav
        style={{
          width: "100%",
        }}
      >

        {/* ===================================== */}
        {/* MAIN HEADER */}
        {/* ===================================== */}

        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            mx: "0 auto",
            display: "flex",
            justifyContent: {
              xs: "space-between",
              md: "space-evenly",
            },
            padding: "15px",
            alignItems: "center",
            gap: "15px",
          }}
        >

          {/* ============================== */}
          {/* LOGO */}
          {/* ============================== */}

          <Grid>
            <Box
            component="img"
              src={logo}
              alt="logo"
             
             
              sx={{
                width: {xs:'100px',md:'120px'},
                height: {xs:'100px',md:'120px'},
              }}
            />
         
          </Grid>


          {/* ============================== */}
          {/* SEARCH */}
          {/* ============================== */}

        <Search/>


          {/* ============================== */}
          {/* MOBILE MENU BUTTON */}
          {/* ============================== */}

          <Grid
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <IconButton>
              <MenuOutlinedIcon onClick={handleMobileMenu} fontSize="large" />
            </IconButton>
          </Grid>


          {/* ============================== */}
          {/* TOP NAVIGATION */}
          {/* ============================== */}

          <Grid
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
            }}
          >

            {menuItems.map((item) => (
              <IconButton
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  fontSize: "16px",
                  mx: "20px",
                  color: "inherit",
                }}
              >
                {item.label}
              </IconButton>
            ))}

          </Grid>


          {/* ============================== */}
          {/* WISHLIST / CART / ACCOUNT */}
          {/* ============================== */}

          <Grid
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
            }}
          >

            {/* Wishlist */}

            <IconButton onClick={handleWhishlist}>
                    <Badge badgeContent={badgeCounterWishlist} color="info"><FavoriteBorderOutlinedIcon />
</Badge>
            </IconButton>


            {/* Cart */}

            <IconButton
              onClick={handleShoppingCart}
            >
              <Badge
                badgeContent={badgeCounterCart}
            color="info"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>



            <IconButton
              onClick={() => navigate("/profile")}
            >
              <PersonOutlineOutlinedIcon />
            </IconButton>

          </Grid>


        </Grid>


        <Divider />



        <Grid
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },

            flexDirection: "row",

            backgroundColor: colors.charocalSecondary,

            width: "100%",

            justifyContent: "space-evenly",

            textAlign: "center",

            alignItems: "center",
          }}
        >

          {categoryItems.map((item) => {
            const Icon=item.icon
            return     <Grid
              key={item.label}
              onClick={() => handleCategoryClick(item.label)}
              sx={{
                padding: "5px",

                display: "flex",

                alignItems: "center",

                justifyContent: "center",

                cursor: "pointer",

                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >

              <Icon
        sx={{  
          fontSize: 24,
          color: colors.secondary,
        }}
      />

              <span
                style={{
                  color: colors.secondary,
                  padding: "10px",
                }}
              >
                {item.label}
              </span>

            </Grid>
          }

        

          )}

        </Grid>
<Drawer
    anchor="right"
    open={mobileMenuOpen}
    onClose={() => setMobileMenuOpen(false)}
    slotProps={{
    paper: {
      sx: {
        width: {
          xs: "100%",
          sm: 360,
        },
        maxWidth: "100%",
        backgroundColor: `${colors.backgroundPrimary}`,
        color: "#fff",
      },
    },
  }}
  >
    <Box sx={{ position: "relative",display:'flex',flexDirection:'column',flexWrap:'nowrap',gap:'10px',justifyContent:'center' }}>
      <Grid sx={{display:'flex',flexDirection:'row',flexWrap:'nowrap',gap:'10px',justifyContent:'space-between',marginTop:'40px'}}>
        <Grid>
          <IconButton
        onClick={() => setMobileMenuOpen(false)}
        sx={{
         
          color: `${colors.charocal}`,
        }}
      >
        <GridCloseIcon />
      </IconButton>
       </Grid>
      <Grid> <img
              src={logo}
              alt="logo"
              style={{
                width: "55px",
                height: "55px",
              }}
            /></Grid>
            <Grid sx={{display:'flex',flexDirection:'row',gap:'8px',justifyContent:'space-evenly'}}>
 <IconButton onClick={handleWhishlist} sx={{  color: `${colors.charocal}`}}>
                    <Badge badgeContent={badgeCounterWishlist} color="info"><FavoriteBorderOutlinedIcon />
</Badge>
          
        </IconButton>

        <IconButton  onClick={handleShoppingCart} sx={{ color: `${colors.charocal}` }}>
          <Badge badgeContent={badgeCounterCart} color="info">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>

        <IconButton onClick={()=>{
          navigate('/profile')
          setMobileMenuOpen(false)
          
          }} sx={{ color: `${colors.charocal}`}}>
          <PersonOutlineOutlinedIcon />
        </IconButton>
            </Grid>
       
        
       
      </Grid>
      <Grid>
        
      </Grid>
  
      

    

    
      <List sx={{ px: 2,display:'flex',justifyContent:'flex-end',flexDirection:'column',textAlign:'right',width:'100%'}}>
       {menuItemMobile.map((item) => {
  const Icon = item.icon;

  return (
    
    <ListItemButton
      key={item.label}
      onClick={() => {
        navigate(`${item.path}`)
        setMobileMenuOpen(false)}}
      sx={{
        borderRadius: 2,
        mb: 0.5,
        color: colors.charocal,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "8px",
        textAlign: "left",

      
      }}
    >
      {/* MUI Icon */}
      <Icon
        sx={{
          fontSize: 24,
          color: colors.charocal,
        }}
      />

      {/* Text */}
      <ListItemText
        primary={
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 500,
              color: colors.charocal,
            }}
          >
            {item.label}
          </Typography>
        }
      />
    </ListItemButton>
  );
})}

      </List>
    <Box
  sx={{
    backgroundColor: colors.backgroundCategory,
    width: "90%",
    height: "2.5px",
    mx: "auto",
  }}
/>
    
       <List sx={{ px: 2,display:'flex',justifyContent:'flex-end',flexDirection:'column',textAlign:'right',width:'100%'}}>
        {categoryItems.map((category:{label:string,icon:React.ElementType},index:number)=>{
const Icon=category.icon
  return  <ListItemButton
            key={index}
            onClick={() => {
              handleNavigate(category.label)
              setMobileMenuOpen(false)}}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              color: `${colors.charocal}`,
              display:'flex',
              flexDirection:'row',
          
              justifyContent:'flex-start',
              gap:'8px',
                textAlign:'left',
             
            }}
          >
      <Icon
        sx={{
          fontSize: 24,
          color: colors.charocal,
        }}
      />

   <ListItemText
  primary={
    <Typography
      sx={{
        fontSize: 18,
        fontWeight: 500,
        color: `${colors.charocal}`,
      }}
    >
      {category.label}
    </Typography>
  
  }
/>
          </ListItemButton>
})}
      
       </List>
   
    </Box>
  </Drawer>
      </nav>
    </header>
  );
}