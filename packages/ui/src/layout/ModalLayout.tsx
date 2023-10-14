import { Box, Stack, SxProps } from "@mui/material";
import { PropsWithChildren } from "react";

interface ModalLayoutProps {
  headerModal: JSX.Element;
  height?: string;
  sx?: SxProps;
}

const ModalLayout = ({
  headerModal,
  children,
  height,
  sx,
}: PropsWithChildren<ModalLayoutProps>) => {
  return (
    <Stack
      width="100%"
      maxWidth="44.7rem"
      height={height}
      sx={{
        borderRadius: "0.3rem",
        ...sx,
      }}
    >
      {headerModal}
      <Box
        height="100%"
        sx={{
          backgroundColor: "background.paper",
          padding: { xs: " 0.5rem", sm: "1.5rem 2.5rem" },
          borderRadius: "0 0 0.3rem 0.3rem",
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};

export default ModalLayout;
