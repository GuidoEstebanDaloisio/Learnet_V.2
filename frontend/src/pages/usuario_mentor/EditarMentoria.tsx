import { Box, Heading } from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import MentoriaForm from "../../components/mentor/MentoriaForm";
import { RUTAS } from "../../routes";

export default function EditarMentoria() {
  const navigate = useNavigate();
  const plantilla = useLocation().state;

  const [titulo, setTitulo] = useState(plantilla?.titulo || "");
  const [descripcion, setDescripcion] = useState(plantilla?.descripcion || "");
  const [tema, setTema] = useState(plantilla?.tema || "");

  const handleSave = () => {
    console.log({ titulo, descripcion, tema });
    navigate(RUTAS.MENTOR.MENTORIAS);
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
