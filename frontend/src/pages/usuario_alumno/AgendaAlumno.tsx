import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import SesionAsesoriaAlumnoCard from "../../components/alumno/SesiónAsesoríaAlumnoCard";
import { listarSesionesAlumno } from "../../api/sesionAsesoriaApi";  // Importamos la función de API
import { formatoFechaHoraLocal } from "../../utils/fechaConfig";

export default function AgendaAlumno() {
  const [sesiones, setSesiones] = useState<any[]>([]);  // State para almacenar las sesiones
  const [loading, setLoading] = useState(true);  // State para mostrar "Cargando..."

  useEffect(() => {
    const fetchSesiones = async () => {
      try {
        const res = await listarSesionesAlumno();  // Llamamos la API
        setSesiones(res.data);  // Guardamos las sesiones en el state
      } catch (error) {
        console.error("Error cargando las sesiones:", error);
      } finally {
        setLoading(false);  // Terminamos de cargar
      }
    };

    fetchSesiones();
  }, []);  // Solo se ejecuta una vez al montar el componente

  if (loading) return <Text p={10}>Cargando sesiones...</Text>;  // Mientras carga

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarAlumno />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">
          Mis Sesiones de Asesoría
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
          {sesiones.length > 0 ? (
            sesiones.map((s, i) => {
              const { fecha } = formatoFechaHoraLocal(s.fechaDesde);  // Formateamos la fecha
              const { hora: horaDesde } = formatoFechaHoraLocal(s.fechaDesde);
              const { hora: horaHasta } = formatoFechaHoraLocal(s.fechaHasta);
              const hora = `${horaDesde} a ${horaHasta}`;

              return (
                <SesionAsesoriaAlumnoCard
                  key={i}
                  mentor={`${s.mentor.nombre} ${s.mentor.apellido}`}
                  titulo={s.mentoria.titulo}
                  fecha={fecha}
                  hora={hora}
                  estado={s.estado.replace(" ", "-") as any}  // Aseguramos que el estado esté en el formato correcto
                />
              );
            })
          ) : (
            <Text>No tienes sesiones registradas.</Text>  // Mensaje si no hay sesiones
          )}
        </SimpleGrid>
      </Box>

      <Footer />
    </Box>
  );
}
