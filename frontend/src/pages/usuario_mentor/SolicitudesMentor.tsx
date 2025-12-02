import { Box, Heading } from "@chakra-ui/react";
import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import SolicitudCard from "../../components/mentor/SolicitudCard";

const solicitudes = [
  {
    alumno: "Laura Gómez",
    tituloMentoria: "Introducción a React",
    tema: "Programación",
    fecha: "10/03/2025",
    hora: "16:00",
    mensaje: "Me gustaría comenzar lo antes posible.",
    estado: "pendiente",
  },
  {
    alumno: "Carlos Pérez",
    tituloMentoria: "Marketing Digital Básico",
    tema: "Marketing",
    fecha: "12/03/2025",
    hora: "18:30",
    mensaje: "",
    estado: "aceptada",
  },
  {
    alumno: "Marta Salinas",
    tituloMentoria: "Gestión de Proyectos Ágil",
    tema: "Project Management",
    fecha: "08/03/2025",
    hora: "14:00",
    mensaje: "Tengo conocimientos previos, quiero profundizar.",
    estado: "cancelada",
  },
];

export default function SolicitudesMentor() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarAlumno />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">
          Solicitudes de Mentoría
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
          {solicitudes.map((s, i) => (
            <SolicitudCard
              key={i}
              alumno={s.alumno}
              tituloMentoria={s.tituloMentoria}
              tema={s.tema}
              fecha={s.fecha}
              hora={s.hora}
              mensaje={s.mensaje}
              estado={s.estado as any}
            />
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
