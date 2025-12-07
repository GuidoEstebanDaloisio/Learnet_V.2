import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { RUTAS } from "../routes";
import Panel from "../theme/components/Panel";

export default function Login() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={4}
      >
        <Panel w={{ base: "100%", sm: "400px" }}>
          <VStack spacing={6}>
            <Heading fontSize="2xl" textAlign="center">
              Iniciar sesión
            </Heading>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="tuemail@ejemplo.com" />
            </FormControl>

            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" placeholder="••••••••" />
            </FormControl>

            <Button variant="primary" w="100%">
              Ingresar
            </Button>

            <Text fontSize="sm" opacity={0.7}>
              ¿No tenés cuenta? Próximamente…
            </Text>

            <VStack w="100%" spacing={3} mt={4}>
              <Button
                as={Link}
                to={RUTAS.ALUMNO.EXPLORAR_MENTORES}
                w="100%"
                variant="secondary"
              >
                Entrar como Alumno
              </Button>

              <Button
                as={Link}
                to={RUTAS.MENTOR.PERFIL}
                w="100%"
                variant="secondary"
              >
                Entrar como Mentor
              </Button>
            </VStack>
          </VStack>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
