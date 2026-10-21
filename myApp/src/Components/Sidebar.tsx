
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
export default function Sidebar() {

  const navigate=useNavigate()
const sidebarList=[{
    name:'category',
    icon:<CategoryIcon/>,
    url:'/admin/category'
},
{
    name:'brand',
    icon:<BrandingWatermarkIcon/>,
    url:'/admin/brand'
},
{
    name:'products',
    icon:<Inventory2Icon/>,
    url:'/admin/products'
},
{
    name:'banner',
    icon:<BrokenImageOutlinedIcon/>,
    url:'/admin/banner'
},
{
    name:'attributes',
    icon:<EditAttributesIcon/>,
    url:'/admin/attributes'
},
{
    name:'order',
    icon:<ShoppingBagIcon/>,
    url:'/admin/order'
},
{
    name:'user',
    icon:<PersonIcon/>,
    url:'/admin/user'
},
{
    name:'review',
    icon:<ReviewsIcon/>,
    url:'/admin/review'
}
]



const handleClick=(_event:React.MouseEvent<HTMLDivElement, MouseEvent>,url:string)=>{
  navigate(url)

}
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
      <List>
        {sidebarList.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={(event)=>handleClick(event,item.url)}>
              <ListItemIcon>
               {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      
      <Drawer variant='persistent' hideBackdrop open={true} sx={{
    "& .MuiDrawer-paper": {
     mt: {
        xs: 8, 
        sm: 9, 
      },
    },
  }} >
        {DrawerList}
      </Drawer>
    </div>
  );
}
