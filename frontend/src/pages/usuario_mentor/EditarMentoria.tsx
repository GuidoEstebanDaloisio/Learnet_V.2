import { Box, Heading, Input, Textarea, Button, FormControl, FormLabel, Badge } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RUTAS } from "../../routes";


export default function EditarMentoria() {
  const navigate = useNavigate();
  const location = useLocation();

  // Datos recibidos al tocar "Ver / Editar plantilla"
  const plantilla = location.state;

  const [titulo, setTitulo] = useState(plantilla?.titulo || "");
  const [descripcion, setDescripcion] = useState(plantilla?.descripcion || "");
  const [tema] = useState(plantilla?.tema || "");

  const handleSave = () => {
    console.log({ titulo, descripcion, tema });
    navigate( RUTAS.MENTOR.MENTORIAS);
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10} maxW="700px" mx="auto">
        <Heading mb={8} textAlign="center">
          Editar Plantilla
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
            fontSize="0.9rem"
            mb={5}
          >
            {tema}
          </Badge>

          <FormControl mb={5}>
            <FormLabel>Título</FormLabel>
            <Input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </FormControl>

          <FormControl mb={8}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={5}
            />
          </FormControl>

          {/* Botón Guardar */}
          <Button
            w="100%"
            colorScheme="brand"
            size="lg"
            onClick={handleSave}
          >
            Guardar Cambios
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
