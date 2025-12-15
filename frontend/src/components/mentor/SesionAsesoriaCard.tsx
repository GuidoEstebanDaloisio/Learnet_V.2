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


interface SesionAsesoriaCardProps {
  alumno: string;
  tituloMentoria: string;
  fecha: string;
  hora: string;
  estado: "no-iniciada" | "en-progreso" | "finalizada" | "cancelada";
  imagen?: string;
}

export default function SesionAsesoriaCard({
  alumno,
  tituloMentoria,
  fecha,
  hora,
  estado,
  imagen,
}: SesionAsesoriaCardProps) {
  const navigate = useNavigate();

  const estadoConfig = {
    "no-iniciada": { label: "No iniciada", color: "yellow", icon: FaClock },
    "en-progreso": { label: "En progreso", color: "blue", icon: FaPlay },
    finalizada: { label: "Finalizada", color: "green", icon: FaCheckCircle },
    cancelada: { label: "Cancelada", color: "red", icon: FaBan },
  };

  const cfg = estadoConfig[estado];

  return (
    <Card>
      {/* Titulo de la mentoría (plantilla) */}
      <Text fontSize="xl" color="brand.300" fontWeight="bold" mb={2}>
        {tituloMentoria}
      </Text>

      {/* Alumno */}
      <Flex align="center" gap={3} mb={4}>
        <Avatar size="md" name={alumno} src={imagen} />
        <Text fontSize="md" color="gray.300">
          Alumno: <Text as="span" fontWeight="bold">{alumno}</Text>
        </Text>
      </Flex>

      {/* Fecha + Estado */}
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

      {/* Boton: Ver detalles */}
      <Button
        w="100%"
        variant="primary"
        onClick={() =>
          navigate( RUTAS.MENTOR.DETALLE_SESION_ASESORIA, {
            state: {
              sesionAsesoria: {
                alumno,
                tituloMentoria,
                fecha,
                hora,
                estado: cfg.label, 
              },
            },
          })
        }
      >
        Ver detalles
      </Button>
    </Card>
  );
}
