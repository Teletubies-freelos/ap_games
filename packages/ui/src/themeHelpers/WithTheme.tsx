import { type PropsWithChildren } from "react";
import { ThemeProvider, CssBaseline, GlobalStyles } from "@mui/material";
import { defaultTheme } from "../theme";

export default function WithTheme({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            fontSize: 14,
          },
          fontSize: 14,
          boxSizing: "border-box",
        }}
      />
      {children}
    </ThemeProvider>
  );
}
