import { Box, Chip, Typography } from "@mui/material";
export default function Filters() {
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
      <Chip label="Precio más bajo" sx={{ cursor: "pointer" }} />
      <Chip label="Recién añañdidos" sx={{ cursor: "pointer" }} />
    </Box>
  );
}
