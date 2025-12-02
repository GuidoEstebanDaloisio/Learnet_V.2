import {
  Box,
  Flex,
  Avatar,
  Text,
  Badge,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

interface MentorCardProps {
  nombre: string;
  titulo: string;             // Nuevo: título profesional
  rating: number;
  cantidadRatings: number;    // Nuevo: cantidad de personas que puntuaron
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
  return (
    <Box
      bg="gray.800"
      p={5}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.700"
      maxW="350px"
      w="100%"
      _hover={{
        shadow: "lg",
        transform: "translateY(-3px)",
        borderColor: "brand.400",
      }}
      transition="0.2s"
    >
      {/* HEADER */}
      <Flex align="center" gap={4}>
        <Avatar size="lg" name={nombre} src={imagen || undefined} />

        <Box>
          <Text fontWeight="bold" fontSize="lg" color="gray.100">
            {nombre}
          </Text>

          <Text color="gray.300" fontSize="sm">
            {titulo}
          </Text>
        </Box>
      </Flex>

      {/* RATING + ESTADO EN LA MISMA FILA */}
      <Flex justify="space-between" align="center" mt={4}>
        <HStack spacing={1}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon
              key={i}
              as={FaStar}
              color={i < rating ? "brand.400" : "gray.700"}
              boxSize={5}
            />
          ))}

          {/* Cantidad de personas */}
          <Text fontSize="sm" color="gray.400" ml={2}>
            ({cantidadRatings})
          </Text>
        </HStack>

        {/* Disponibilidad */}
        <Badge
          colorScheme={disponible ? "green" : "red"}
          bg={disponible ? "green.600" : "red.600"}
          color="white"
          px={2}
          py={1}
          rounded="md"
        >
          {disponible ? "Disponible" : "Ocupado"}
        </Badge>
      </Flex>

      {/* ACTION */}
      <Button mt={4} w="100%" colorScheme="brand">
        Ver perfil
      </Button>
    </Box>
  );
}
