import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  Icon,
} from "@chakra-ui/react";

import { FaClock, FaPlay, FaCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface MentoriaCardProps {
  mentor: string;
  titulo: string;
  fecha: string;
  hora: string;
  estado: "no-iniciada" | "en-progreso" | "finalizada" | "cancelada";
  imagen?: string;
}

export default function MentoriaCard({
  mentor,
  titulo,
  fecha,
  hora,
  estado,
  imagen,
}: MentoriaCardProps) {
  
  const navigate = useNavigate();

  const estadoConfig = {
    "no-iniciada": { label: "No iniciada", color: "yellow", icon: FaClock },
    "en-progreso": { label: "En progreso", color: "blue", icon: FaPlay },
    finalizada: { label: "Finalizada", color: "green", icon: FaCheckCircle },
    cancelada: { label: "Cancelada", color: "red", icon: FaBan },
  };

  const cfg = estadoConfig[estado];

  return (
    <Box
      bg="gray.800"
      p={5}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.700"
      _hover={{ shadow: "lg", transform: "translateY(-3px)", borderColor: "brand.400" }}
      transition="0.2s"
    >
      <Text fontSize="xl" color="brand.300" fontWeight="bold" mb={2}>
        {titulo}
      </Text>

      <Flex align="center" gap={3} mb={4}>
        <Avatar size="md" name={mentor} src={imagen} />

        <Text fontSize="md" color="gray.300">
          por <Text as="span" fontWeight="bold">{mentor}</Text>
        </Text>
      </Flex>

      <Flex justify="space-between" align="center">
        <Text fontSize="sm" color="gray.400">
          {fecha} — {hora}
        </Text>

        <Badge
          colorScheme={cfg.color}
          px={2}
          py={1}
          rounded="md"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Icon as={cfg.icon} boxSize={3} />
          {cfg.label}
        </Badge>
      </Flex>

      <Button
        mt={4}
        w="100%"
        colorScheme="brand"
        onClick={() =>
          navigate("/alumno/mentoria/detalle", {
            state: {
              mentoria: {
                mentor,
                titulo,
                fecha,
                hora,
                estado: cfg.label,
                descripcion: "Aquí va una descripción real.",
                meetUrl: "https://meet.google.com/tu-meet",
              },
            },
          })
        }
      >
        Ver detalles
      </Button>
    </Box>
  );
}
