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
import Panel from "../../theme/components/Panel";

export default function PerfilAlumno() {

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
        
        <Panel maxW="700px" mx="auto" p={8}>
          
          <Flex direction="column" align="center" mb={6}>
            <Avatar
              size="2xl"
              name={`${alumno.nombre} ${alumno.apellido}`}
              src={alumno.imagen}
              mb={4}
            />

            <Heading>
              {alumno.nombre} {alumno.apellido}
            </Heading>

            <Text color="brand.300" mt={1}>
              Alumno de Learnet
            </Text>
          </Flex>

          <Divider />

          <VStack align="start" spacing={5}>
            <Flex align="center" gap={3}>
              <Icon as={FaEnvelope} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Email:</strong> {alumno.email}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <Icon as={FaBirthdayCake} color="brand.100" boxSize={5} />
              <Text fontSize="lg">
                <strong>Fecha de nacimiento:</strong> {alumno.fechaNacimiento}
              </Text>
            </Flex>
          </VStack>

          <Button leftIcon={<FaUserEdit />} variant="primary" w="100%">
            Editar perfil
          </Button>

        </Panel>

      </Box>

      <Footer />
    </Box>
  );
}
