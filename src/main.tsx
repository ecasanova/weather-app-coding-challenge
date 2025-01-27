import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode:
      new Date().getHours() >= 6 && new Date().getHours() < 18
        ? "light"
        : "dark",
  },
  spacing: 4,
  typography: {
    fontFamily: "Roboto",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Roboto",
          backgroundColor: "#f1f1f1",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
