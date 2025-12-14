import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import Card from "../../theme/components/Card";
import { MdEvent } from "react-icons/md";


interface IndisposicionCardProps {
  fecha: string;
  horaDesde: string;
  horaHasta: string;
  motivo?: string;
}

export default function IndisposicionCard({ fecha, horaDesde, horaHasta, motivo }: IndisposicionCardProps) {

  return (
    <Card>
      {/* Icono + Fecha y Horario */}
      <Flex align="center" mb={3} gap={3}>
        <Icon as={MdEvent} boxSize={6} color="brand.300" />
        <Box>
          <Text fontWeight="bold" color="brand.300">
            {new Date(fecha).toLocaleDateString()}
          </Text>
          <Text fontSize="sm" color="gray.400">
            {horaDesde} — {horaHasta}
          </Text>
        </Box>
      </Flex>

      {/* Motivo */}
      {motivo && (
        <Text fontSize="sm" color="gray.400" mb={3}>
          Motivo: {motivo}
        </Text>
      )}
    </Card>
  );
}
