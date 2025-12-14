import { Box, Heading, SimpleGrid, Text, Button, Divider } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import SesionAsesoriaCard from "../../components/mentor/SesionAsesoriaCard";
import IndisposicionCard from "../../components/mentor/IndisposicionCard";
import { useEffect, useState } from "react";
import { obtenerIndisposiciones } from "../../api/disponibilidadApi";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";

interface Indisposicion {
  _id: string;
  fecha: string;
  horaDesde: string;
  horaHasta: string;
  motivo?: string;
}

const sesionesDeAsesoria = [
  { alumno: "Juan Pérez", tituloMentoria: "Introducción a React", fecha: "14/02/2025", hora: "17:00", estado: "no-iniciada" },
  { alumno: "Carla Rodríguez", tituloMentoria: "Machine Learning Avanzado", fecha: "20/02/2025", hora: "19:30", estado: "en-progreso" },
  { alumno: "Miguel Torres", tituloMentoria: "Ciberseguridad en Empresas", fecha: "02/02/2025", hora: "15:00", estado: "finalizada" },
  { alumno: "Sofía Gómez", tituloMentoria: "Inicios en Excel", fecha: "02/02/2025", hora: "15:00", estado: "cancelada" },
];

export default function Agenda() {
  const [indisposiciones, setIndisposiciones] = useState<Indisposicion[]>([]);
  const navigate = useNavigate();

  const cargarIndisposiciones = async () => {
    try {
      const res = await obtenerIndisposiciones();
      setIndisposiciones(res.data);
    } catch (error) {
      console.error("Error cargando indisposiciones:", error);
    }
  };

  useEffect(() => {
    cargarIndisposiciones();
  }, []);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">Mi Agenda de Sesiones de Asesoría</Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8} mb={10}>
          {sesionesDeAsesoria.map((s, i) => (
            <SesionAsesoriaCard
              key={i}
              alumno={s.alumno}
              tituloMentoria={s.tituloMentoria}
              fecha={s.fecha}
              hora={s.hora}
              estado={s.estado as any}
            />
          ))}
        </SimpleGrid>

        <Divider my={8} />

        <Heading size="md" mb={4}>Indisposiciones</Heading>

        {/* Usamos SimpleGrid como con las sesiones */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8} mb={6}>
          {indisposiciones.length > 0 ? (
            indisposiciones.map(e => (
              <IndisposicionCard
                key={e._id}
                fecha={e.fecha}
                horaDesde={e.horaDesde}
                horaHasta={e.horaHasta}
                motivo={e.motivo}
              />
            ))
          ) : (
            <Text color="gray.400">No hay indisposiciones registradas.</Text>
          )}
        </SimpleGrid>


        <Button
          colorScheme="green"
          onClick={() => navigate(RUTAS.MENTOR.NUEVA_INDISPOSICION)}
        >
          Crear nueva indisposicion
        </Button>
      </Box>

      <Footer />
    </Box>
  );
}
