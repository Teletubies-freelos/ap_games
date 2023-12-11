import React from "react";
import { Box, SxProps, Typography } from "@mui/material";

interface TagProps {
  icon: React.ReactNode;
  label: string;
  sx?: SxProps<any>;
  backgrounded?: boolean;
}

export default function Tag({ icon, label, sx, backgrounded = true }: Readonly<TagProps>) {
  return (
    <Box
      sx={{
        display: "flex",
        padding: "7px 9px",
        alignItems: "center",
        gap: "9px",
        borderRadius: "5px",
        width: "fit-content",
        backgroundColor: backgrounded ? "success.light" : "",
        ...sx
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
