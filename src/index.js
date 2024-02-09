// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Custom theme
const theme = extendTheme({
  colors: {
    brand: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3", // Primary color
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
  },
  fonts: {
    heading: '"Open Sans", sans-serif',
    body: '"Roboto", sans-serif',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
