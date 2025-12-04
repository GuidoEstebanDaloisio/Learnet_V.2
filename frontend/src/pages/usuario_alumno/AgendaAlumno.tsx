import { Box, Heading } from "@chakra-ui/react";
import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import SesionAsesoriaAlumnoCard from "../../components/alumno/SesiónAsesoríaAlumnoCard";

const sesiones = [
  {
    mentor: "Ana Torres",
    titulo: "Introducción a React",
    fecha: "14/02/2025",
    hora: "17:00",
    estado: "no-iniciada",
  },
  {
    mentor: "Luis Fernández",
    titulo: "Machine Learning Avanzado",
    fecha: "20/02/2025",
    hora: "19:30",
    estado: "en-progreso",
  },
  {
    mentor: "María López",
    titulo: "Ciberseguridad en Empresas",
    fecha: "02/02/2025",
    hora: "15:00",
    estado: "finalizada",
  },
  {
    mentor: "Fernando Gomez",
    titulo: "Inicios en Excel",
    fecha: "02/02/2025",
    hora: "15:00",
    estado: "cancelada",
  },
];

export default function AgendaAlumno() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarAlumno />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">
          Mis Sesiones de Asesoría
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
          {sesiones.map((s, i) => (
            <SesionAsesoriaAlumnoCard
              key={i}
              mentor={s.mentor}
              titulo={s.titulo}
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
