import * as React from 'react';

import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { Breadcrumbs } from '@mui/material';


function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
 interface IBreadCrumbs{
    thirdPage:string,
    fourthPage:string
 }
 
export default function BreadCrumbsIndicator({thirdPage,fourthPage}:IBreadCrumbs) {
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
      Home
    </Link>,
    // <Link
    //   underline="hover"
    //   key="2"
    //   color="inherit"
    //   href="/material-ui/getting-started/installation/"
    //   onClick={handleClick}
    // >
    //   Catalog
    // </Link>,
    <Typography key="3" sx={{ color: 'text.primary' }}>
      {thirdPage}
    </Typography>,
        <Typography key="3" sx={{ color: 'text.primary' }}>
      {fourthPage}
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb" >
        {breadcrumbs}
      </Breadcrumbs>
     
    </Stack>
  );
}
