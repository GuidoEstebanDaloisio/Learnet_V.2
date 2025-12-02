import { Box, Flex, Text, Badge, Button } from "@chakra-ui/react";

interface MentoriaCardMentorProps {
  titulo: string;
  descripcion: string;
  tema: string;
}

export default function MentoriaCardMentor({
  titulo,
  descripcion,
  tema,
}: MentoriaCardMentorProps) {

  return (
    <Box
      bg="gray.800"
      p={5}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.700"
      _hover={{ shadow: "lg", transform: "translateY(-3px)", borderColor: "brand.400" }}
      transition="0.2s"
    >
      {/* Tema */}
      <Badge
        colorScheme="purple"
        mb={3}
        px={3}
        py={1}
        rounded="md"
        fontSize="0.8rem"
      >
        {tema}
      </Badge>

      {/* Título */}
      <Text fontSize="xl" color="brand.300" fontWeight="bold" mb={2}>
        {titulo}
      </Text>

      {/* Descripción */}
      <Text fontSize="md" color="gray.300" noOfLines={3} mb={4}>
        {descripcion}
      </Text>

      <Button
        w="100%"
        colorScheme="brand"
      >
        Ver / Editar plantilla
      </Button>
    </Box>
  );
}
