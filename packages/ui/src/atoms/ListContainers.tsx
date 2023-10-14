import { styled } from "@mui/material";

export const ListContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "2rem",
});

export const ItemContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "unset",
  },
  [theme.breakpoints.up("md")]: {
    width: "calc(50% - 1rem)",
  },
}));
