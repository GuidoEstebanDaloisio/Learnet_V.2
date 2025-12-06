import { Box, Heading, Text, Badge, Button } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";

export default function DetalleMentoriaMentor() {
  const navigate = useNavigate();
 
  // DATOS HARCODEADOS PARA VER EL DISEÑO
  const plantilla = {
    titulo: "Introducción a React",
    descripcion:
      "En esta mentoría aprenderás los fundamentos de React, componentes, props, estado, hooks y cómo estructurar proyectos modernos.",
    tema: "Programación",
    id: 1,
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box
        flex="1"
        px={{ base: 4, md: 12 }}
        py={10}
        maxW="700px"
        mx="auto"
      >
        <Heading mb={8} textAlign="center">
          Detalles de la Plantilla
        </Heading>

        <Box
          bg="gray.800"
          p={8}
          rounded="lg"
          shadow="md"
          borderWidth="1px"
          borderColor="gray.700"
        >
          {/* Tema */}
          <Badge
            colorScheme="purple"
            px={3}
            py={1}
            rounded="md"
            mb={4}
            fontSize="1rem"
          >
            {plantilla.tema}
          </Badge>

          {/* Título */}
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="brand.300"
            mb={4}
          >
            {plantilla.titulo}
          </Text>

          {/* Descripción */}
          <Text fontSize="lg" color="gray.300" mb={6} lineHeight="1.7">
            {plantilla.descripcion}
          </Text>

          {/* Botón Editar */}
          <Button
            w="100%"
            size="lg"
            colorScheme="brand"
            onClick={() => navigate( RUTAS.MENTOR.EDITAR_MENTORIA)}
          >
            Editar Plantilla
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}