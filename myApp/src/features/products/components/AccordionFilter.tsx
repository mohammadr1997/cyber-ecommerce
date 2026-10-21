import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/PriceCheck";
 import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import TuneIcon from "@mui/icons-material/Tune";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import ComputerIcon from "@mui/icons-material/Computer";

import MemoryIcon from "@mui/icons-material/Memory";
import StorageIcon from "@mui/icons-material/Storage";
import MonitorIcon from "@mui/icons-material/Monitor";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import WifiIcon from "@mui/icons-material/Wifi";

import PaletteIcon from "@mui/icons-material/Palette";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import CameraIcon from "@mui/icons-material/Camera";

import SecurityIcon from "@mui/icons-material/Security";
import { GridExpandMoreIcon } from "@mui/x-data-grid";
import { useMemo, useState } from "react";

import { colors } from "@/constants/colors";
import SliderFilter from "./SliderFilter";

import type { ICategoryAttribute } from "@/apis/categoryAttributeApi";

import {
  MAX_PRICE,
  MIN_PRICE,
} from "@/features/products/hooks/useProductFilters";

import {
  useProductFilterContext,
} from "../context/useProductFilterContext";
interface IAccordionFilter {
  brands: (string | undefined)[] | undefined;
  attributes?: ICategoryAttribute[];

  filteredproducts?: any[];

  onFilteredProductsChange?: (
    products: any[]
  ) => void;
}

export default function AccordionFilter({
  brands,
  attributes,
}: IAccordionFilter) {

  const {
    price: rawPrice,
    selectedBrands: rawSelectedBrands,
    selectedAttributes: rawSelectedAttributes,
    setPrice,
    toggleBrand,
    toggleAttribute,
  } = useProductFilterContext();

  // =================================================
  // SAFE VALUES
  // =================================================

  
  const price: [number, number] =
    Array.isArray(rawPrice) &&
    rawPrice.length === 2
      ? [rawPrice[0], rawPrice[1]]
      : [MIN_PRICE, MAX_PRICE];

  const selectedBrands =
    Array.isArray(rawSelectedBrands)
      ? rawSelectedBrands
      : [];

  const selectedAttributes =
    rawSelectedAttributes &&
    typeof rawSelectedAttributes === "object"
      ? rawSelectedAttributes
      : {};

  // =================================================
  // SEARCH
  // =================================================

  const [brandSearch, setBrandSearch] =
    useState("");

  const [attributeSearch, setAttributeSearch] =
    useState<Record<string, string>>({});

  // =================================================
  // UNIQUE BRANDS
  // =================================================

  const uniqueBrands = useMemo(() => {
    return [...new Set(brands ?? [])].filter(
      (brand): brand is string =>
        typeof brand === "string" &&
        brand.length > 0
    );
  }, [brands]);

  // =================================================
  // VISIBLE BRANDS
  // =================================================

  const visibleBrands = useMemo(() => {
    const search = brandSearch
      .toLowerCase()
      .trim();

    if (!search) {
      return uniqueBrands;
    }

    return uniqueBrands.filter((brand) =>
      brand.toLowerCase().includes(search)
    );
  }, [uniqueBrands, brandSearch]);

  // =================================================
  // SLIDER
  // =================================================

  const handleSliderChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue.length !== 2) {
      return;
    }

    setPrice([
      newValue[0],
      newValue[1],
    ]);
  };

  // =================================================
  // FROM PRICE
  // =================================================

  const handleFromChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;

    if (inputValue === "") {
      return;
    }

    let from = Number(inputValue);

    if (Number.isNaN(from)) {
      return;
    }

    if (from < MIN_PRICE) {
      from = MIN_PRICE;
    }

    if (from > price[1]) {
      from = price[1];
    }

    setPrice([
      from,
      price[1],
    ]);
  };

  // =================================================
  // TO PRICE
  // =================================================

  const handleToChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;

    if (inputValue === "") {
      return;
    }

    let to = Number(inputValue);

    if (Number.isNaN(to)) {
      return;
    }

    if (to > MAX_PRICE) {
      to = MAX_PRICE;
    }

    if (to < price[0]) {
      to = price[0];
    }

    setPrice([
      price[0],
      to,
    ]);
  };

  // =================================================
  // ATTRIBUTE SEARCH
  // =================================================

  const handleAttributeSearch = (
    attributeKey: string,
    value: string
  ) => {
    setAttributeSearch((current) => ({
      ...current,
      [attributeKey]: value,
    }));
  };

  // =================================================
  // VISIBLE ATTRIBUTE OPTIONS
  // =================================================



  // =================================================
  // STYLES
  // =================================================

  const accordionSx = {
    backgroundColor:
      colors.backgroundPrimary,

    boxShadow: "none",

    border: "none",

    "&::before": {
      display: "none",
    },

    "&.Mui-expanded": {
      margin: 0,
    },
  };

  const searchFieldSx = {
    borderRadius: "8px",

    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor:
          colors.borderColorFilter,
      },
    },
  };
