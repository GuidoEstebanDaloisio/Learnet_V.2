import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Icon,
  Link,
  Divider,
  Select,
  Input,
  Collapse,
} from "@chakra-ui/react";
import { FaUser, FaCalendar, FaClock, FaInfoCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useState } from "react";

/* ----------------------------------------
   INTERFACE: SESIÓN DE ASESORÍA
   ---------------------------------------- */

interface SesionAsesoria {
  idMentoria: string; // ID de la plantilla
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

  /* ----------------------------------------
     SESIÓN DE ASESORÍA HARDCODEADA (ejemplo)
     ---------------------------------------- */
  const sesionInicial: SesionAsesoria =
    state?.sesionAsesoria || {
      idMentoria: "123",
      tituloMentoria: "Ejemplo de Mentoría",
      descripcionMentoria:
        "Esta es la descripción de la mentoría asociada a esta sesión de asesoría.",
      alumno: "Juan Pérez",
      fecha: "14/02/2025",
      hora: "17:00",
      estado: "No iniciada",
      meetUrl: "https://meet.google.com/ejemplo",
    };

  const [sesionAsesoria, setSesionAsesoria] =
    useState<SesionAsesoria>(sesionInicial);

  const [mostrarReprogramar, setMostrarReprogramar] = useState(false);
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevaHora, setNuevaHora] = useState("");

  const actualizarEstado = (nuevoEstado: SesionAsesoria["estado"]) => {
    setSesionAsesoria({ ...sesionAsesoria, estado: nuevoEstado });
  };

  const guardarNuevaFecha = () => {
    if (!nuevaFecha || !nuevaHora) return;

    const fechaFormateada = nuevaFecha.split("-").reverse().join("/");

    setSesionAsesoria({
      ...sesionAsesoria,
      fecha: fechaFormateada,
      hora: nuevaHora,
    });

    setMostrarReprogramar(false);
    setNuevaFecha("");
    setNuevaHora("");
  };

  return (
    <>
      <NavbarMentor />

      <Box minH="100vh" px={6} py={10} display="flex" justifyContent="center">
        <Box
          bg="gray.800"
          p={8}
          rounded="2xl"
          shadow="2xl"
          borderWidth="1px"
          borderColor="gray.700"
          maxW="700px"
          w="100%"
        >
          {/* TÍTULO DE LA PLANTILLA */}
          <Flex align="center" mb={4} gap={3}>
            <Icon as={FaInfoCircle} boxSize={7} color="brand.300" />
            <Text fontSize="3xl" fontWeight="bold" color="brand.300">
              {sesionAsesoria.tituloMentoria}
            </Text>
          </Flex>

          {/* DESCRIPCIÓN DE LA PLANTILLA */}
          <Text color="gray.300" fontSize="lg" mb={6}>
            {sesionAsesoria.descripcionMentoria}
          </Text>

          <Divider  />

          {/* INFORMACIÓN DE LA SESIÓN DE ASESORÍA */}
          <Box
            bg="gray.700"
            p={5}
            rounded="xl"
            borderWidth="1px"
            borderColor="gray.600"
            mb={6}
          >
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
          </Box>

          <Divider  />

          {/* CAMBIAR ESTADO */}
          <Box
            bg="gray.700"
            p={5}
            rounded="xl"
            borderWidth="1px"
            borderColor="gray.600"
            mb={6}
          >
            <Text fontSize="lg" color="gray.200" fontWeight="bold" mb={3}>
              Cambiar estado de la sesión de asesoría
            </Text>

            <Select
              value={sesionAsesoria.estado}
              onChange={(e) =>
                actualizarEstado(e.target.value as SesionAsesoria["estado"])
              }
              bg="gray.800"
              borderColor="gray.600"
              color="white"
              _hover={{ borderColor: "brand.300" }}
              _focus={{ borderColor: "brand.300" }}
            >
              <option value="No iniciada">No iniciada</option>
              <option value="En proceso">En proceso</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelada">Cancelada</option>
            </Select>
          </Box>

          <Divider />

          {/* BOTÓN PARA REPROGRAMAR */}
          <Button
            w="100%"
            colorScheme="yellow"
            mb={3}
            onClick={() => setMostrarReprogramar(!mostrarReprogramar)}
          >
            Reprogramar sesión de asesoría
          </Button>

          {/* PANEL DE REPROGRAMACIÓN */}
          <Collapse in={mostrarReprogramar} animateOpacity>
            <Box
              bg="gray.700"
              p={5}
              rounded="xl"
              borderWidth="1px"
              borderColor="gray.600"
              mt={3}
            >
              <Text color="gray.200" mb={3} fontWeight="bold">
                Seleccionar nueva fecha y hora
              </Text>

              <Input
                type="date"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                mb={3}
                bg="gray.800"
                borderColor="gray.600"
                color="white"
              />

              <Input
                type="time"
                value={nuevaHora}
                onChange={(e) => setNuevaHora(e.target.value)}
                mb={4}
                bg="gray.800"
                borderColor="gray.600"
                color="white"
              />

              <Button
                w="100%"
                colorScheme="green"
                onClick={guardarNuevaFecha}
                isDisabled={!nuevaFecha || !nuevaHora}
              >
                Guardar nueva fecha
              </Button>
            </Box>
          </Collapse>

          <Divider  />

          {/* LINK MEET */}
          <Link
            href={sesionAsesoria.meetUrl}
            target="_blank"
            style={{ width: "100%" }}
          >
            <Button w="100%" size="lg" colorScheme="brand">
              Unirse a la sesión de asesoría
            </Button>
          </Link>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
