import { SxProps, Theme } from "@mui/material";

export const sxInnerStack: SxProps = {
  "& svg": {
    width: {
      xs: "4rem",
      sm: "5rem",
      md: "9%",
    },

    margin: "4rem 0 3rem 0 !important",
  },
};


export const noMargin : SxProps<Theme> = {
  margin: '0 !important',
  filter: ({palette})=>  `invert(${Number(palette.mode === 'dark')})` 
}
