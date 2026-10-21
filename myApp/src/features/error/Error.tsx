
import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import RefreshIcon from "@mui/icons-material/Refresh";

type ErrorProps = {
  variant?: "fullscreen" | "section" | "inline";
  text?: string;
  onRetry?: () => void;
};

export default function ErrorComp({
  variant = "section",
  text = "Something went wrong. Please try again.",
  onRetry,
}: ErrorProps) {
  const isInline = variant === "inline";

  if (isInline) {
    return (
      <ErrorOutlinedIcon
        sx={{
          color: "error.main",
          fontSize: 20,
        }}
      />
    );
  }

  return (
    <Box
      role="alert"
      aria-live="assertive"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        px: 2,
        textAlign: "center",

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
      <ErrorOutlinedIcon
        sx={{
          color: "error.main",
          fontSize: 44,
        }}
      />

      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          maxWidth: 400,
        }}
      >
        {text}
      </Typography>

      {onRetry && (
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          sx={{
            color: "text.primary",
            borderColor: "divider",
            borderRadius: 2,
            textTransform: "none",
            "&:hover": {
              borderColor: "text.primary",
              bgcolor: "action.hover",
            },
          }}
        >
          Try again
        </Button>
      )}
    </Box>
  );
}
