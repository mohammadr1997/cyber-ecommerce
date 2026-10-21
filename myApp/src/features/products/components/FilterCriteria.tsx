import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Typography, type SelectChangeEvent } from "@mui/material";
import SliderPrice from "./SliderPrice";

import type { SetURLSearchParams } from "react-router-dom";

interface IFilterCriteriaProps{
  searchParams:URLSearchParams,
  setSearchParams:SetURLSearchParams,
  criteria:string,
  setCriteria:(criteria:string)=>void,
  setFilterValuePriceSlider:(filterValuepriceSlider:number)=>void,
  filterValuePriceSlider:number
}
  export default function FilterCriteria ({filterValuePriceSlider,setFilterValuePriceSlider,setCriteria,criteria,searchParams,setSearchParams}:IFilterCriteriaProps){

     
  const handleChange = (event: SelectChangeEvent) => {
    setCriteria(event.target.value as string);
     searchParams.set("criteria", event.target.value);
      setSearchParams(searchParams);
  
  };


    return (

        <>
        
         <Paper  sx={{
        p: 2,
        width: "100%",
        boxSizing: "border-box",
      }} elevation={2} >
            <Typography variant="h5"  sx={{ mb: 2 }}>filter by options...</Typography>
           <Stack direction={{ xs: "column", sm: "row" }}  sx={{
          width: "100%",
        }} spacing={1}>
              <Grid   size={{ xs: 12, sm: 3 }}>
               
                 <FormControl  fullWidth>
  <InputLabel id="demo-simple-select-label">Price</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={criteria}
    label="Age"
    onChange={handleChange}
 
  >
    <MenuItem value={'from'}>From</MenuItem>
    <MenuItem value={'to'}>To</MenuItem>
  
  </Select>
</FormControl>
              </Grid>
              <Grid  size={{ xs: 12, sm: 4 }} sx={{
            width: { xs: "100%", sm: "auto" },
          }}>
                 <SliderPrice searchParams={searchParams} setSearchParams={setSearchParams} filterValuePriceSlider={filterValuePriceSlider} setFilterValuePriceSlider={setFilterValuePriceSlider}/>
                </Grid> 
  
          </Stack>
        </Paper>
        </>
    )
  }
  
 