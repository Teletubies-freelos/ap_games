import { ReactNode } from "react";
import { Box } from "@mui/material";

interface HeaderModalProps {
  textHeader: string;
  iconLeft: ReactNode;
  iconRight: ReactNode;
}

export default function HeaderModal({
  iconLeft,
  iconRight,
  textHeader,
}: HeaderModalProps) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ padding: "1.25rem 1rem" }}
    >
      <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
        {iconLeft}
        {textHeader}
      </Box>
      {iconRight}
    </Box>
  );
}
