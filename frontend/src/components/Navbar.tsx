import { Box, Flex, HStack, Link as ChakraLink, Button, Image, Text } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import Logo from "../assets/Logo.png";

export default function Navbar() {
  return (
    <Box bg="gray.800" px={6} py={3} boxShadow="md">
      <Flex justify="space-between" align="center">

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

        <HStack spacing={6} color="white">
          <ChakraLink href="#beneficios">Beneficios</ChakraLink>
          <ChakraLink href="#testimonios">Testimonios</ChakraLink>
          <Button as={Link} to="/login" colorScheme="brand">
            Ingresar
          </Button>
        </HStack>

      </Flex>
    </Box>
  );
}