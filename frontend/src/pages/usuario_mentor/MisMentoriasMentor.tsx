import { Box, Heading, Button, SimpleGrid, Text } from "@chakra-ui/react";
import Footer from "../../components/Footer";
import MentoriaCardMentor from "../../components/mentor/MentoriaCardMentor";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";
import { useEffect, useState } from "react";
import { listarMentoriasDelMentor } from "../../api/mentoriaApi";

interface Mentoria {
  _id: string;
  titulo: string;
  descripcion: string;
  tema: {
    nombre: string;
    slug: string;
  };
}

export default function MisMentoriasMentor() {
  const navigate = useNavigate();
  const [mentorias, setMentorias] = useState<Mentoria[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentorias = async () => {
      try {
        const res = await listarMentoriasDelMentor();
        setMentorias(res.data);
      } catch (error) {
        console.error("Error cargando mentorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorias();
  }, []);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10} maxW="1200px" mx="auto">
        <Heading mb={8} textAlign="center">
          Mis Mentorías
        </Heading>

        <Box display="flex" justifyContent="center" mb={10}>
          <Button
            variant="primary"
            onClick={() => navigate(RUTAS.MENTOR.NUEVA_MENTORIA)}
          >
            + Crear Nueva Mentoría
          </Button>
        </Box>

        {loading && (
          <Text textAlign="center" opacity={0.7}>
            Cargando mentorías...
          </Text>
        )}

        {!loading && mentorias.length === 0 && (
          <Text textAlign="center" opacity={0.7}>
            Todavía no creaste ninguna mentoría.
          </Text>
        )}

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
          {mentorias.map((m) => (
            <MentoriaCardMentor
              key={m._id}
              titulo={m.titulo}
              descripcion={m.descripcion}
              tema={m.tema.nombre}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Footer />
    </Box>
  );
}
