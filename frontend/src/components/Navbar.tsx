import { Box, Flex, HStack, Link, Button, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../assets/logo.png"; 
import { RUTAS } from "../routes";

export default function Navbar() {
  return (
    <Box bg="gray.800" px={6} py={3} boxShadow="md">
      <Flex justify="space-between" align="center">

        {/* LOGO */}
        <HStack spacing={3}>
          <Image src={Logo} alt="Learnet Logo" boxSize="40px" objectFit="contain" />
          <Text fontSize="xl" fontWeight="bold">
            Learnet
          </Text>
        </HStack>

        {/* LINKS */}
        <HStack spacing={6}>
          <Link variant="navbarLink" href="#beneficios">
            Beneficios
          </Link>

          <Link variant="navbarLink" href="#testimonios">
            Testimonios
          </Link>

          <Button
            as={RouterLink}
            to={RUTAS.LOGIN}
            variant="login"  
          >
            Ingresar
          </Button>
        </HStack>

      </Flex>
    </Box>
  );
}
