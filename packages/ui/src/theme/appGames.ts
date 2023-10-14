import { createTheme } from "@mui/material/styles";

const typography = {
  allVariants: {
    fontFamily: "Prompt, sans-serif",
  },
  h1: {
    fontSize: "2rem",
  },
  h2: {
    fontSize: "1.3rem",
  },
  h3: {
    fontSize: "1rem",
    fontWeight: "bold",
  },
  body1: {
    fontSize: "0.75rem",
  },
  body2: {
    color: "#444",
    fontWeight: "bold",
  },
};

export const darkTheme = createTheme({
  typography,
  palette: {
    mode: "dark",
    primary: {
      main: "#7339FF",
    },
    background: {
      default: "#1F1D2B",
      paper: "#363B50",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
});

export const defaultTheme = createTheme({
  typography,
  palette: {
    primary: {
      main: "#7339FF",
    },
    background: {
      default: "white",
      paper: "#EEF2FF",
    },
    text: {
      primary: "#444444",
      secondary: "#737373",
    },
    action: {
      active: "#7339FF",
    },
    warning: {
      main: "#B88700",
    },
    success: {
      main: "#0A801F",
    },
    error: {
      main: "#DD1D1D",
    },
    info: {
      main: "#1773B0",
    },
    grey: {
      "100": "#D9D9D9",
    },
  },
});
