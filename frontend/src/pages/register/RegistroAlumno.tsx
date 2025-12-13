import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Panel from "../../theme/components/Panel";
import Footer from "../../components/Footer";
import { RUTAS } from "../../routes";
import { registrarUsuario } from "../../api/authApi";

export default function RegistroAlumno() {
  const navigate = useNavigate();

  const [fechaNacimiento, setFechaNacimiento] = useState("");

  const baseData = JSON.parse(localStorage.getItem("registroBase") || "{}");

  const handleRegistrar = async () => {
    const dataFinal = {
      ...baseData,
      fechaNacimiento,
      tipo: "alumno",
    };

    try {
      const res = await registrarUsuario(dataFinal);
      alert("Usuario registrado!");
      localStorage.removeItem("registroBase");
      navigate(RUTAS.LOGIN);
    } catch (err: any) {
      alert(err.response?.data?.mensaje || "Error al registrar");
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box flex="1" display="flex" justifyContent="center" alignItems="center" px={4}>
        <Panel w={{ base: "100%", sm: "450px" }}>
          <VStack spacing={6}>
            <Heading fontSize="2xl" textAlign="center">
              Datos de Alumno
            </Heading>

            <FormControl>
              <FormLabel>Fecha de nacimiento</FormLabel>
              <Input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </FormControl>

            <Button w="100%" onClick={handleRegistrar}>
              Registrar Alumno
            </Button>
          </VStack>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
