import { Box, Heading, Text, Badge, Button } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";
import Panel from "../../theme/components/Panel";

export default function DetalleMentoriaMentor() {
  const navigate = useNavigate();

  // Datos harcodeados para layout
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

      <Box flex="1" px={{ base: 4, md: 12 }} py={10} maxW="700px" mx="auto">
        <Heading mb={8} textAlign="center">
          Detalles de la Plantilla
        </Heading>

        <Panel>
          <Badge
            colorScheme="purple"
            mb={4}
            fontSize="1rem"
          >
            {plantilla.tema}
          </Badge>

          <Text fontSize="2xl" fontWeight="bold" mb={4} color="brand.300">
            {plantilla.titulo}
          </Text>

          <Text fontSize="lg" mb={6} lineHeight="1.7">
            {plantilla.descripcion}
          </Text>

          <Button
            w="100%"
            variant="primary"
            onClick={() => navigate(RUTAS.MENTOR.EDITAR_MENTORIA)}
          >
            Editar Plantilla
          </Button>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
