import { SvgIcon, SxProps, Theme } from "@mui/material";
import { MouseEventHandler, PropsWithChildren } from "react";

export interface UnsetSvgProps {
  sx?: SxProps | SxProps<Theme>;
  onClick?: MouseEventHandler<SVGSVGElement>;
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
