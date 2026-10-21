import { Grid,  Stack } from "@mui/material";
import {colors} from '@/constants/colors'
import logo from '@/assets/logo/Logo (1).png'
import { socialIconsFooter } from "@/constants/footerItems";
import { footerItems } from "@/constants/footerItems";
import { Link } from "react-router-dom";


export default function Footer() {



  return (
  <footer >
  <Grid container sx={{backgroundColor:`${colors.charocal}`,width:'100%',padding:'15px'}}>

    <Grid sx={{display:{xs:'flex',md:'none',flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%'}}}>
        <Grid sx={{marginBottom:'16px',mx:'0 auto',display:'flex',justifyContent:'center'}}>
        <img src={logo} alt='logo' style={{width:'95px',height:'28px'}}/>
        </Grid>
        <Grid sx={{mx:'0 auto',display:'flex',justifyContent:'center',marginBottom:'32px'}}>
          <p style={{fontSize:'13px',fontWeight:'400',textAlign:'center',color:`${colors.text}`}}>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>
        </Grid>
        <Grid sx={{mx:'0 auto',display:'flex',flexDirection:'column',justifyContent:'center',gap:'16px'}}>
     
          <Grid sx={{margin:'0 auto'}}>
            <h5 style={{textAlign:'center',color:`${colors.mainWhite}`,fontWeight:'600',fontSize:'16px',lineHeight:'24px'}}>{footerItems[0].header}</h5>
          </Grid>
       {footerItems[0].item.map((item: { label: string; path: string }) => (
  <Grid key={item.path} sx={{margin:'0 auto'}}>
    <Link to={item.path} style={{textDecoration:'none'}}>
      <span style={{textAlign:'center',color:`${colors.text}`,fontWeight:'400',fontSize:'14px',lineHeight:'20px'}}>{item.label}</span>
    </Link>
  </Grid>
))}
              <Grid sx={{margin:'0 auto'}}>
            <h5 style={{textAlign:'center',color:`${colors.mainWhite}`,fontWeight:'600',fontSize:'16px',lineHeight:'24px'}}>{footerItems[1].header}</h5>
          </Grid>
      {footerItems[1].item.map((item: { label: string; path: string }) => (
  <Grid key={item.path} sx={{margin:'0 auto'}}>
    <Link to={item.path} style={{textDecoration:'none'}}>
      <span style={{textAlign:'center',color:`${colors.text}`,fontWeight:'400',fontSize:'14px',lineHeight:'20px'}}>{item.label}</span>
    </Link>
  </Grid>
))}
         
        </Grid>
        <Grid sx={{mx:'0 auto',display:'flex',justifyContent:'center'}}>
         <Stack direction={'row'} spacing={4} sx={{margin:'42px 0px 10px',}}
         >
          {socialIconsFooter.map((socialItem:{label:string,icon:string,link:string})=>{
            return <a    key={socialItem.label}
      href={socialItem.link}
      target="_blank"
      rel="noopener noreferrer">
            
              <img
        style={{ width: "24px", height: "24px", margin: "0 25px" }}
        src={socialItem.icon}
        alt={socialItem.label}
      /></a>
           
          })}

                   </Stack>
        </Grid>
        <Grid sx={{mx:'0 auto',display:'flex',justifyContent:'center'}}>5</Grid>
    </Grid>
  </Grid>
  <Grid container sx={{display:{
    xs:'none',md:'block'
  },width:'100%',backgroundColor:`${colors.charocal}`}}>

    <Grid direction={'row'} sx={{display:'flex',flexDirection:'row',padding:'60px 80px'}} spacing={'112px'}>
      <Grid size={4} sx={{display:'flex',justifyContent:'start',flexDirection:'column'}}>
        <Stack sx={{display:'flex',flexDirection:'column',justifyContent:'start',gap:'24px'}} direction={'column'}>
           <img style={{width:'96px',height:'32px'}} src={logo} alt="logo.png" />
       
        <p style={{fontSize:'14px',fontWeight:'500',textAlign:'left',color:`${colors.text}`}}>We are a residential interior design firm located in Portland. Our boutique-studio offers more than</p>

        </Stack>
    
             </Grid>
      <Grid size={4} sx={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'16px',marginLeft:'180px'}}>
       <h5 style={{fontSize:'16px',fontWeight:'600',color:`${colors.mainWhite}`}}>{footerItems[0].header}</h5> 
   {footerItems[0].item.map((item: { label: string; path: string }) => (
  <Link
    key={item.path}
    to={item.path}
    style={{
      fontSize: "14px",
      fontWeight: "400",
      color: colors.text,
      textDecoration: "none",
    }}
  >
    {item.label}
  </Link>
))}
     
             </Grid>
   
      <Grid size={4} sx={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'16px',marginLeft:'160px'}}>
       <h5 style={{fontSize:'16px',fontWeight:'600',color:`${colors.mainWhite}`}}>{footerItems[1].header}</h5> 
 

{footerItems[1].item.map((item: { label: string; path: string }) => (
  <Link
    key={item.path}
    to={item.path}
    style={{
      fontSize: "14px",
      fontWeight: "400",
      color: colors.text,
      textDecoration: "none",
    }}
  >
    {item.label}
  </Link>
))}
     
             </Grid>
    </Grid>
    <Stack sx={{display:'flex',justifyContent:'start',marginLeft:'72px',paddingBottom:'100px'}} direction={'row'} spacing={'36px'}>
      {socialIconsFooter.map((socialItem:{icon:string,label:string,link:string})=>{
return <a  key={socialItem.label}
      href={socialItem.link}
      target="_blank"
      rel="noopener noreferrer">
        <img src={socialItem.icon} alt="social icon" style={{cursor:'pointer',width:'16px',height:'16px'}}/>
      </a> 
      })}
      
    </Stack>
  </Grid>
  </footer>
  )
}
