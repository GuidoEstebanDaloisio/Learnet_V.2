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
} from "@chakra-ui/react";

import { FaSearch } from "react-icons/fa";

import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import MentorCard from "../../components/alumno/MentorCard";

const mentores = [
  {
    nombre: "Ana Torres",
    titulo: "Desarrolladora Fullstack",
    especializacion: "Desarrollo Web",
    rating: 5,
    cantidadRatings: 120,
    disponible: true,
  },
  {
    nombre: "Luis Fernández",
    titulo: "Científico de Datos Senior",
    especializacion: "Data Science",
    rating: 4,
    cantidadRatings: 85,
    disponible: false,
  },
  {
    nombre: "María López",
    titulo: "Especialista en Ciberseguridad",
    especializacion: "Ciberseguridad",
    rating: 5,
    cantidadRatings: 143,
    disponible: true,
  },  
  {
    nombre: "Fernando Gomez",
    titulo: "Contador",
    especializacion: "Excel",
    rating: 5,
    cantidadRatings: 143,
    disponible: false,
  }
];

export default function Explorar() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarAlumno />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading mb={8} textAlign="center">
          Explorar Mentores
        </Heading>

        <VStack spacing={6} mb={12}>
          <InputGroup maxW="600px">
            <InputLeftElement pointerEvents="none">
              <Icon as={FaSearch} color="gray.400" />
            </InputLeftElement>

            <Input
              placeholder="Buscar por nombre o especialización..."
              focusBorderColor="brand.400"
            />
          </InputGroup>

          <Select
            maxW="300px"
            focusBorderColor="brand.400"
            placeholder="Ordenar por..."
          >
            <option value="puntuacion">Mejor puntuados</option>
            <option value="nuevos">Más nuevos</option>
            <option value="antiguos">Más antiguos</option>
          </Select>

          <FormControl display="flex" alignItems="center" justifyContent="center">
            <FormLabel mb="0" fontSize="lg">
              Mostrar solo disponibles
            </FormLabel>
            <Switch colorScheme="brand" size="lg" />
          </FormControl>
        </VStack>

        <Box
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          }}
          gap={8}
          mt={4}
        >
          {mentores.map((mentor) => (
            <MentorCard
              key={mentor.nombre}
              nombre={mentor.nombre}
              titulo={mentor.titulo}
              rating={mentor.rating}
              cantidadRatings={mentor.cantidadRatings}
              disponible={mentor.disponible}
            />
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
