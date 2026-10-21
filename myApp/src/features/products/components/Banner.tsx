import { colors } from "@/constants/colors"
import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { getBannerImageUrl, getProductImageUrl } from "@/constants/api";
import useProductsQuery from "../hooks/useProductsQuery";
import { type IProduct } from "./ProductListUser";
import { useNavigate } from "react-router-dom";
interface IBannerProps{
    type:string,
    description:string,
    imageUrl:string,
    name:string,
    lastOrFirst?:string
}
export default function Banner({type,imageUrl,description,name,lastOrFirst='first'}:IBannerProps) {
  const navigate=useNavigate()
   const {data:products}=useProductsQuery()
const handleBanner=(name:string)=>{
console.log('check name banner',name)
if(products){
  const existingProducts=products.data?.data
  const bannerProduct=existingProducts.find((product:IProduct)=>name==product.name)
  
 if(bannerProduct){
  navigate(`/catalog/product/${bannerProduct._id}`)
 }
}
}
   return (<>
   {type==='banner' && <Box sx={{display:'flex',width:'100%',height:{xs:`${lastOrFirst=='first'?'810px':''}`,md:`${lastOrFirst=='first'?'585px':''}`}, overflow:'hidden',justifyContent:'center',backgroundColor:`${type=='banner' &&lastOrFirst=='first'? colors.charocal : colors.backgroundCategory }`}}>

        <Grid spacing={6} sx={{display:'flex',padding:'25px',justifyContent:{xs:'center',md:'start'},mx:'48px auto',marginTop:{xs:'30px'},   margin: { md: '2px' },flexDirection:{xs:'column',md:'row'}}}>
<Stack  sx={{display:'flex',justifyContent:'center',marginTop:{xs:`${lastOrFirst==='first' && '-50px'}`}}}  direction={'column'} spacing={4}>
    <Grid sx={{display:'flex',justifyContent:{xs:'center',md:'start'}}}><h3 style={{fontSize:'25px',textAlign:'center',fontWeight:'500',color:`${lastOrFirst=='first'? colors.mainWhite : colors.charocal}`}}>Pro.Beyond</h3></Grid>
<Grid sx={{display:'flex',justifyContent:{xs:'center',md:'start'}}}>
      <Typography variant="h1" sx={{fontSize:{xs:'20px',md:'40px'},color:`${lastOrFirst=='first'? colors.text : colors.charocal}`,fontWeight:'500',textAlign:'left'}}>{name}</Typography>
 
</Grid>
            
           <Grid sx={{display:'flex',justifyContent:{xs:'center',md:'start'}}}> <span style={{textAlign:'left',direction:'ltr',color:`${lastOrFirst=='first'? colors.secondary : colors.textBanner}`}}>{description}</span></Grid>
           <Grid sx={{display:'flex',width:'100%',justifyContent:{xs:'center',md:'start'}}}><Button onClick={()=>handleBanner(name)}  sx={{      minWidth: 0, boxSizing: 'border-box', whiteSpace: 'nowrap',border: `1px solid ${colors.mainWhite}` ,width: { xs: '210px!important', md: '184px' },textAlign:'center',  padding: { xs: '16px 20px', md: '14px 56px' },fontSize:{xs:'14px',md:'16px'},fontWeight:'500',borderRadius:'6px',backgroundColor:`${colors.charocal}`,borderColor:`${colors.mainWhite}`,color:`${colors.mainWhite}`}}>Shop Now</Button></Grid>      
</Stack>
<Stack sx={{marginLeft:{xs:'0',md:'48px'},marginTop:{xs:'',md:'-70px'}}}>
     <Grid  sx={{display:'flex',justifyContent:{xs:'center',md:'end'},mx:'48px 250px'}}><Box
  component="img"
src={getBannerImageUrl(imageUrl)}
  alt={name}
  sx={{
    width: {
      xs: "370px",
      md: "440px",
    },
    height: {
      xs: `${lastOrFirst=='first'? '510px':'450px'}`,
      md: `${lastOrFirst=='first'? '600px':'535px'}`,
    },
    marginTop:{xs:'110px',md:'120px'},
   
    objectFit: "cover",
  }}
/></Grid>      
    
</Stack>
    </Grid>
   
  
        
      

     
    </Box>}
 
   {type==='small' && 
     
            <Grid    sx={{display:'flex',width:{xs:'100%',md:'100%'},flexDirection:{xs:'column',md:'row'},gap:'24px',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        <Stack sx={{display:'flex',justifyContent:'center',width:'50%'}}>
           <Box
  component="img"
src={getProductImageUrl(imageUrl)}
  alt={name}
  sx={{
    width: {
      xs: "192px",
      md: "400px",
    },
    height: {
      xs: "200px",
      md: "300px",
    },
    margin: "0 auto",
    objectFit: "contain",
  }}
/>
        </Stack>
        
        <Stack  sx={{width:'50%',marginLeft:{md:'35px'}}} direction={'column'} spacing={'32px'}>
            <Typography sx={{width:'100%',textAlign:'center',fontSize:{xs:'34px',md:'49px'},fontWeight:'500',color:`${colors.charocal}`}}>{name}</Typography>
            <p style={{textAlign:'center',fontSize:'14px',fontWeight:'400',color:`${colors.textBanner}`}}>{description}</p>
        </Stack>
        </Grid>
  
        
      }

   
   </>) 
  
 
}
