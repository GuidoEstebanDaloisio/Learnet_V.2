import {
  Box,
  Text,
  Button,
  HStack
} from "@chakra-ui/react";
import Card from "../../theme/components/Card";

import { useState } from "react";

interface SolicitudCardProps {
  alumno: string;
  tituloMentoria: string;
  tema: string;
  fecha: string;
  horario: string;
  mensaje?: string;
  estado: "pendiente" | "aceptada" | "cancelada";
}


export default function SolicitudCard({
  alumno,
  tituloMentoria,
  tema,
  fecha,
  horario,
  mensaje,
  estado,
}: SolicitudCardProps) {
  const [estadoActual, setEstadoActual] = useState(estado);

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
        <strong>Fecha:</strong> {fecha} — <strong>Hora:</strong> {horario}
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
            variant="primary"
            onClick={() => setEstadoActual("aceptada")}
          >
            Aceptar
          </Button>

          <Button
            w="50%"
            variant="primary"
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
    </Card>
  );
}