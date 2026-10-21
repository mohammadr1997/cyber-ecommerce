import { Box, Slider } from '@mui/material';

type SliderFilterProps = {
  value: number[];
  min: number;
  max: number;
  handleSliderChange: (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => void;
};

function valuetext(value: number) {
  return `${value}`;
}

export default function SliderFilter({
  value,
  min,
  max,
  handleSliderChange,
}: SliderFilterProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Slider
        getAriaLabel={() => 'Price range'}
        value={value}
        onChange={handleSliderChange}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}