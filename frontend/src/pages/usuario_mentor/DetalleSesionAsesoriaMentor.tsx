import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Icon,
  Divider,
  Select,
  Input,
  Collapse,
  useToast,
} from "@chakra-ui/react";
import { FaUser, FaCalendar, FaClock, FaInfoCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";
import { useState } from "react";
import { mostrarToast } from "../../utils/toast";
import { actualizarLinkSesion } from "../../api/sesionAsesoriaApi";

interface SesionAsesoria {
  id: string;
  tituloMentoria: string;
  descripcionMentoria: string;
  alumno: string;
  fecha: string;
  hora: string;
  estado: "No iniciada" | "En proceso" | "Finalizada" | "Cancelada";
  meetUrl: string;
}

const colorEstado: Record<SesionAsesoria["estado"], string> = {
  "No iniciada": "yellow",
  "En proceso": "blue",
  Finalizada: "green",
  Cancelada: "red",
};

export default function DetalleSesionAsesoriaMentor() {
  const { state } = useLocation();
  const toast = useToast();

  const sesionInicial: SesionAsesoria =
    state?.sesionAsesoria || {
      id: "123",
      tituloMentoria: "Ejemplo de Mentoría",
      descripcionMentoria:
        "Esta es la descripción de la mentoría asociada a esta sesión de asesoría.",
      alumno: "Juan Pérez",
      fecha: "14/02/2025",
      hora: "17:00",
      estado: "No iniciada",
      meetUrl: "",
    };

  const [sesionAsesoria, setSesionAsesoria] =
    useState<SesionAsesoria>(sesionInicial);
  const [mostrarReprogramar, setMostrarReprogramar] = useState(false);
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHora, setNuevaHora] = useState("");
  const [nuevoLink, setNuevoLink] = useState(sesionInicial.meetUrl);

  const actualizarEstado = (nuevoEstado: SesionAsesoria["estado"]) => {
    setSesionAsesoria({ ...sesionAsesoria, estado: nuevoEstado });
  };

  const guardarNuevaFecha = () => {
    if (!nuevaFecha || !nuevaHora) return;
    const fechaFormateada = nuevaFecha.split("-").reverse().join("/");
    setSesionAsesoria({ ...sesionAsesoria, fecha: fechaFormateada, hora: nuevaHora });
    setMostrarReprogramar(false);
    setNuevaFecha("");
    setNuevaHora("");
  };

  const guardarLinkMeet = async () => {
    if (!nuevoLink) {
      mostrarToast(toast, "info", "Debes ingresar el link de Meet antes de guardar");
      return;
    }

    try {
      await actualizarLinkSesion(sesionAsesoria.id, nuevoLink); // Llamada al backend
      setSesionAsesoria({ ...sesionAsesoria, meetUrl: nuevoLink });
      mostrarToast(toast, "success", "Link de Meet guardado correctamente");
    } catch (error) {
      mostrarToast(toast, "error", "Error al guardar el link de Meet");
      console.error(error);
    }
  };

  const unirseSesion = () => {
    if (!sesionAsesoria.meetUrl) {
      mostrarToast(toast, "info", "Debes ingresar el link de Meet antes de unirte");
      return;
    }
    window.open(sesionAsesoria.meetUrl, "_blank");
  };

  return (
    <>
      <NavbarMentor />
      <Box minH="100vh" px={6} py={10} display="flex" justifyContent="center">
        <Panel maxW="700px" w="100%">
          {/* Título */}
          <Flex align="center" mb={4} gap={3}>
            <Icon as={FaInfoCircle} boxSize={7} color="brand.300" />
            <Text fontSize="3xl" fontWeight="bold" color="brand.300">
              {sesionAsesoria.tituloMentoria}
            </Text>
          </Flex>

          {/* Descripción */}
          <Text color="gray.300" fontSize="lg" mb={6}>
            {sesionAsesoria.descripcionMentoria}
          </Text>

          <Divider />

          {/* Panel info sesión */}
          <Panel bg="gray.700" borderColor="gray.600" mt={6} mb={6}>
            <Flex align="center" gap={3} color="gray.300" mb={4}>
              <Icon as={FaUser} />
              <Text>
                <strong>Alumno:</strong> {sesionAsesoria.alumno}
              </Text>
            </Flex>
            <Flex align="center" gap={3} color="gray.300" mb={2}>
              <Icon as={FaCalendar} />
              <Text>
                <strong>Fecha:</strong> {sesionAsesoria.fecha}
              </Text>
            </Flex>
            <Flex align="center" gap={3} color="gray.300" mb={4}>
              <Icon as={FaClock} />
              <Text>
                <strong>Hora:</strong> {sesionAsesoria.hora}
              </Text>
            </Flex>
            <Flex align="center" gap={3}>
              <Icon as={FaInfoCircle} />
              <Text fontWeight="semibold" color="gray.200">
                Estado:
              </Text>
              <Badge
                colorScheme={colorEstado[sesionAsesoria.estado]}
                px={3}
                py={1}
                rounded="full"
                fontSize="sm"
              >
                {sesionAsesoria.estado}
              </Badge>
            </Flex>
          </Panel>

          <Divider />

          {/* Cambiar estado */}
          <Panel bg="gray.700" borderColor="gray.600" my={6}>
            <Text fontSize="lg" color="gray.200" fontWeight="bold" mb={3}>
              Cambiar estado de la sesión de asesoría
            </Text>
            <Select
              value={sesionAsesoria.estado}
              onChange={(e) =>
                actualizarEstado(e.target.value as SesionAsesoria["estado"])
              }
            >
              <option value="No iniciada">No iniciada</option>
              <option value="En proceso">En proceso</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelada">Cancelada</option>
            </Select>
          </Panel>

          <Divider />

          {/* Reprogramar */}
          <Button
            w="100%"
            variant="secondary"
            onClick={() => setMostrarReprogramar(!mostrarReprogramar)}
          >
            Reprogramar sesión de asesoría
          </Button>

          <Collapse in={mostrarReprogramar} animateOpacity>
            <Panel bg="gray.700" borderColor="gray.600" mt={3}>
              <Text color="gray.200" mb={3} fontWeight="bold">
                Seleccionar nueva fecha y hora
              </Text>
              <Input
                type="date"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                mb={3}
              />
              <Input
                type="time"
                value={nuevaHora}
                onChange={(e) => setNuevaHora(e.target.value)}
                mb={4}
              />
              <Button
                w="100%"
                variant="primary"
                onClick={guardarNuevaFecha}
                isDisabled={!nuevaFecha || !nuevaHora}
              >
                Guardar nueva fecha
              </Button>
            </Panel>
          </Collapse>

          <Divider mt={6} />

          {/* Link Meet / Input */}
          {!sesionAsesoria.meetUrl ? (
            <Panel bg="gray.700" borderColor="gray.600" mt={4}>
              <Text fontWeight="bold" color="gray.200" mb={2}>
                Ingresa el link de Meet
              </Text>
              <Input
                placeholder="https://meet.google.com/xxxx-xxxx-xxx"
                value={nuevoLink}
                onChange={(e) => setNuevoLink(e.target.value)}
                mb={3}
              />
              <Button w="100%" variant="primary" onClick={guardarLinkMeet}>
                Guardar link de Meet
              </Button>
            </Panel>
          ) : (
            <Button w="100%" variant="primary" mt={4} onClick={unirseSesion}>
              Unirse a la sesión de asesoría
            </Button>
          )}
        </Panel>
      </Box>

      <Footer />
    </>
  );
}
