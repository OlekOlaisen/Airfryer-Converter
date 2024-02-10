import React from "react";
import App from "./App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";

// Define a custom color palette
const colors = {
  brand: {
    50: "#e1f5fe", // lighter shade
    100: "#b3e5fc",
    200: "#81d4fa",
    300: "#4fc3f7",
    400: "#29b6f6",
    500: "#03a9f4", // default brand color
    600: "#039be5",
    700: "#0288d1",
    800: "#0277bd",
    900: "#01579b", // darker shade
  },
  // Add additional color modes for light and dark themes
  light: {
    background: "#f0f0f0",
    text: "#333333",
    // other light mode colors
  },
  dark: {
    background: "#141414",
    text: "#ffffff",
    // other dark mode colors
  },
};

// Customizing component defaults and styles for light/dark modes
const components = {
  Button: {
    baseStyle: ({ colorMode }) => ({
      fontWeight: "normal",
      _hover: {
        boxShadow: "md",
      },
      backgroundColor: colorMode === "dark" ? "brand.600" : "brand.400",
      color: "white",
    }),
  },
  // Customize other components as needed
};

// Theme configuration to enable color mode switching
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  components,
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Inter, sans-serif",
  },
  styles: {
    global: (props) => ({
      body: {
        bg:
          props.colorMode === "dark"
            ? colors.dark.background
            : colors.light.background,
        color:
          props.colorMode === "dark" ? colors.dark.text : colors.light.text,
      },
    }),
  },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  
);


