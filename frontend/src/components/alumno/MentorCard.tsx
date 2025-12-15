import {
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  Icon,
  HStack
} from "@chakra-ui/react";
import Card from "../../theme/components/Card";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";

interface MentorCardProps {
  id: string,
  nombre: string;
  titulo: string;
  rating: number;
  cantidadRatings: number;
  disponible: boolean;
  imagen?: string;
}

export default function MentorCard({
  id,
  nombre,
  titulo,
  rating,
  cantidadRatings,
  disponible,
  imagen,
}: MentorCardProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <Text fontSize="lg" color="brand.300" fontWeight="bold" mb={3}>
        {nombre}
      </Text>

      <Flex align="center" gap={4} mb={4}>
        <Avatar size="lg" name={nombre} src={imagen} />
        <Text fontSize="md" color="gray.300">
          <Text as="span" fontWeight="semibold">{titulo}</Text>
        </Text>
      </Flex>

      <Flex justify="space-between" align="center" mb={3}>
        <HStack spacing={1}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              as={FaStar}
              color={i < rating ? "brand.400" : "gray.600"}
              boxSize={4}
            />
          ))}

          <Text fontSize="sm" color="gray.400">
            ({cantidadRatings})
          </Text>
        </HStack>

        <Badge
          colorScheme={disponible ? "green" : "red"}
          px={2}
          py={1}
          rounded="md"
          fontSize="0.75rem"
        >
          {disponible ? "Disponible" : "Ocupado"}
        </Badge>
      </Flex>

      <Button
        w="100%"
        variant="primary"
        onClick={() => navigate(`${RUTAS.ALUMNO.DETALLE_MENTOR}/${id}`)}
      >
        Ver perfil
      </Button>
    </Card>
  );
}
