import {
  Box,
  VStack,
  Heading,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Panel from "../../theme/components/Panel";
import Footer from "../../components/Footer";
import { RUTAS } from "../../routes";
import { mostrarToast } from "../../utils/toast";

export default function RegistroAdmin() {
  const navigate = useNavigate();
  const toast = useToast();

  const baseData = JSON.parse(localStorage.getItem("registroBase") || "{}");
  const [token, setToken] = useState("");

  const handleRegistrar = () => {
    if (!token.trim()) {
      mostrarToast(toast, "error", "Debes ingresar un token válido para registrar un administrador.");
      return;
    }

    const dataFinal = {
      ...baseData,
      tipo: "admin",
      adminToken: token,
    };

    console.log("Datos a enviar al backend:", dataFinal);

    mostrarToast(toast, "success", "Administrador registrado correctamente");
    localStorage.removeItem("registroBase");
    navigate(RUTAS.LOGIN);
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box flex="1" display="flex" justifyContent="center" alignItems="center" px={4}>
        <Panel w={{ base: "100%", sm: "450px" }}>
          <VStack spacing={6}>
            <Heading fontSize="2xl" textAlign="center">
              Registro de Administrador
            </Heading>

            <Text textAlign="center" opacity={0.8}>
              Para completar el registro de administrador, ingresá el token de autorización.
            </Text>

            <FormControl>
              <FormLabel>Token de Administrador</FormLabel>
              <Input
                placeholder="Ingresá el token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </FormControl>

            <Button w="100%" onClick={handleRegistrar}>
              Registrar Administrador
            </Button>
          </VStack>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
