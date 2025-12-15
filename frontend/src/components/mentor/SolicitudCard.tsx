import {
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import Card from "../../theme/components/Card";
import SolicitudEstado from "../../theme/components/SolicitudEstado";

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
            variant="primary"
            onClick={() => onRechazar(id)}
          >
            Rechazar
          </Button>
        </HStack>
      )}

      {estado === "aceptada" && (
        <SolicitudEstado tipo="aceptada">
          Esta solicitud fue aceptada.
        </SolicitudEstado>
      )}

      {estado === "rechazada" && (
        <SolicitudEstado tipo="rechazada">
          Esta solicitud fue rechazada.
        </SolicitudEstado>
      )}
    </Card>
  );
}
