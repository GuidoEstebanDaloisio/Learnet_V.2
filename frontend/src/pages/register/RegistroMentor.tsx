import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Panel from "../../theme/components/Panel";
import Footer from "../../components/Footer";
import { RUTAS } from "../../routes";
import { registrarUsuario } from "../../api/authApi";
import { mostrarToast } from "../../utils/toast";

export default function RegistroMentor() {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    tituloProfesional: "",
    experiencia: "",
  });

  const baseData = JSON.parse(localStorage.getItem("registroBase") || "{}");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegistrar = async () => {
    if (!form.tituloProfesional.trim() || !form.experiencia.trim()) {
      mostrarToast(toast, "error", "Completa todos los campos antes de registrar");
      return;
    }

    const dataFinal = {
      ...baseData,
      ...form,
      tipo: "mentor",
      fechaDeIngreso: new Date(),
    };

    try {
      await registrarUsuario(dataFinal);
      mostrarToast(toast, "success", "Mentor registrado con éxito");
      localStorage.removeItem("registroBase");
      navigate(RUTAS.LOGIN);
    } catch (err: any) {
      mostrarToast(toast, "error", err.response?.data?.mensaje || "Error al registrar mentor");
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box flex="1" display="flex" justifyContent="center" alignItems="center" px={4}>
        <Panel w={{ base: "100%", sm: "450px" }}>
          <VStack spacing={6}>
            <Heading fontSize="2xl" textAlign="center">
              Datos de Mentor
            </Heading>

            <FormControl>
              <FormLabel>Título profesional</FormLabel>
              <Input
                name="tituloProfesional"
                placeholder="Lic. en Sistemas, Ingeniero, etc."
                value={form.tituloProfesional}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Experiencia</FormLabel>
              <Textarea
                name="experiencia"
                placeholder="Contanos sobre tu experiencia…"
                value={form.experiencia}
                onChange={handleChange}
                bg="gray.700"
                borderColor="gray.600"
                _hover={{ borderColor: "gray.500" }}
                _focus={{
                  borderColor: "brand.400",
                  boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                }}
              />
            </FormControl>

            <Button w="100%" onClick={handleRegistrar}>
              Registrar Mentor
            </Button>
          </VStack>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
