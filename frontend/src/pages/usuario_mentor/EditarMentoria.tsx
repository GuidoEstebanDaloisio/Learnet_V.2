import { Box, Heading } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MentoriaForm from "../../components/mentor/MentoriaForm";
import { RUTAS } from "../../routes";
import { editarMentoria, obtenerMentoriaPorId, listarTemas } from "../../api/mentoriaApi";

export default function EditarMentoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const plantilla = location.state;

  const [titulo, setTitulo] = useState(plantilla?.titulo || "");
  const [descripcion, setDescripcion] = useState(plantilla?.descripcion || "");
  const [tema, setTema] = useState(plantilla?.tema || "");
  const [temas, setTemas] = useState<
    { _id: string; nombre: string; slug: string }[]
  >([]);

  // 🔹 Cargar temas y mentoría (si se refresca la página)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const temasRes = await listarTemas();
        setTemas(temasRes.data);

        // Si NO vino state, pedimos la mentoría al backend
        if (!plantilla && id) {
          const mentoriaRes = await obtenerMentoriaPorId(id);
          setTitulo(mentoriaRes.data.titulo);
          setDescripcion(mentoriaRes.data.descripcion);
          setTema(mentoriaRes.data.tema._id);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };

    fetchData();
  }, [id, plantilla]);

  // 🔹 Guardar cambios
  const handleSave = async () => {
    if (!id) return;

    try {
      await editarMentoria(id, {
        titulo,
        descripcion,
        tema,
      });

      navigate(RUTAS.MENTOR.MENTORIAS);
    } catch (error) {
      console.error("Error editando mentoría:", error);
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">
          Editar Plantilla
        </Heading>

        <MentoriaForm
          titulo={titulo}
          descripcion={descripcion}
          tema={tema}
          temas={temas}
          onChangeTitulo={setTitulo}
          onChangeDescripcion={setDescripcion}
          onChangeTema={setTema}
          onSubmit={handleSave}
          modo="editar"
        />
      </Box>

      <Footer />
    </Box>
  );
}
