import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

export default function Filters({children}: PropsWithChildren) {
  return (
    <Box
      display="flex"
      gap={{ xs: "0.5rem", md: "1.5rem" }}
      alignItems="center"
      width={{ xs: "100%", md: "30%" }}
      order={{ xs: "3", md: "2" }}
    >
      <Typography
        sx={(theme) => ({
          color: theme.palette.text.secondary,
        })}
      >
        Filtros:
      </Typography>
      {children}
    </Box>
  );
}
