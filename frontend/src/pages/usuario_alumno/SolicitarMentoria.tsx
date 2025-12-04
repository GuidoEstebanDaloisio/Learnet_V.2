import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Textarea,
  Button,
  Stack,
  FormControl,
  FormLabel
} from "@chakra-ui/react";

import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import { useState } from "react";

export default function SolicitarMentoria() {
  // Datos HARDCODEADOS para vista preliminar
  const mentorias = [
    "React Básico",
    "React Avanzado",
    "JavaScript desde 0",
    "Ciberseguridad Web"
  ];

  const horarios = [
    "Lunes 18:00 - 20:00",
    "Miércoles 17:00 - 19:00",
    "Viernes 19:00 - 21:00"
  ];

  const [selectedMentoria, setSelectedMentoria] = useState("");
  const [selectedHorario, setSelectedHorario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviarSolicitud = () => {
    const data = {
      mentoria: selectedMentoria,
      horario: selectedHorario,
      mensaje
    };

    console.log("Solicitud enviada:", data);
  };

  return (
    <>
      <NavbarAlumno />

      <Box px={6} py={10} minH="100vh">
        <Box
          bg="gray.800"
          p={8}
          rounded="2xl"
          shadow="xl"
          borderWidth="1px"
          borderColor="gray.700"
          maxW="700px"
          mx="auto"
        >
          <Heading size="lg" mb={4} color="brand.300">
            Solicitar mentoría
          </Heading>

          <Text fontSize="md" color="gray.400" mb={6}>
            Selecciona la mentoría, el horario y envía un mensaje opcional.
          </Text>

          <Stack spacing={5}>
            {/* SELECT MENTORÍA */}
            <FormControl>
              <FormLabel>Mentoría</FormLabel>
              <Select
                placeholder="Elige una mentoría"
                bg="gray.700"
                borderColor="gray.600"
                value={selectedMentoria}
                onChange={(e) => setSelectedMentoria(e.target.value)}
              >
                {mentorias.map((m, i) => (
                  <option key={i} value={m}>{m}</option>
                ))}
              </Select>
            </FormControl>

            {/* SELECT HORARIO */}
            <FormControl>
              <FormLabel>Horario</FormLabel>
              <Select
                placeholder="Elige un horario disponible"
                bg="gray.700"
                borderColor="gray.600"
                value={selectedHorario}
                onChange={(e) => setSelectedHorario(e.target.value)}
              >
                {horarios.map((h, i) => (
                  <option key={i} value={h}>{h}</option>
                ))}
              </Select>
            </FormControl>

            {/* MENSAJE OPCIONAL */}
            <FormControl>
              <FormLabel>Mensaje opcional</FormLabel>
              <Textarea
                placeholder="Escribe un mensaje para el mentor (opcional)"
                bg="gray.700"
                borderColor="gray.600"
                resize="none"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </FormControl>

            {/* BOTÓN */}
            <Button
              colorScheme="brand"
              size="lg"
              mt={4}
              isDisabled={!selectedMentoria || !selectedHorario}
              onClick={enviarSolicitud}
            >
              Enviar solicitud
            </Button>
          </Stack>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
