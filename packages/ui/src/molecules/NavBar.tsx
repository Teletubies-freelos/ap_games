import { Box, Toolbar } from "@mui/material";
import React from "react";

interface NavBarProps {
  cartComponent?: JSX.Element;
  mainLogo?: JSX.Element;
  navigatorLinks?: JSX.Element;
  searchBar?: JSX.Element;
  actionsComponent?: JSX.Element;
  menu?: React.ReactNode;
}

const sxMainBar = {
  width: "100%",
  display: "flex",
  gap: { xs: "1rem", sm: "3rem" },
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: 1200
};

export default function NavBar({
  cartComponent,
  mainLogo,
  navigatorLinks,
  actionsComponent,
  searchBar,
  menu
}: NavBarProps) {
  return (
    <Toolbar
      sx={{
        flexDirection: "column",
        margin: "1.5rem 0",
        gap: { xs: "2rem", sm: "0" },
      }}
    >
      <Box sx={sxMainBar}>
        {menu}
        {mainLogo}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "40%",
          }}
        >
          {searchBar}
        </Box>
        <Box display="flex" justifyContent="end" alignItems="center" gap="1rem">
          {navigatorLinks}
          {actionsComponent}
          {cartComponent}
        </Box>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>{searchBar}</Box>
    </Toolbar>
  );
}
