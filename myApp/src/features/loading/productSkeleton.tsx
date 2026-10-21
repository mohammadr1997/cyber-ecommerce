
import { Box, Skeleton } from "@mui/material";

export default function ProductSkeleton({ count = 4 }: { count?: number }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 3,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i}>
          <Skeleton variant="rounded" height={220} />
          <Skeleton width="80%" sx={{ mt: 1 }} />
          <Skeleton width="40%" />
        </Box>
      ))}
    </Box>
  );
}