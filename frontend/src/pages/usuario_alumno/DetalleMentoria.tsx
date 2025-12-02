import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaUser, FaCalendar, FaClock, FaInfoCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

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
    <Box minH="100vh" px={6} py={10} display="flex" justifyContent="center">
      <Box
        bg="gray.800"
        p={8}
        rounded="2xl"
        shadow="xl"
        borderWidth="1px"
        borderColor="gray.700"
        maxW="700px"
        w="100%"
      >
        <Text fontSize="3xl" fontWeight="bold" color="gray.100" mb={2}>
          <Icon as={FaInfoCircle} mr={2} /> {mentoria.titulo}
        </Text>

        <Text color="gray.300" fontSize="lg" mb={6}>
          {mentoria.descripcion}
        </Text>

        <Flex align="center" gap={3} color="gray.300" mb={4}>
          <Icon as={FaUser} />
          <Text><strong>Mentor:</strong> {mentoria.mentor}</Text>
        </Flex>

        <Flex align="center" gap={3} color="gray.300" mb={2}>
          <Icon as={FaCalendar} />
          <Text><strong>Fecha:</strong> {mentoria.fecha}</Text>
        </Flex>

        <Flex align="center" gap={3} color="gray.300" mb={4}>
          <Icon as={FaClock} />
          <Text><strong>Hora:</strong> {mentoria.hora}</Text>
        </Flex>

        <Flex align="center" gap={3} mb={6}>
          <Icon as={FaInfoCircle} />
          <Text fontWeight="semibold" color="gray.200">Estado:</Text>

          <Badge
            colorScheme={colorEstado[mentoria.estado]}
            px={3}
            py={1}
            rounded="full"
            fontSize="sm"
          >
            {mentoria.estado}
          </Badge>
        </Flex>

        <Link href={mentoria.meetUrl} target="_blank" style={{ width: "100%" }}>
          <Button w="100%" size="lg" colorScheme="brand">
            Unirse a la Mentoría
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
