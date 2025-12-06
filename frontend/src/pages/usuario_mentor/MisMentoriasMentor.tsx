import { Box, Heading, Button } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import MentoriaCardMentor from "../../components/mentor/MentoriaCardMentor";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";


const plantillas = [
  {
    titulo: "Introducción a React",
    descripcion: "Aprenderás los fundamentos de React, componentes, props y el ciclo de vida.",
    tema: "Programación",
  },
  {
    titulo: "Fundamentos de Marketing Digital",
    descripcion: "Un recorrido por estrategias digitales, redes sociales y análisis de campañas.",
    tema: "Marketing",
  },
  {
    titulo: "Gestión de Proyectos Ágil",
    descripcion: "Qué es Scrum, roles, ceremonias y cómo aplicarlo al trabajo real.",
    tema: "Project Management",
  },
];

export default function MisMentoriasMentor() {
  const navigate = useNavigate();

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={6} textAlign="center">
          Mis Mentorías
        </Heading>

        {/* Botón Crear Nueva Mentoría */}
        <Box display="flex" justifyContent="center" mb={8}>
          <Button
            colorScheme="brand"
            size="lg"
            onClick={() => navigate( RUTAS.MENTOR.NUEVA_MENTORIA)}
          >
            + Crear Nueva Mentoría
          </Button>
        </Box>

        {/* GRID DE CARDS */}
        <Box
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          }}
          gap={8}
        >
          {plantillas.map((p, i) => (
            <MentoriaCardMentor
              key={i}
              titulo={p.titulo}
              descripcion={p.descripcion}
              tema={p.tema}
            />
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
