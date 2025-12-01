import { Box, Flex, HStack, Link, Button, Image, Text } from "@chakra-ui/react";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  return (
    <Box bg="gray.800" px={6} py={3} boxShadow="md">
      <Flex justify="space-between" align="center">

        {/* IZQUIERDA: Logo + Nombre */}
        <HStack spacing={3}>
          <Image 
            src={Logo} 
            alt="Learnet Logo" 
            boxSize="40px" 
            objectFit="contain"
          />
          <Text fontSize="xl" fontWeight="bold">
            Learnet
          </Text>
        </HStack>

        {/* DERECHA: Links */}
        <HStack spacing={6} color="white">
          <Link href="#beneficios">Beneficios</Link>
          <Link href="#testimonios">Testimonios</Link>
          <Button colorScheme="brand">Ingresar</Button>
        </HStack>

      </Flex>
    </Box>
  );
}
