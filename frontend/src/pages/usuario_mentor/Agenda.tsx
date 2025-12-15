import { Box, Heading, SimpleGrid, Text, Button, Divider } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import SesionAsesoriaCard from "../../components/mentor/SesionAsesoriaCard";
import IndisposicionCard from "../../components/mentor/IndisposicionCard";
import { useEffect, useState } from "react";
import { obtenerIndisposiciones } from "../../api/disponibilidadApi";
import { listarSesionesMentor } from "../../api/sesionAsesoriaApi";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";
import { formatoFechaHoraLocal } from "../../utils/fechaConfig";

interface Indisposicion {
  _id: string;
  fecha: string;
  horaDesde: string;
  horaHasta: string;
  motivo?: string;
}

interface Sesion {
  _id: string;
  alumno: {
    nombre: string;
    apellido: string;
  };
  mentoria: {
    titulo: string;
    tema: {
      nombre: string;
    };
  };
  fechaDesde: string;
  fechaHasta: string;
  estado: "no iniciada" | "en progreso" | "cancelada" | "finalizada";
}

export default function Agenda() {
  const [indisposiciones, setIndisposiciones] = useState<Indisposicion[]>([]);
  const [sesiones, setSesiones] = useState<Sesion[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargarIndisposiciones = async () => {
    try {
      const res = await obtenerIndisposiciones();
      setIndisposiciones(res.data);
    } catch (error) {
      console.error("Error cargando indisposiciones:", error);
    }
  };

  const cargarSesiones = async () => {
    try {
      const res = await listarSesionesMentor();
      setSesiones(res.data);
    } catch (error) {
      console.error("Error cargando sesiones:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([cargarIndisposiciones(), cargarSesiones()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <Text p={10}>Cargando agenda...</Text>;

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">Mi Agenda de Sesiones de Asesoría</Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8} mb={10}>
          {sesiones.length > 0 ? (
            sesiones.map((s) => {
              const { fecha } = formatoFechaHoraLocal(s.fechaDesde);
              const { hora: horaDesde } = formatoFechaHoraLocal(s.fechaDesde);
              const { hora: horaHasta } = formatoFechaHoraLocal(s.fechaHasta);
              const hora = `${horaDesde} a ${horaHasta}`;
              const alumnoNombre = `${s.alumno.nombre} ${s.alumno.apellido}`;

              return (
                <SesionAsesoriaCard
                  key={s._id}
                  alumno={alumnoNombre}
                  tituloMentoria={s.mentoria.titulo}
                  fecha={fecha}
                  hora={hora}
                  estado={s.estado.replace(" ", "-") as any} 
                />
              );
            })
          ) : (
            <Text color="gray.400">No hay sesiones registradas.</Text>
          )}
        </SimpleGrid>

        <Divider my={8} />

        <Heading size="md" mb={4}>Indisposiciones</Heading>

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
