import { Box, Heading } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MentoriaForm from "../../components/mentor/MentoriaForm";

export default function NuevaMentoria() {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tema, setTema] = useState("");

  const handleSubmit = () => {
    console.log({ titulo, descripcion, tema });
    navigate("/mentor/mentorias");
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
