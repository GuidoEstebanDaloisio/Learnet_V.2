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
import {
  FaEnvelope,
  FaUserEdit,
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";

import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";
import { formatoFecha } from "../../utils/formatoFecha";
import { useAuth } from "../../context/AuthContext";

export default function PerfilMentor() {
  const { usuario } = useAuth();

  // 🛡️ Protección básica
  if (!usuario) {
    return null; // o spinner
  }

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box py={10} px={{ base: 4, md: 10 }} flex="1">
        <Panel maxW="700px" mx="auto" p={8}>
          {/* HEADER */}
          <Flex direction="column" align="center" mb={6}>
            <Avatar
              size="2xl"
              name={`${usuario.nombre} ${usuario.apellido}`}
              mb={4}
            />

            <Heading>
              {usuario.nombre} {usuario.apellido}
            </Heading>

            <Text color="brand.300" mt={1}>
              Mentor en Learnet
            </Text>
          </Flex>

          <Divider mb={6} />

          {/* DATOS */}
          <VStack align="start" spacing={5}>
            <Flex align="center" gap={3}>
              <Icon as={FaGraduationCap} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Título profesional:</strong>{" "}
                {usuario.tituloProfesional || "No cargado"}
              </Text>
            </Flex>

            <Flex align="flex-start" gap={3}>
              <Icon as={FaBriefcase} color="brand.400" boxSize={5} mt={1} />
              <Text fontSize="lg">
                <strong>Experiencia:</strong>{" "}
                {usuario.experiencia || "No cargada"}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <Icon as={FaEnvelope} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Email:</strong> {usuario.email}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <Icon as={FaCalendarAlt} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Fecha de ingreso:</strong>{" "}
                {usuario.fechaDeIngreso
                  ? formatoFecha(usuario.fechaDeIngreso)
                  : "No disponible"}
              </Text>
            </Flex>

            {/* DISPONIBILIDAD */}
            <FormControl display="flex" alignItems="center" mt={4}>
              <FormLabel
                htmlFor="disponible"
                mb="0"
                fontSize="lg"
                fontWeight="bold"
              >
                Disponible para mentorías
              </FormLabel>

              <Switch
                id="disponible"
                colorScheme="green"
                size="lg"
                isChecked={usuario.estaDisponible}
                isReadOnly
              />
            </FormControl>
          </VStack>

          <Button
            leftIcon={<FaUserEdit />}
            variant="primary"
            w="100%"
            mt={8}
          >
            Editar perfil
          </Button>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
