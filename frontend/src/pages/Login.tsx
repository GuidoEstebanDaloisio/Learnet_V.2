import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";
import { RUTAS } from "../routes";
import Panel from "../theme/components/Panel";
import { useAuth } from "../context/AuthContext";
import { loginUsuario } from "../api/authApi";


export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Estados necesarios
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
  try {
    const res = await loginUsuario({ email, password });

    login({
      token: res.data.token,
      usuario: res.data.usuario,
    });

    if (res.data.usuario.tipo === "alumno") {
      navigate(RUTAS.ALUMNO.PERFIL);
    } else if (res.data.usuario.tipo === "mentor") {
      navigate(RUTAS.MENTOR.PERFIL);
    } else {
      navigate("/");
    }
  } catch (err: any) {
    setError(err.response?.data?.mensaje || "Error al iniciar sesión");
  }
};



  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box
        flex="1"
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={4}
      >
        <Panel w={{ base: "100%", sm: "400px" }}>
          <VStack spacing={6}>
            <Heading fontSize="2xl" textAlign="center">
              Iniciar sesión
            </Heading>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="tuemail@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            {error && <Text color="red.400">{error}</Text>}

            <Button variant="primary" w="100%" onClick={handleLogin}>
              Ingresar
            </Button>

            {/* NO CAMBIO NADA DE TU DISEÑO */}
            <VStack w="100%" spacing={3}>
              <Text fontSize="sm" opacity={0.7}>
                ¿No tenés cuenta?
              </Text>
              <Button
                as={Link}
                to={RUTAS.REGISTRO.BASE}
                variant="secondary"
              >
                Registrarme
              </Button>
            </VStack>
          </VStack>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
