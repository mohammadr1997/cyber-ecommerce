import LinearProgress from "@mui/material/LinearProgress";
import { colors } from "@/constants/colors";
interface ProgressBarProps {
  value: number;
}

export default function ProgressBar({
  value,
}: ProgressBarProps) {
  return (
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        width:{xs:'100%',md:'100%'},
        height: 8,
        borderRadius: 4,
        backgroundColor:   `${colors.backgroundCategory}`,

        "& .MuiLinearProgress-bar": {
          backgroundColor: "#FFC107",
        },
      }}
    />
  );
}