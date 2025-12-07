import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const tema = extendTheme({
  config,

  //Paleta de marca
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

  //Tipografías
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },

  //Estilos globales
  styles: {
    global: {
      body: {
        bg: "gray.900",
        color: "gray.100",
      },
    },
  },

  components: {
    Button: {
      variants: {
        primary: {
          mt: 4,
          bg: "brand.300",
          color: "black",
          fontWeight: "medium",
          _hover: { bg: "brand.400" },
          _active: { bg: "brand.600" },
        },
        login: {
          bg: "brand.300",
          color: "black",
          fontWeight: "medium",
          _hover: { bg: "brand.400" },
          _active: { bg: "brand.600" },
        },
        logout: {
          bg: "red.700",
          color: "white",
          fontWeight: "semibold",
          _hover: { bg: "red.600" },
          _active: { bg: "red.700" },
        },
        
      },
      defaultProps: {
        variant: "primary", // Provicional para que TODOS los botones sean primary por defecto
      },
    },

    Link: {
      variants: {
        navbarLink: {
          color: "gray.200",
          fontWeight: "medium",
          _hover: {
            color: "white",
            textDecoration: "none",
          },
        },
      },
    },
  },
});

export default tema;
