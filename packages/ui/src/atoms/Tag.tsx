import React from "react";
import { Box, Typography } from "@mui/material";

interface TagProps {
  icon: React.ReactNode;
  label: string;
}

export default function DiscountTag({ icon, label }: Readonly<TagProps>) {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "7px 9px",
        alignItems: "center",
        gap: "9px",
        borderRadius: "5px",
        width: "fit-content",
        backgroundColor: "success.light",
      }}
    >
      {icon}
      <Typography
        variant="body1"
        sx={{
          fontSize: 14,
          color: "success.dark",
          fontWeight: 400,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
