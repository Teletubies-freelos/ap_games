import { styled } from "@mui/material";

export const ListContainer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "2rem",
});


export const ItemContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.up("md")]: {
    width: "calc(48% - 1rem)",
  },
}));
