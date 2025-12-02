import { Box, VStack, Heading, Input, Button, Text, FormControl, FormLabel } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Login() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      
      <Box flex="1" display="flex" justifyContent="center" alignItems="center" px={4}>
        <VStack
          bg="gray.800"
          p={8}
          rounded="lg"
          boxShadow="lg"
          spacing={6}
          w={{ base: "100%", sm: "400px" }}
        >
          <Heading fontSize="2xl" textAlign="center">
            Iniciar sesión
          </Heading>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="tuemail@ejemplo.com"
              focusBorderColor="brand.400"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              placeholder="••••••••"
              focusBorderColor="brand.400"
            />
          </FormControl>

          <Button w="100%" colorScheme="brand" size="lg">
            Ingresar
          </Button>

          <Text fontSize="sm" opacity={0.7}>
            ¿No tenés cuenta? Próximamente…
          </Text>

          {/* BOTONES TEMPORALES DE ACCESO */}
          <VStack w="100%" spacing={3} mt={4}>
            <Button
              as={Link}
              to="/alumno/explorar"
              w="100%"
              colorScheme="brand"
              variant="outline"
            >
              Entrar como Alumno
            </Button>

            <Button
              as={Link}
              to="/mentor"
              w="100%"
              colorScheme="brand"
              variant="outline"
            >
              Entrar como Mentor
            </Button>
          </VStack>
        </VStack>
      </Box>

      <Footer />
    </Box>
  );
}