const attributeIcons: Record<string, React.ElementType> = {
  // Gaming
  platform: SportsEsportsIcon,
  product_type: TuneIcon,
  connectivity: BluetoothIcon,
  rgb_lighting: PaletteIcon,
  compatible_platform: SportsEsportsIcon,
  wireless: WifiIcon,
  warranty: SecurityIcon,

  // Headphone
  headphone_type: HeadphonesIcon,
  noise_cancellation: HeadphonesIcon,
  battery_life: BatteryFullIcon,
  microphone: HeadphonesIcon,
  water_resistance: WaterDropIcon,
  foldable: HeadphonesIcon,

  // Camera
  camera_type: CameraAltIcon,
  megapixels: CameraIcon,
  sensor_size: CameraIcon,
  video_resolution: CameraIcon,
  iso_range: CameraIcon,
  lens_mount: CameraIcon,
  image_stabilization: CameraIcon,

  // Smartwatch
  display_size: MonitorIcon,
  heart_rate_monitor: FitnessCenterIcon,
  battery_capacity: BatteryFullIcon,
  storage_capacity: StorageIcon,
  gps: GpsFixedIcon,
  weight: FitnessCenterIcon,

  // Computer
  processor: MemoryIcon,
  storage_type: StorageIcon,
  graphics_card: ComputerIcon,
  screen_size: MonitorIcon,
  operating_system: ComputerIcon,
  ram: MemoryIcon,
  number_of_cores: MemoryIcon,

  // Phone
  main_camera: CameraIcon,
  front_camera: CameraIcon,
  cpu: MemoryIcon,
};
  // =================================================
  // RENDER
  // =================================================

  return (
    <Paper elevation={4} sx={{     width: "100%",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        backgroundColor:  `${colors.backgroundPrimary}`,
       }} >
          <Box
     
      sx={{
     
        backgroundColor:
          colors.backgroundPrimary,

        width: "100%",
          overflowY: {
      xs: 'visible',
    
    },
    height:{md:'100vh'},
    maxHeight: {
      
      md: '120vh',
    },

        display: "flex",

        flexDirection: "column",

        gap: "24px",

        padding: "12px",
      }}
    >
      <Typography sx={{display: {md: 'flex',xs:'none'},textAlign:'left',fontSize:'24px',fontWeight:'600'}}>Filters</Typography>
      <Divider   sx={{
    
    border:'1px solid #d6d3d3',
    opacity: 0.5,
    width: "100%",
    margin:'0 auto',
    display: {md: 'flex',xs:'flex'},
    
  }}/>
      {/* ========================================= */}
      {/* PRICE */}
      {/* ========================================= */}

      <Accordion
        sx={accordionSx}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={
            <GridExpandMoreIcon />
          }
          aria-controls="price-panel"
          id="price-header"
        >
         <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1,
  }}
>
  <PaymentsIcon fontSize="small" />
  <Typography component="span">Price</Typography>
</Box>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* FROM */}

            <Grid
              size={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  textAlign: "left",
                  paddingLeft: "12px",
                  color:
                    colors.textColorHeader,
                }}
              >
                From
              </Typography>

              <TextField
                type="number"
                value={price[0]}
                onChange={handleFromChange}
                size="small"
                slotProps={{
                  htmlInput: {
                    min: MIN_PRICE,
                    max: MAX_PRICE,
                  },
                }}
              />
            </Grid>

            {/* TO */}

            <Grid
              size={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  textAlign: "left",
                  paddingLeft: "12px",
                  color:
                    colors.textColorHeader,
                }}
              >
                To
              </Typography>

              <TextField
                type="number"
                value={price[1]}
                onChange={handleToChange}
                size="small"
                slotProps={{
                  htmlInput: {
                    min: MIN_PRICE,
                    max: MAX_PRICE,
                  },
                }}
              />
            </Grid>
    
          </Grid>
   
          {/* SLIDER */}

          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <SliderFilter
              value={price}
              handleSliderChange={
                handleSliderChange
              }
              min={MIN_PRICE}
              max={MAX_PRICE}
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
          <Divider   sx={{
    
    border:'1px solid #d6d3d3',
    opacity: 0.5,
    width: "100%",
    display: {md: 'flex',xs:'flex'},
    margin:'0 auto'
    
  }}/>
      {/* ========================================= */}
      {/* BRAND */}
      {/* ========================================= */}

      <Accordion
        sx={accordionSx}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={
            <GridExpandMoreIcon />
          }
          aria-controls="brand-panel"
          id="brand-header"
        >
             <Box
  sx={{
    display: "flex",
    alignItems: "center",
    gap: 1,
  }}
