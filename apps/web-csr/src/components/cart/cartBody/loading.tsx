import { Box, CircularProgress } from "@mui/material";

export const Loading = () => (
  <Box width={1} height={1} display="grid" sx={{ placeItems: "center" }}>
    <CircularProgress color="info" />
  </Box>
);
