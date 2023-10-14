import { Box, Stack, Button } from "@mui/material";
import LabelStepStatus from "../atoms/LabelStepStatus";
import CardStateOrder from "./CardStateOrder";

export default function DetailOrderState() {
  return (
    <Stack sx={{ width: "100%", maxWidth: "40rem" }}>
      <Box>
        <LabelStepStatus property="Número de pedido" value="XAC431981" />
        <LabelStepStatus
          property="Fecha de entrega estimada"
          value="9 agosto"
        />
        <LabelStepStatus property="Productos" sx={{ marginTop: "2.25rem" }} />
      </Box>
      <Box>
        {Array.from({ length: 3 }).map((_, index) => (
          <CardStateOrder
            key={index}
            img={
              <Box
                height={"4.75rem"}
                alignItems={"center"}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                <img
                  src={"https://m.media-amazon.com/images/I/815aKWcEkEL.jpg"}
                  srcSet={`https://m.media-amazon.com/images/I/815aKWcEkEL.jpg`}
                  alt={"image"}
                  style={{
                    height: "80%",
                    width: "100%",
                    objectFit: "contain",
                  }}
                  loading="lazy"
                />
              </Box>
            }
            title="Spidermaan Marvel PS4"
            price="S/ 120.00"
          />
        ))}
      </Box>
      <Box sx={{ marginTop: "2.25rem" }}>
        <LabelStepStatus
          property="COSTO DELIVERY"
          value="S/ 20.00"
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: "bold !important",
            fontSize: "1.1rem !important",
          }}
        />
        <LabelStepStatus
          property="TOTAL"
          value="S/ 480.00"
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: "bold !important",
            fontSize: "1.1rem !important",
          }}
        />
      </Box>
      <Box sx={{ marginTop: "2.25rem" }}>
        <Button variant={"contained"} fullWidth>
          Whatsapp
        </Button>
      </Box>
    </Stack>
  );
}
