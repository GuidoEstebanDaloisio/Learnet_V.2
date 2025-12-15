import { Box, Text, type BoxProps } from "@chakra-ui/react";

interface SolicitudEstadoProps extends BoxProps {
  tipo: "aceptada" | "rechazada";
}

const ESTADOS = {
  aceptada: {
    bg: "green.900",
    borderColor: "green.400",
    textColor: "green.300",
  },
  rechazada: {
    bg: "red.900",
    borderColor: "red.400",
    textColor: "red.300",
  },
};

export default function SolicitudEstado({
  tipo,
  children,
  ...props
}: SolicitudEstadoProps) {
  const cfg = ESTADOS[tipo];

  return (
    <Box
      mt={4}
      p={3}
      rounded="md"
      textAlign="center"
      bg={cfg.bg}
      border="1px solid"
      borderColor={cfg.borderColor}
      {...props}
    >
      <Text color={cfg.textColor} fontWeight="bold">
        {children}
      </Text>
    </Box>
  );
}
