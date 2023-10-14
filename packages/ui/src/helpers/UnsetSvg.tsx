import { SvgIcon, SxProps } from "@mui/material";
import { PropsWithChildren } from "react";

export interface UnsetSvgProps {
  sx?: SxProps;
}

export const UnsetSvg = ({
  sx,
  children,
}: PropsWithChildren<UnsetSvgProps>) => (
  <SvgIcon
    sx={{
      width: "unset",
      height: "unset",
      ...sx,
    }}
  >
    {children}
  </SvgIcon>
);
