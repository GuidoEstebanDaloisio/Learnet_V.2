import {
  Box,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import Card from "../../theme/components/Card";

interface SolicitudCardProps {
  id: string;
  alumno: string;
  tituloMentoria: string;
  tema: string;
  fecha: string;
  horario: string;
  mensaje?: string;
  estado: "pendiente" | "aceptada" | "rechazada";
  onAceptar: (id: string) => void;
  onRechazar: (id: string) => void;
}

export default function SolicitudCard({
  id,
  alumno,
  tituloMentoria,
  tema,
  fecha,
  horario,
  mensaje,
  estado,
  onAceptar,
  onRechazar,
}: SolicitudCardProps) {
  return (
    <Card>
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
        <strong>Fecha:</strong> {fecha} — <strong>Horario:</strong> {horario}
      </Text>

      {mensaje && (
        <Text fontSize="sm" color="gray.300" mt={3} noOfLines={3}>
          <strong>Mensaje del alumno:</strong> {mensaje}
        </Text>
      )}

      {estado === "pendiente" && (
        <HStack mt={4}>
          <Button
            w="50%"
            variant="primary"
            onClick={() => onAceptar(id)}
          >
            Aceptar
          </Button>

          <Button
            w="50%"
            colorScheme="red"
            onClick={() => onRechazar(id)}
          >
            Rechazar
          </Button>
        </HStack>
      )}

      {estado === "aceptada" && (
        <Box
          mt={4}
          p={3}
          rounded="md"
          textAlign="center"
          bg="green.900"
          border="1px solid"
          borderColor="green.400"
        >
          <Text color="green.300" fontWeight="bold">
            Esta solicitud fue aceptada.
          </Text>
        </Box>
      )}

      {estado === "rechazada" && (
        <Box
          mt={4}
          p={3}
          rounded="md"
          textAlign="center"
          bg="red.900"
          border="1px solid"
          borderColor="red.400"
        >
          <Text color="red.300" fontWeight="bold">
            Esta solicitud fue rechazada.
          </Text>
        </Box>
      )}
    </Card>
  );
}
