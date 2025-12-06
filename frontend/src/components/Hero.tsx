import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from 'react-router-dom'; 
import { RUTAS } from "../routes";

export default function Hero() {
  return (
    <Box textAlign="center" py={28} px={6}>
      <Heading fontSize="4xl" mb={4}>
        Potenciá tu crecimiento con mentorías personalizadas
      </Heading>

      <Text maxW="600px" mx="auto" opacity={0.8} mb={6}>
        Conectá con expertos que te acompañan en tu camino profesional.
      </Text>

      <Button as={Link} to={RUTAS.LOGIN} size="lg" colorScheme="brand">
        Comenzar ahora
      </Button>
    </Box>
  );
}