import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Panel from "../../theme/components/Panel";
import Footer from "../../components/Footer";
import { RUTAS } from "../../routes";
import { mostrarToast } from "../../utils/toast";

export default function Registro() {
  const navigate = useNavigate();
  const toast = useToast();

  // Estado para guardar lo que voy escribiendo en el formulario
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    tipo: "",
  });

  // Cada vez que cambio un input, actualizo mi estado
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Cuando hago click en "Continuar"
  const handleContinuar = () => {
    // Primero reviso que no falte nada
    if (!form.nombre.trim() || !form.apellido.trim() || !form.email.trim() || !form.password.trim() || !form.tipo) {
      mostrarToast(toast, "error", "Debes completar todos los campos antes de continuar");
      return;
    }

    // Guardo los datos básicos en localStorage para no perderlos
    localStorage.setItem("registroBase", JSON.stringify(form));

    // Según el tipo de usuario, voy al siguiente paso de mi registro
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

            <FormControl isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="nombre"
                placeholder="Juan"
                value={form.nombre}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Apellido</FormLabel>
              <Input
                name="apellido"
                placeholder="Pérez"
                value={form.apellido}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="tuemail@ejemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl isRequired>
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

            <Button w="100%" variant="primary" onClick={handleContinuar}>
              Continuar
            </Button>
          </VStack>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
