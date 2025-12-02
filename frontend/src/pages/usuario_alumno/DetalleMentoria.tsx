import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Icon,
  Link,
  Divider
} from "@chakra-ui/react";
import {
  FaUser,
  FaCalendar,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";

interface Mentoria {
  titulo: string;
  descripcion: string;
  mentor: string;
  fecha: string;
  hora: string;
  estado: "Pendiente" | "En proceso" | "Finalizada";
  meetUrl: string;
}

const colorEstado: Record<Mentoria["estado"], string> = {
  Pendiente: "yellow",
  "En proceso": "blue",
  Finalizada: "green",
};

export default function DetalleMentoria() {
  const { state } = useLocation();
  const mentoria: Mentoria = state?.mentoria;

  if (!mentoria) {
    return <h2>No se encontró la mentoría</h2>;
  }

  return (
    <>
      <NavbarAlumno />

      <Box minH="100vh" px={6} py={10} display="flex" justifyContent="center">
        <Box
          bg="gray.800"
          p={8}
          rounded="2xl"
          shadow="2xl"
          borderWidth="1px"
          borderColor="gray.700"
          maxW="700px"
          w="100%"
        >
          {/* TÍTULO Y DESCRIPCIÓN */}
          <Flex align="center" mb={4} gap={3}>
            <Icon as={FaInfoCircle} boxSize={7} color="brand.300" />
            <Text fontSize="3xl" fontWeight="bold" color="brand.300">
              {mentoria.titulo}
            </Text>
          </Flex>

          <Text color="gray.300" fontSize="lg" mb={6}>
            {mentoria.descripcion}
          </Text>

          <Divider borderColor="gray.600" my={6} />

          {/* INFO GENERAL */}
          <Box
            bg="gray.700"
            p={5}
            rounded="xl"
            borderWidth="1px"
            borderColor="gray.600"
            mb={6}
          >
            <Flex align="center" gap={3} color="gray.300" mb={4}>
              <Icon as={FaUser} />
              <Text>
                <strong>Mentor:</strong> {mentoria.mentor}
              </Text>
            </Flex>

            <Flex align="center" gap={3} color="gray.300" mb={2}>
              <Icon as={FaCalendar} />
              <Text>
                <strong>Fecha:</strong> {mentoria.fecha}
              </Text>
            </Flex>

            <Flex align="center" gap={3} color="gray.300" mb={4}>
              <Icon as={FaClock} />
              <Text>
                <strong>Hora:</strong> {mentoria.hora}
              </Text>
            </Flex>

            {/* ESTADO */}
            <Flex align="center" gap={3}>
              <Icon as={FaInfoCircle} />
              <Text fontWeight="semibold" color="gray.200">
                Estado:
              </Text>

              <Badge
                colorScheme={colorEstado[mentoria.estado]}
                px={3}
                py={1}
                rounded="full"
                fontSize="sm"
                shadow="md"
              >
                {mentoria.estado}
              </Badge>
            </Flex>
          </Box>

          <Divider borderColor="gray.600" my={6} />

          {/* ACCESO A LA MENTORÍA */}
          <Link href={mentoria.meetUrl} target="_blank" style={{ width: "100%" }}>
            <Button w="100%" size="lg" colorScheme="brand" rounded="lg" shadow="md">
              Unirse a la Mentoría
            </Button>
          </Link>
        </Box>
      </Box>

      <Footer />
    </>
  );
}