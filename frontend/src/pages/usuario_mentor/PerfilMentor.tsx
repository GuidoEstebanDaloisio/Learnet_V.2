import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Divider,
  VStack,
  Icon,
  Switch,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { FaEnvelope, FaBirthdayCake, FaUserEdit, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";

export default function PerfilMentor() {
  const mentor = {
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@example.com",
    fechaNacimiento: "14/05/1990",
    titulo: "Ingeniero en Sistemas",
    imagen: "",
    disponible: true,
    experiencia:
      "Más de 8 años trabajando en desarrollo backend y liderazgo de equipos.",
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box py={10} px={{ base: 4, md: 10 }} flex="1">
        <Panel maxW="700px" mx="auto" p={8}>
          {/* HEADER */}
          <Flex direction="column" align="center" mb={6}>
            <Avatar
              size="2xl"
              name={`${mentor.nombre} ${mentor.apellido}`}
              src={mentor.imagen}
              mb={4}
            />

            <Heading>{mentor.nombre} {mentor.apellido}</Heading>

            <Text color="brand.300" mt={1}>
              Mentor en Learnet
            </Text>
          </Flex>

          <Divider />

          {/* DATOS */}
          <VStack align="start" spacing={5}>

            <Flex align="center" gap={3}>
              <Icon as={FaGraduationCap} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Título profesional:</strong> {mentor.titulo}
              </Text>
            </Flex>

            <Flex align="flex-start" gap={3}>
              <Icon as={FaBriefcase} color="brand.400" boxSize={5} mt={1} />
              <Text fontSize="lg">
                <strong>Experiencia:</strong> {mentor.experiencia}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <Icon as={FaEnvelope} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Email:</strong> {mentor.email}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <Icon as={FaBirthdayCake} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Fecha de nacimiento:</strong> {mentor.fechaNacimiento}
              </Text>
            </Flex>

            {/* DISPONIBILIDAD */}
            <FormControl display="flex" alignItems="center" mt={3}>
              <FormLabel htmlFor="disponible" mb="0" fontSize="lg" fontWeight="bold">
                Disponible para mentorías
              </FormLabel>

              <Switch
                id="disponible"
                colorScheme="green"
                size="lg"
                defaultChecked={mentor.disponible}
              />
            </FormControl>
          </VStack>

          <Button
            leftIcon={<FaUserEdit />}
            variant="primary"
            w="100%"
          >
            Editar perfil
          </Button>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
