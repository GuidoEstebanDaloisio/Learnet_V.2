import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";


interface MentorCardProps {
  nombre: string;
  titulo: string;
  rating: number;
  cantidadRatings: number;
  disponible: boolean;
  imagen?: string;
}

export default function MentorCard({
  nombre,
  titulo,
  rating,
  cantidadRatings,
  disponible,
  imagen,
}: MentorCardProps) {
  const navigate = useNavigate();

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
      {/* Título / Nombre del mentor */}
      <Text fontSize="xl" color="brand.300" fontWeight="bold" mb={2}>
        {nombre}
      </Text>

      {/* Mentor + Avatar */}
      <Flex align="center" gap={3} mb={4}>
        <Avatar size="md" name={nombre} src={imagen} />
        <Text fontSize="md" color="gray.300">
          <Text as="span" fontWeight="bold">
            {titulo}
          </Text>
        </Text>
      </Flex>

      {/* Rating + Disponibilidad */}
      <Flex justify="space-between" align="center" mb={1}>
        <HStack spacing={1}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              as={FaStar}
              color={i < rating ? "brand.400" : "gray.700"}
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
        >
          {disponible ? "Disponible" : "Ocupado"}
        </Badge>
      </Flex>

      <Button
        mt={4}
        w="100%"
        colorScheme="brand"
        onClick={() => navigate(RUTAS.ALUMNO.DETALLE_MENTOR)}
      >
        Ver perfil
      </Button>
    </Box>
  );
}
