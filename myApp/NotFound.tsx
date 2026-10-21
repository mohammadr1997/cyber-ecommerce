import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {colors} from './src/constants/colors'
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 2,
        px: 2,
        bgcolor: `${colors.mainWhite}`,
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: 96, md: 160 },
          fontWeight: 700,
          lineHeight: 1,
          color: `${colors.charocal}`,
          letterSpacing: "-4px",
        }}
      >
        404
      </Typography>

      <Typography sx={{ fontSize: { xs: 22, md: 32 }, fontWeight: 600, color: "#141011" }}>
        Page not found
      </Typography>

      <Typography sx={{ maxWidth: 420, color: "#6b6b6b", fontSize: 16 }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap", justifyContent: "center" }}>
        <Button
          onClick={() => navigate("/")}
          sx={{
            bgcolor: "#141011",
            color: "#fff",
            px: 5,
            py: 1.5,
            borderRadius: "8px",
            fontWeight: 600,
            "&:hover": { bgcolor: "#2a2427" },
          }}
        >
          BACK TO HOME
        </Button>
        <Button
          onClick={() => navigate(-1)}
          sx={{
            border: "1px solid #141011",
            color: "#141011",
            px: 5,
            py: 1.5,
            borderRadius: "8px",
            fontWeight: 600,
          }}
        >
          GO BACK
        </Button>
      </Box>
    </Box>
  );
}