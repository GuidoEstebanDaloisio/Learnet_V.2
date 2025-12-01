import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const tema = extendTheme({
  config,
  colors: {
    brand: {
      50: "#d6e4ff",
      100: "#adc8ff",
      200: "#84a9ff",
      300: "#6690ff",
      400: "#3366ff",
      500: "#254eda",
      600: "#1939b7",
      700: "#102693",
      800: "#0a186f",
      900: "#040a4c",
    },
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.100",
      },
    },
  },
});

export default tema;
