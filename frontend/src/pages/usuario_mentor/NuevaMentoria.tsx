import { Box, Heading, useToast } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MentoriaForm from "../../components/mentor/MentoriaForm";
import { listarTemas, crearMentoria } from "../../api/mentoriaApi";
import { mostrarToast } from "../../utils/toast";
import { RUTAS } from "../../routes";

export default function NuevaMentoria() {
  const navigate = useNavigate();
  const toast = useToast();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tema, setTema] = useState(""); // tema será el id de MongoDB
  const [temas, setTemas] = useState<{ _id: string; nombre: string; slug: string }[]>([]);

  useEffect(() => {
    const fetchTemas = async () => {
      try {
        const res = await listarTemas();
        setTemas(res.data);
      } catch (error) {
        console.error("Error cargando temas:", error);
        mostrarToast(toast, "error", "Error cargando los temas");
      }
    };
    fetchTemas();
  }, [toast]);

  const handleSubmit = async () => {
    if (!tema) {
      mostrarToast(toast, "error", "Debes seleccionar un tema");
      return;
    }

    try {
      await crearMentoria({ titulo, descripcion, tema });
      mostrarToast(toast, "success", "Mentoría creada con éxito");

      // Redirigir después de un pequeño delay
      setTimeout(() => {
        navigate(RUTAS.MENTOR.MENTORIAS);
      }, 500);
    } catch (error) {
      console.error("Error creando mentoría:", error);
      mostrarToast(toast, "error", "Error al crear la mentoría");
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">
          Crear Nueva Mentoría
        </Heading>

        <MentoriaForm
          titulo={titulo}
          descripcion={descripcion}
          tema={tema}
          temas={temas}
          onChangeTitulo={setTitulo}
          onChangeDescripcion={setDescripcion}
          onChangeTema={setTema}
          onSubmit={handleSubmit}
          modo="crear"
        />
      </Box>

      <Footer />
    </Box>
  );
}
