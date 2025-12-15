import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Switch,
  FormControl,
  FormLabel,
  Heading,
  VStack,
  Icon,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { listarMentores } from "../../api/usuarioApi";
import { FaSearch } from "react-icons/fa";
import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import MentorCard from "../../components/alumno/MentorCard";

interface Mentor {
  _id: string;
  nombre: string;
  apellido: string;
  tituloProfesional?: string;
  estaDisponible?: boolean;
}

export default function Explorar() {
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [soloDisponibles, setSoloDisponibles] = useState(false);
  const [busqueda, setBusqueda] = useState(""); //Para futuro


  useEffect(() => {
    const fetchMentores = async () => {
      try {
        const res = await listarMentores();
        setMentores(res.data);
      } catch (error) {
        console.error("Error cargando mentores", error);
      }
    };

    fetchMentores();
  }, []);

  // Filtrado segun disponibilidad
  const mentoresFiltrados = mentores.filter((mentor) => {
    const coincideDisponibilidad = soloDisponibles
      ? mentor.estaDisponible
      : true;

    return coincideDisponibilidad;
  });

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarAlumno />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">
          Explorar Mentores
        </Heading>

        <VStack spacing={6} mb={12}>
          {/* Buscador */}
          <InputGroup maxW="600px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>

            <Input
              placeholder="Buscar por nombre o especialización..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </InputGroup>

          {/* Select */}
          <Select maxW="300px" placeholder="Ordenar por...">
            <option value="puntuacion">Mejor puntuados</option>
            <option value="nuevos">Más nuevos</option>
            <option value="antiguos">Más antiguos</option>
          </Select>

          {/* Switch */}
          <FormControl display="flex" alignItems="center" justifyContent="center">
            <FormLabel mb="0" fontSize="lg">
              Mostrar solo disponibles
            </FormLabel>
            <Switch
              colorScheme="brand"
              size="lg"
              isChecked={soloDisponibles}
              onChange={(e) => setSoloDisponibles(e.target.checked)}
            />
          </FormControl>
        </VStack>

        {/* Grid de cards */}
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8} mt={4}>
          {mentoresFiltrados.map((mentor) => (
            <MentorCard
              key={mentor._id}
              id={mentor._id}
              nombre={`${mentor.nombre} ${mentor.apellido}`}
              titulo={mentor.tituloProfesional || "Mentor"}
              rating={5} // mock por ahora
              cantidadRatings={0} // mock
              disponible={mentor.estaDisponible ?? false}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Footer />
    </Box>
  );
}