>
  <BrandingWatermarkIcon fontSize="small" />
  <Typography component="span">Brand</Typography>
</Box>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* SEARCH */}

          <TextField
            value={brandSearch}
            onChange={(event) =>
              setBrandSearch(
                event.target.value
              )
            }
            sx={searchFieldSx}
            type="text"
            placeholder="Search brand..."
            size="small"
          />

          {/* BRANDS */}

          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "8px",
            }}
          >
            {visibleBrands.map((brand) => (
              <Grid
                key={brand}
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 400,
                    color:
                      colors.textColorHeader,
                  }}
                >
                  {brand}
                </Typography>

                <input
                  type="checkbox"
                  checked={selectedBrands.includes(
                    brand
                  )}
                  onChange={() =>
                    toggleBrand(brand)
                  }
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
   <Divider   sx={{
    
    border:'1px solid #d6d3d3',
    opacity: 0.5,
    width: "100%",
    margin:'0 auto',
    display: {md: 'flex',xs:'flex'},
    
  }}/>
      {/* ========================================= */}
      {/* FIRST ATTRIBUTE ONLY */}
      {/* ========================================= */}

   {/* ALL ATTRIBUTES */}

{attributes
  ?.filter((attribute) => attribute.type === "select")
  .map((attribute,index:number) => {
  const attributeKey = attribute.key;
  const attributeName = attribute.name;
  const options = attribute.options ?? [];
  const AttributeIcon = attributeIcons[attributeKey] ?? TuneIcon;

  const search =
    (attributeSearch[attributeKey] ?? "")
      .toLowerCase()
      .trim();

  const visibleOptions = search
    ? options.filter((option) =>
        option.toLowerCase().includes(search)
      )
    : options;

  return (
    <>
    <Accordion
    
      key={attributeKey}
      sx={accordionSx}
      defaultExpanded
    >
     <AccordionSummary
  expandIcon={<GridExpandMoreIcon />}
  aria-controls={`${attributeKey}-panel`}
  id={`${attributeKey}-header`}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
    }}
  >
    <AttributeIcon fontSize="small" />
    
    <Typography component="span">
      {attributeName}
    </Typography>
  </Box>
</AccordionSummary>

      <AccordionDetails
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        {/* SEARCH */}

        {options.length > 5 && (
          <TextField
            value={attributeSearch[attributeKey] ?? ""}
            onChange={(event) =>
              handleAttributeSearch(
                attributeKey,
                event.target.value
              )
            }
            sx={searchFieldSx}
            type="text"
            placeholder={`Search ${attributeName}...`}
            size="small"
          />
        )}

        {/* OPTIONS */}

        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: "8px",
          }}
        >
          {visibleOptions.map((option) => (
            <Grid
              key={option}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: colors.textColorHeader,
                }}
              >
                {option}
              </Typography>

              <input
                type="checkbox"
                checked={
                  selectedAttributes[attributeKey]?.includes(
                    option
                  ) ?? false
                }
                onChange={() =>
                  toggleAttribute(
                    attributeKey,
                    option
                  )
                }
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
    {index < attributes.filter(
  (item) => item.type === "select"
).length - 1 && (
  <Divider
    sx={{
      border: "1px solid #d6d3d3",
      opacity: 0.5,
      width: "100%",
      margin: "0 auto",
      display: { md: "flex", xs: "flex" },
    }}
  />
)}
    </>
  );
})}

      {/* ========================================= */}
      {/* RESULT COUNT */}
      {/* ========================================= */}

      {/* <Typography
        sx={{
          fontSize: "14px",
          color: colors.textColorHeader,
        }}
      >
        {filteredProducts.length} products
      </Typography> */}
    </Box>
    </Paper>

  );
}