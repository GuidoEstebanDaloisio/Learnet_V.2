import { Box, Heading, Input, Textarea, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NuevaMentoria() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tema, setTema] = useState("");

  const handleSubmit = () => {
    // Aquí enviás la data a tu backend o store
    console.log({ titulo, descripcion, tema });
    navigate("/mentor/mentorias"); // Vuelve a la lista
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10} maxW="700px" mx="auto">
        <Heading mb={8} textAlign="center">
          Crear Nueva Mentoría
        </Heading>

        {/* Formulario */}
        <Box
          bg="gray.800"
          p={8}
          rounded="lg"
          shadow="md"
          borderWidth="1px"
          borderColor="gray.700"
        >
          <FormControl mb={5}>
            <FormLabel>Título de la mentoría</FormLabel>
            <Input
              placeholder="Ej: Introducción a UX/UI"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              placeholder="Describe brevemente qué aprenderá el alumno..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </FormControl>

          <FormControl mb={8}>
            <FormLabel>Tema</FormLabel>
            <Select
              placeholder="Selecciona una categoría"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            >
              <option value="Programación">Programación</option>
              <option value="Marketing">Marketing</option>
              <option value="Diseño">Diseño</option>
              <option value="Project Management">Project Management</option>
              <option value="Idiomas">Idiomas</option>
            </Select>
          </FormControl>

          <Button w="100%" colorScheme="brand" size="lg" onClick={handleSubmit}>
            Crear Mentoría
          </Button>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
