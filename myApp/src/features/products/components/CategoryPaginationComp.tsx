import { Box, IconButton } from "@mui/material";

import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

interface IPaginationArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
}

export default function CategoryPaginationComp({
  onPrev,
  onNext,
  disablePrev,
  disableNext,
}: IPaginationArrowsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: { xs: 1, md: 2 },
        width: "100%",
      }}
    >
      <IconButton
        onClick={onPrev}
        disabled={disablePrev}
        sx={{
          width: { xs: (theme) => theme.spacing(2), md: (theme) => theme.spacing(6) },
          height: { xs: (theme) => theme.spacing(2), md: (theme) => theme.spacing(6) },
       
        
          
          "&.Mui-disabled": { opacity: 1 },
        }}
      >
        <ArrowBackIosNewOutlinedIcon sx={{ fontSize: { xs: "15px", md: "25px" } ,color:'black'}} />
      </IconButton>

      <IconButton
        onClick={onNext}
        disabled={disableNext}
        sx={{
          width: { xs: (theme) => theme.spacing(2), md: (theme) => theme.spacing(6) },
          height: { xs: (theme) => theme.spacing(2), md: (theme) => theme.spacing(6) },
        
          "&.Mui-disabled": { opacity: 1 },
        }}
      >
        <ArrowForwardIosOutlinedIcon sx={{ fontSize: { xs: "15px", md: "25px" } ,color:'black'}} />
      </IconButton>
    </Box>
  );
}