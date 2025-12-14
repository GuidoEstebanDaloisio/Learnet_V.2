import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";
import { crearIndisposicion } from "../../api/disponibilidadApi";
import { mostrarToast } from "../../utils/toast";
import { RUTAS } from "../../routes";

export default function NuevaIndisposicion() {
  const navigate = useNavigate();
  const toast = useToast();

  const [fecha, setFecha] = useState("");
  const [horaDesde, setHoraDesde] = useState("08:00");
  const [horaHasta, setHoraHasta] = useState("16:00");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCrearIndisposicion = async () => {
    if (!fecha || !horaDesde || !horaHasta || !motivo.trim()) {
      mostrarToast(toast, "error", "Por favor completa todos los campos obligatorios");
      return;
    }

    setLoading(true);
    try {
      await crearIndisposicion({ fecha, horaDesde, horaHasta, motivo });
      mostrarToast(toast, "success", "Excepción creada correctamente");
      navigate(RUTAS.MENTOR.AGENDA); // Volver a la agenda
    } catch (error) {
      console.error("Error creando excepción:", error);
      mostrarToast(toast, "error", "Error al crear la excepción");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">
          Nueva Excepción de Disponibilidad
        </Heading>

        <Panel maxW="600px" mx="auto">
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Fecha</FormLabel>
              <Input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Desde</FormLabel>
              <Input
                type="time"
                value={horaDesde}
                onChange={(e) => setHoraDesde(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Hasta</FormLabel>
              <Input
                type="time"
                value={horaHasta}
                onChange={(e) => setHoraHasta(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Motivo</FormLabel>
              <Textarea
                placeholder="Describe el motivo de la excepción"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </FormControl>

            <Button
              colorScheme="red"
              onClick={handleCrearIndisposicion}
              isLoading={loading}
            >
              Crear Indisposicion
            </Button>
          </VStack>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
