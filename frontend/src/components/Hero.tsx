import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom'; // Importamos Link de react-router-dom

export default function Hero() {
  return (
    <Box textAlign="center" py={28} px={6}>
      <Heading fontSize="4xl" mb={4}>
        Potenciá tu crecimiento con mentorías personalizadas
      </Heading>

      <Text maxW="600px" mx="auto" opacity={0.8} mb={6}>
        Conectá con expertos que te acompañan en tu camino profesional.
      </Text>

      {/* Usamos 'as={Link}' y 'to="/login"' para la navegación */}
      <Button as={Link} to="/login" size="lg" colorScheme="brand">
        Comenzar ahora
      </Button>
    </Box>
  );
}