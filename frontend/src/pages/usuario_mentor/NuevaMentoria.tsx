import { Box, Heading } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MentoriaForm from "../../components/mentor/MentoriaForm";
import { listarTemas, crearMentoria } from "../../api/mentoriaApi"; // ✅ importamos la API

export default function NuevaMentoria() {
  const navigate = useNavigate();
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
      }
    };
    fetchTemas();
  }, []);

  const handleSubmit = async () => {
    try {
      if (!tema) {
        console.error("Debe seleccionar un tema");
        return;
      }

      await crearMentoria({ titulo, descripcion, tema }); // tema = id
      navigate("/mentor/mentorias");
    } catch (error) {
      console.error("Error creando mentoría:", error);
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
          temas={temas} // ✅ pasamos los temas al form
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
