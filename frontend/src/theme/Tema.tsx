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

        secondary: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "brand.300",
          color: "brand.300",
          fontWeight: "medium",
          _hover: {
            bg: "brand.600",
            color: "white",
          },
          _active: {
            bg: "brand.600",
            color: "white",
          },
        },

        alerta: {
          bg: "red.700",
          color: "white",
          fontWeight: "semibold",
          _hover: { bg: "red.600" },
          _active: { bg: "red.700" },
        },

        alerta_secondary: {
          bg: "transparent",
          borderWidth: "1px",
          borderColor: "red.300",
          color: "red.300",
          fontWeight: "medium",
          _hover: {
            bg: "red.600",
            color: "white",
          },
          _active: {
            bg: "red.600",
            color: "white",
          },
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

    Input: {
      baseStyle: {
        field: {
          bg: "gray.700",
          borderColor: "gray.600",
          _placeholder: { color: "gray.400" },
          _hover: {
            borderColor: "gray.500",
          },
          _focus: {
            borderColor: "brand.400",
            boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
          },
        },
      },
      sizes: {
        md: {
          field: {
            h: 12,
            borderRadius: "md",
          },
        },
      },
      defaultProps: {
        size: "md",
        variant: "outline",
      },
    },

    Textarea: {
      baseStyle: {
        bg: "gray.700",
        borderColor: "gray.600",
        _placeholder: { color: "gray.400" },
        _hover: {
          borderColor: "gray.500",
        },
        _focus: {
          borderColor: "brand.400",
          boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
        },
      },
      sizes: {
        md: {
          borderRadius: "md",
          minH: 32, // altura mínima, opcional
        },
      },
      defaultProps: {
        size: "md",
        variant: "outline",
      },
    },

    Accordion: {
      baseStyle: {
        container: {
          border: "none",
        },
        button: {
          fontWeight: "bold",
          _expanded: {
            bg: "brand.500",
            color: "white",
          },
        },
      },
    },



    FormLabel: {
      baseStyle: {
        marginBottom: 1,
        fontWeight: "medium",
        color: "gray.300",
      },
    },

    Divider: {
      baseStyle: {
        borderColor: "gray.600",
        my: 6,
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
