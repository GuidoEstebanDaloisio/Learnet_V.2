import { Box, Heading, Text, Badge, Button } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { RUTAS } from "../../routes";
import Panel from "../../theme/components/Panel";
import { useEffect, useState } from "react";
import { obtenerMentoriaPorId } from "../../api/mentoriaApi";

interface MentoriaDetalle {
  _id: string;
  titulo: string;
  descripcion: string;
  tema: {
    nombre: string;
  };
}

export default function DetalleMentoriaMentor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mentoria, setMentoria] = useState<MentoriaDetalle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentoria = async () => {
      try {
        if (!id) return;
        const res = await obtenerMentoriaPorId(id);
        setMentoria(res.data);
      } catch (error) {
        console.error("Error cargando mentoría:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentoria();
  }, [id]);

  if (loading) {
    return (
      <Box minH="100vh" display="flex" flexDirection="column">
        <NavbarMentor />
        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
          <Text>Cargando mentoría...</Text>
        </Box>
        <Footer />
      </Box>
    );
  }

  if (!mentoria) {
    return (
      <Box minH="100vh" display="flex" flexDirection="column">
        <NavbarMentor />
        <Box flex="1" display="flex" alignItems="center" justifyContent="center">
          <Text>No se encontró la mentoría</Text>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10} maxW="700px" mx="auto">
        <Heading mb={8} textAlign="center">
          Detalles de la Mentoría
        </Heading>

        <Panel>
          <Badge colorScheme="purple" mb={4} fontSize="1rem">
            {mentoria.tema.nombre}
          </Badge>

          <Text fontSize="2xl" fontWeight="bold" mb={4} color="brand.300">
            {mentoria.titulo}
          </Text>

          <Text fontSize="lg" mb={6} lineHeight="1.7">
            {mentoria.descripcion}
          </Text>

          <Button
            w="100%"
            variant="primary"
            onClick={() =>
              navigate(`${RUTAS.MENTOR.EDITAR_MENTORIA}/${mentoria._id}`)
            }
          >
            Editar Mentoría
          </Button>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
