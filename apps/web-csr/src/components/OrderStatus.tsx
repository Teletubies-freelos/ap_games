import { Box, Typography } from "@mui/material";
import { Button, MainLogo, SearchBar } from "../../../../packages/ui/src";

export default function OrderStatus() {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="calc(100vh - 13rem)"
      justifyContent={{ xs: "center", sm: "space-between" }}
      padding="0 1rem"
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "25rem" },
          marginTop: { xs: 0, sm: "3rem" },
          marginBottom: { xs: "7rem", sm: 0 },
        }}
      >
        <Typography sx={{ marginBottom: "2rem" }} variant="h3">
          Ingresa tu número de pedido
        </Typography>
        <SearchBar
          direction="column"
          onSubmit={() => 3}
          placeHolder="ABC123"
          buttonSearch={<Button label="buscar" variant="contained" />}
        />
      </Box>
      <Box
        justifyContent="center"
        sx={{ display: { xs: "none", sm: "flex" }, width: "100%" }}
      >
        <MainLogo />
      </Box>
    </Box>
  );
}
