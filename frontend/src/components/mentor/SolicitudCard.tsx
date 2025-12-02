import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Icon,
  HStack,
} from "@chakra-ui/react";

import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useState } from "react";

interface SolicitudCardProps {
  alumno: string;
  tituloMentoria: string;
  tema: string;
  fecha: string;
  hora: string;
  mensaje?: string;
  estado: "pendiente" | "aceptada" | "cancelada";
}

export default function SolicitudCard({
  alumno,
  tituloMentoria,
  tema,
  fecha,
  hora,
  mensaje,
  estado,
}: SolicitudCardProps) {

  const [estadoActual, setEstadoActual] = useState(estado);

  const estadoConfig = {
    pendiente: { label: "Pendiente", color: "yellow", icon: FaClock },
    aceptada: { label: "Aceptada", color: "green", icon: FaCheckCircle },
    cancelada: { label: "Cancelada", color: "red", icon: FaTimesCircle },
  };

  const cfg = estadoConfig[estadoActual];

  return (
    <Box
      bg="gray.800"
      p={5}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.700"
      _hover={{
        shadow: "lg",
        transform: "translateY(-3px)",
        borderColor: "brand.400",
      }}
      transition="0.2s"
    >
      <Badge
        colorScheme={cfg.color}
        px={3}
        py={1}
        mb={3}
        rounded="md"
        display="flex"
        alignItems="center"
        gap={1}
        w="fit-content"
      >
        <Icon as={cfg.icon} boxSize={3} />
        {cfg.label}
      </Badge>

      <Text fontSize="lg" fontWeight="bold" color="brand.300" mb={1}>
        {alumno}
      </Text>

      <Text fontSize="md" color="gray.300" mb={1}>
        <strong>Mentoría:</strong> {tituloMentoria}
      </Text>

      <Text fontSize="sm" color="gray.400" mb={4}>
        Tema: {tema}
      </Text>

      <Text fontSize="sm" color="gray.400" mb={2}>
        <strong>Fecha:</strong> {fecha} — <strong>Hora:</strong> {hora}
      </Text>

      {mensaje && (
        <Text fontSize="sm" color="gray.300" mt={3} noOfLines={3}>
          <strong>Mensaje del alumno:</strong> {mensaje}
        </Text>
      )}

      {/* Estado final o botones */}
      {estadoActual === "pendiente" ? (
        <HStack mt={4}>
          <Button
            w="50%"
            colorScheme="green"
            onClick={() => setEstadoActual("aceptada")}
          >
            Aceptar
          </Button>

          <Button
            w="50%"
            colorScheme="red"
            onClick={() => setEstadoActual("cancelada")}
          >
            Rechazar
          </Button>
        </HStack>
      ) : (
        <Box
          mt={4}
          p={3}
          rounded="md"
          textAlign="center"
          bg={
            estadoActual === "aceptada"
              ? "green.900"
              : "red.900"
          }
          border="1px solid"
          borderColor={
            estadoActual === "aceptada"
              ? "green.400"
              : "red.400"
          }
        >
          <Text
            color={
              estadoActual === "aceptada"
                ? "green.300"
                : "red.300"
            }
            fontWeight="bold"
          >
            {estadoActual === "aceptada"
              ? "Esta solicitud fue aceptada."
              : "Esta solicitud fue cancelada."}
          </Text>
        </Box>
      )}
    </Box>
  );
}
