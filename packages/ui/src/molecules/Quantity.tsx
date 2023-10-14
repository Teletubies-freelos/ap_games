import { Box, SxProps, Typography } from "@mui/material";

import {
  Add as AddIcon,
  Remove,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";

interface QuantityProps {
  quantity: number;
  changeQuantity: () => void;
  onDelete: () => void;
}

const stylesBox: SxProps = {
  display: "flex",
  alignItems: "center",
  width: { xs: "4rem" },
  gap: "1rem",
  position: { xs: "absolute", sm: "static" },
  right: { xs: "2.6rem", sm: "unset" },
  bottom: { xs: "30%", sm: "unset" },
  transform: { xs: "translate(50%,50%)", sm: "unset" },
};

const sxIcons = {
  color: "primary.main",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: { xs: ".9rem !important", sm: "1rem !important" },
};

export default function Quantity({
  quantity,
  changeQuantity,
  onDelete,
}: QuantityProps) {
  return (
    <Box sx={stylesBox}>
      {quantity > 1 ? (
        <Remove onClick={onDelete} sx={sxIcons} />
      ) : (
        <DeleteOutlineIcon
          fontSize="medium"
          onClick={onDelete}
          sx={{
            cursor: "pointer",
            fontSize: { xs: ".9rem !important", sm: "1rem !important" },
          }}
        />
      )}
      <Typography
        sx={{
          fontSize: { xs: ".8rem !important", sm: "1rem !important" },
        }}
      >
        {quantity}
      </Typography>
      <AddIcon sx={sxIcons} onClick={changeQuantity} />
    </Box>
  );
}
