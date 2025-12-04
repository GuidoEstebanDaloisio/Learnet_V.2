import { Box, Heading } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import SesionAsesoriaCard from "../../components/mentor/SesionAsesoriaCard";

// Ejemplo de sesiones de asesoría asignadas al mentor
const sesionesDeAsesoria = [
  {
    alumno: "Juan Pérez",
    tituloMentoria: "Introducción a React",
    fecha: "14/02/2025",
    hora: "17:00",
    estado: "no-iniciada",
  },
  {
    alumno: "Carla Rodríguez",
    tituloMentoria: "Machine Learning Avanzado",
    fecha: "20/02/2025",
    hora: "19:30",
    estado: "en-progreso",
  },
  {
    alumno: "Miguel Torres",
    tituloMentoria: "Ciberseguridad en Empresas",
    fecha: "02/02/2025",
    hora: "15:00",
    estado: "finalizada",
  },
  {
    alumno: "Sofía Gómez",
    tituloMentoria: "Inicios en Excel",
    fecha: "02/02/2025",
    hora: "15:00",
    estado: "cancelada",
  },
];

export default function Agenda() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">
          Mi Agenda de Sesiones de Asesoría
        </Heading>

        <Box
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          }}
          gap={8}
        >
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
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
