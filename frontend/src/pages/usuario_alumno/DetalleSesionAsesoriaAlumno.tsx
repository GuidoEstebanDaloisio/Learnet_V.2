import {
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Icon,
  Link,
  Divider
} from "@chakra-ui/react";

import {
  FaUser,
  FaCalendar,
  FaClock,
  FaInfoCircle,
} from "react-icons/fa";

import { useLocation } from "react-router-dom";
import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";

interface SesionAsesoriaAlumno {
  titulo: string;
  descripcion: string;
  mentor: string;
  fecha: string;
  hora: string;
  estado: "No iniciada" | "En progreso" | "Finalizada" | "Cancelada";
  meetUrl: string;
}

const colorEstado: Record<SesionAsesoriaAlumno["estado"], string> = {
  "No iniciada": "yellow",
  "En progreso": "blue",
  "Finalizada": "green",
  "Cancelada": "red",
};

export default function DetalleSesionAsesoriaAlumno() {
  const { state } = useLocation();

  const sesion: SesionAsesoriaAlumno =
    state ||
    {
      titulo: "Ejemplo de Sesión de Asesoría",
      descripcion:
        "Esta es una descripción de ejemplo utilizada para visualizar cómo luce la página de detalles.",
      mentor: "Ana Torres",
      fecha: "10/02/2025",
      hora: "18:00",
      estado: "No iniciada",
      meetUrl: "https://meet.google.com/ejemplo",
    };

  return (
    <>
      <NavbarAlumno />

      <Box minH="100vh" px={6} py={10} display="flex" justifyContent="center">
        
        {/* PANEL PRINCIPAL */}
        <Panel maxW="700px" w="100%" p={8} rounded="2xl" shadow="2xl">
          
          {/* TÍTULO */}
          <Flex align="center" mb={4} gap={3}>
            <Icon as={FaInfoCircle} boxSize={7} color="brand.300" />
            <Text fontSize="3xl" fontWeight="bold" color="brand.300">
              {sesion.titulo}
            </Text>
          </Flex>

          <Text color="gray.300" fontSize="lg" mb={6}>
            {sesion.descripcion}
          </Text>

          <Divider/>

          {/* INFO GENERAL */}
          <Panel bg="gray.700" borderColor="gray.600" p={5} rounded="xl" mb={6}>
            <Flex align="center" gap={3} color="gray.300" mb={4}>
              <Icon as={FaUser} />
              <Text><strong>Mentor:</strong> {sesion.mentor}</Text>
            </Flex>

            <Flex align="center" gap={3} color="gray.300" mb={2}>
              <Icon as={FaCalendar} />
              <Text><strong>Fecha:</strong> {sesion.fecha}</Text>
            </Flex>

            <Flex align="center" gap={3} color="gray.300" mb={4}>
              <Icon as={FaClock} />
              <Text><strong>Hora:</strong> {sesion.hora}</Text>
            </Flex>

            {/* ESTADO */}
            <Flex align="center" gap={3}>
              <Icon as={FaInfoCircle} />
              <Text fontWeight="semibold" color="gray.200">Estado:</Text>

              <Badge
                colorScheme={colorEstado[sesion.estado]}
                rounded="full"
              >
                {sesion.estado}
              </Badge>
            </Flex>
          </Panel>

          <Divider/>

          {/* BOTÓN */}
          <Link href={sesion.meetUrl} target="_blank" style={{ width: "100%" }}>
            <Button w="100%" variant="primary">
              Unirse a la sesión
            </Button>
          </Link>

        </Panel>

      </Box>

      <Footer />
    </>
  );
}
