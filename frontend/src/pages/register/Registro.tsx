import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Panel from "../../theme/components/Panel";
import Footer from "../../components/Footer";
import { RUTAS } from "../../routes";

export default function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    tipo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinuar = () => {
    if (!form.tipo) return;

    // Guardás datos base en localStorage o en contexto
    localStorage.setItem("registroBase", JSON.stringify(form));

    // Redirección según tipo
    if (form.tipo === "mentor") navigate(RUTAS.REGISTRO.MENTOR);
    if (form.tipo === "alumno") navigate(RUTAS.REGISTRO.ALUMNO);
    if (form.tipo === "admin") navigate(RUTAS.REGISTRO.ADMIN);
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      
      <Box flex="1" display="flex" justifyContent="center" alignItems="center" px={4}>
        <Panel w={{ base: "100%", sm: "450px" }}>
          <VStack spacing={6}>
            <Heading fontSize="2xl" textAlign="center">
              Crear cuenta
            </Heading>

            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="nombre"
                placeholder="Juan"
                value={form.nombre}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Apellido</FormLabel>
              <Input
                name="apellido"
                placeholder="Pérez"
                value={form.apellido}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="tuemail@ejemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Contraseña</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Tipo de usuario</FormLabel>
              <Select
                name="tipo"
                placeholder="Seleccioná una opción"
                value={form.tipo}
                onChange={handleChange}
              >
                <option value="alumno">Alumno</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Administrador</option>
              </Select>
            </FormControl>

            <Button w="100%" onClick={handleContinuar}>
              Continuar
            </Button>
          </VStack>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
