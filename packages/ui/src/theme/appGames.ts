import { createTheme } from "@mui/material/styles";
declare module '@mui/material/styles' {
  interface TypeText {
    action?: string;
    emphasized?: string;
    subdued?: string;
  }

  interface TypeBackground {
    subdued?: string;
  }
}

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
      subdued: "#363B50",
    },
    text: {
      primary: "#FFFFFF",
      action: "#E3E9FF",
      emphasized: "#FFF",
    },
    action: {
      active: "#996FFF",
    },
    success: {
      main: "#363B50",
      light: "#363B50",
      dark: "#BCD7C0",
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
      subdued: "#F8FBFF"
    },
    text: {
      primary: "#444444",
      secondary: "#737373",
      action: "#E3E9FF",
      emphasized: "#333",
      subdued: "#737373"
    },
    action: {
      active: "#7339FF",
    },
    warning: {
      main: "#B88700",
    },
    success: {
      main: "#0A801F",
      light: "#F2F8F3",
      dark: "#0A801F",
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
