import NavbarContainer from "../theme/components/NavbarContainer";
import NavbarLogo from "../theme/components/NavbarLogo";
import { Flex, HStack, Link, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { RUTAS } from "../routes";

export default function NavbarGeneral() {
  return (
    <NavbarContainer>
      <Flex justify="space-between" align="center" w="100%">
        {/* Logo */}
        <NavbarLogo />

        {/* Links y botón */}
        <HStack spacing={6}>
          <Link variant="navbarLink" href="#beneficios">
            Beneficios
          </Link>
          <Link variant="navbarLink" href="#testimonios">
            Testimonios
          </Link>
          <Button as={RouterLink} to={RUTAS.LOGIN} variant="login">
            Ingresar
          </Button>
        </HStack>
      </Flex>
    </NavbarContainer>
  );
}
