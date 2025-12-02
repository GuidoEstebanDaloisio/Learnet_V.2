import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Divider,
  VStack,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaEnvelope, FaBirthdayCake, FaUserEdit } from "react-icons/fa";
import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";

export default function PerfilAlumno() {
  // ⚠️ Luego esto vendrá del backend
  const alumno = {
    nombre: "Guido",
    apellido: "Daloisio",
    email: "guido@example.com",
    fechaNacimiento: "15/02/2001",
    imagen: "",
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarAlumno />

      <Box py={10} px={{ base: 4, md: 10 }} flex="1">

        <Box
          bg="gray.800"
          p={8}
          rounded="xl"
          borderWidth="1px"
          borderColor="gray.700"
          maxW="700px"
          mx="auto"
          shadow="md"
        >
          {/* HEADER */}
          <Flex direction="column" align="center" mb={6}>
            <Avatar
              size="2xl"
              name={`${alumno.nombre} ${alumno.apellido}`}
              src={alumno.imagen}
              mb={4}
            />

            <Heading color="gray.100">
              {alumno.nombre} {alumno.apellido}
            </Heading>

            <Text color="brand.300" mt={1}>
              Alumno de Learnet
            </Text>
          </Flex>

          <Divider borderColor="gray.600" mb={6} />

          {/* DATOS */}
          <VStack align="start" spacing={5}>
            {/* EMAIL */}
            <Flex align="center" gap={3}>
              <Icon as={FaEnvelope} color="brand.400" boxSize={5} />
              <Text fontSize="lg" color="gray.200">
                <strong>Email:</strong> {alumno.email}
              </Text>
            </Flex>

            {/* FECHA DE NACIMIENTO */}
            <Flex align="center" gap={3}>
              <Icon as={FaBirthdayCake} color="brand.400" boxSize={5} />
              <Text fontSize="lg" color="gray.200">
                <strong>Fecha de nacimiento:</strong> {alumno.fechaNacimiento}
              </Text>
            </Flex>
          </VStack>

          <Button
            leftIcon={<FaUserEdit />}
            colorScheme="brand"
            mt={8}
            w="100%"
          >
            Editar perfil
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
