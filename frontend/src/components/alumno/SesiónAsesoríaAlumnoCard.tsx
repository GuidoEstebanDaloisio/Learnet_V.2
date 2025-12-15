import {
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  Icon,
} from "@chakra-ui/react";

import Card from "../../theme/components/Card";
import { FaClock, FaPlay, FaCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";

interface SesionAsesoriaAlumnoProps {
  mentor: string;
  titulo: string;
  fecha: string;
  hora: string;
  estado: "no-iniciada" | "en-progreso" | "finalizada" | "cancelada";
  imagen?: string;
}

export default function SesionAsesoriaAlumnoCard({
  mentor,
  titulo,
  fecha,
  hora,
  estado,
  imagen,
}: SesionAsesoriaAlumnoProps) {
  const navigate = useNavigate();

  const estadoConfig = {
    "no-iniciada": { label: "No iniciada", color: "yellow", icon: FaClock },
    "en-progreso": { label: "En progreso", color: "blue", icon: FaPlay },
    finalizada: { label: "Finalizada", color: "green", icon: FaCheckCircle },
    cancelada: { label: "Cancelada", color: "red", icon: FaBan },
  };

  const cfg = estadoConfig[estado];

  return (
    <Card
    >
      <Text fontSize="lg" color="brand.300" fontWeight="bold" mb={3}>
        {titulo}
      </Text>

      <Flex align="center" gap={4} mb={4}>
        <Avatar size="lg" name={mentor} src={imagen} />
        <Text fontSize="md" color="gray.300">
          Mentor: <Text as="span" fontWeight="semibold">{mentor}</Text>
        </Text>
      </Flex>

      <Flex justify="space-between" align="center" mb={3}>
        <Text fontSize="sm" color="gray.400">
          {fecha} — {hora}
        </Text>

        <Badge
          colorScheme={cfg.color}
          px={2}
          py={1}
          rounded="md"
          fontSize="0.75rem"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <Icon as={cfg.icon} boxSize={3} />
          {cfg.label}
        </Badge>
      </Flex>

      <Button
        w="100%"
        variant="primary"
        onClick={() =>
          navigate(RUTAS.ALUMNO.DETALLE_SESION_ASESORIA, {
            state: { mentor, titulo, fecha, hora, estado: cfg.label },
          })
        }
      >
        Ver detalles
      </Button>
    </Card>
  );
}
