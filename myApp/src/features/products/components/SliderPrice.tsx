import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import type { SetURLSearchParams } from 'react-router-dom';


const Input = styled(MuiInput)`
  width: 48px;
`;

interface IPriceSliderProps{
  setFilterValuePriceSlider:(filterValuepriceSlider:number)=>void,
  filterValuePriceSlider:number,
  searchParams:URLSearchParams,
  setSearchParams:SetURLSearchParams
}
export default function SliderPrice({searchParams,setSearchParams,filterValuePriceSlider,setFilterValuePriceSlider}:IPriceSliderProps) {
 

  const handleSliderChange = (_event: Event, newValue: number) => {
    setFilterValuePriceSlider(newValue);
        searchParams.set("value", newValue.toString());
      setSearchParams(searchParams);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValuePriceSlider(event.target.value === '' ? 0 : Number(event.target.value));
     searchParams.set("value", event.target.value.toString());
      setSearchParams(searchParams);
  };

  const handleBlur = () => {
    if (filterValuePriceSlider < 0) {
      setFilterValuePriceSlider(0);
    } else if (filterValuePriceSlider > 5000) {
      setFilterValuePriceSlider(5000);
    }
  };

  return (
    <Box  sx={{
        width: {
          xs: "100%", // mobile
          sm: 240,    // laptop and larger
        },
        maxWidth: "100%",
      }}>
   
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
       
        <Grid size="grow">
          <Slider
          max={5000}
            value={typeof filterValuePriceSlider === 'number' ? filterValuePriceSlider : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
             sx={{
              width: "100%",
            }}
            
          />
        </Grid>
        <Grid >
          <Input
          sx={{width:'55px'}}
            value={filterValuePriceSlider}
            size="medium"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 50,
              min: 0,
              max: 5000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
