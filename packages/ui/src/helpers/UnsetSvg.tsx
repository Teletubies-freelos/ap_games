import { SvgIcon, SxProps, Theme } from "@mui/material";
import { PropsWithChildren } from "react";

export interface UnsetSvgProps {
  sx?: SxProps | SxProps<Theme>;
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
