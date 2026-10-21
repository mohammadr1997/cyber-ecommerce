import { Box, CircularProgress, Typography } from "@mui/material";
import {colors} from "@/constants/colors";
type LoadingProps = {
  
  variant?: "fullscreen" | "section" | "inline";
  text?: string;
  size?: number;
};

const BRAND = `${colors.charocal}`;

export default function Loading({
  variant = "section",
  text,
  size,
}: LoadingProps) {
  const spinnerSize = size ?? (variant === "inline" ? 20 : 44);

  const spinner = (
    <CircularProgress
      size={spinnerSize}
      thickness={4}
      sx={{ color: BRAND }}
    />
  );

  if (variant === "inline") return spinner;

  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        ...(variant === "fullscreen"
          ? {
              position: "fixed",
              inset: 0,
              zIndex: 2000,
              bgcolor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(2px)",
            }
          : {
              width: "100%",
              minHeight: 300,
              py: 6,
            }),
      }}
    >
      {spinner}
      {text && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {text}
        </Typography>
      )}
    </Box>
  );
}