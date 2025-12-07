import {
  Box,
  Flex,
  Avatar,
  Text,
  Heading,
  Divider,
  Icon,
  Stack,
  Tag,
  TagLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";

import { FaUserTie, FaCalendarAlt, FaBook, FaClock, FaStar } from "react-icons/fa";

import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";
import Card from "../../theme/components/Card";


export default function DetalleMentor() {
  const mentor = {
    nombre: "Carlos",
    apellido: "Gutiérrez",
    tituloProfesional: "Ingeniero en Sistemas",
    experiencia: "8 años de experiencia en desarrollo web y enseñanza online",
    fechaRegistro: "12/08/2023",
    fotoPerfil: "https://i.pravatar.cc/150?img=12",

    disponibilidad: [
      { dia: "Lunes", horario: "18:00 - 20:00" },
      { dia: "Miércoles", horario: "17:00 - 19:00" },
      { dia: "Viernes", horario: "19:00 - 21:00" },
    ],

    mentorias: [
      {
        tema: "React",
        clases: [
          { titulo: "Introducción a React", descripcion: "Conceptos base y componentes." },
          { titulo: "Hooks Avanzados", descripcion: "useReducer, useMemo, custom hooks." },
        ],
      },
      {
        tema: "Ciberseguridad",
        clases: [
          { titulo: "Seguridad en Web", descripcion: "XSS, CSRF y buenas prácticas." },
        ],
      },
    ],

    calificaciones: {
      promedio: 4.8,
      cantidad: 126,
      opiniones: [
        {
          alumno: "Lucía Fernández",
          rating: 5,
          comentario: "Excelente explicación, muy claro con los ejemplos.",
          fecha: "05/11/2024",
        },
        {
          alumno: "Julián Prieto",
          rating: 4,
          comentario: "Muy buena clase, aunque me hubiese gustado más práctica.",
          fecha: "22/10/2024",
        },
      ],
    },
  };
  const navigate = useNavigate();

  return (
    <>
      <NavbarAlumno />

      <Box minH="100vh" px={6} py={10}>

        {/* HEADER */}
        <Panel p={8} rounded="2xl" mb={10}>
          <Flex gap={6} align="center">

            <Avatar size="xl" src={mentor.fotoPerfil} />

            <Box flex="1">
              <Heading size="lg" color="brand.300">
                {mentor.nombre} {mentor.apellido}
              </Heading>

              <Text mt={2} color="gray.300">
                <Icon as={FaUserTie} mr={2} />
                {mentor.tituloProfesional}
              </Text>

              <Text mt={2} color="gray.400" fontSize="sm">
                {mentor.experiencia}
              </Text>

              <Text mt={3} color="gray.400" fontSize="sm">
                <Icon as={FaCalendarAlt} mr={2} />
                Registrado el: {mentor.fechaRegistro}
              </Text>
            </Box>

            {/* ACCIONES */}
            <Stack spacing={3} minW="180px">
              <Button variant="primary" onClick={() => navigate(RUTAS.ALUMNO.SOLICITAR_MENTORIA)}
>
                Solicitar mentoría
              </Button>

              <Button variant="alerta_secondary" w="100%" rounded="lg">
                Reportar perfil
              </Button>
            </Stack>
          </Flex>
        </Panel>

        {/* MENTORIAS POR TEMA */}
        <Heading size="md" mb={4}>Mentorías por temática</Heading>

        <Accordion allowToggle>
          {mentor.mentorias.map((m, i) => (
            <AccordionItem key={i} border="none" mb={4}>
              <Panel p={0} overflow="hidden">
                <AccordionButton _expanded={{ bg: "brand.500", color: "white" }}>
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    <Icon as={FaBook} mr={2} />
                    {m.tema}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Stack spacing={4} mt={2}>
                    {m.clases.map((c, j) => (
                      <Card key={j}>
                        <Text fontSize="lg" fontWeight="bold" color="brand.300">
                          {c.titulo}
                        </Text>
                        <Text color="gray.300">{c.descripcion}</Text>
                      </Card>
                    ))}
                  </Stack>
                </AccordionPanel>
              </Panel>
            </AccordionItem>
          ))}
        </Accordion>

        {/* DISPONIBILIDAD */}
        <Divider my={10}/>

        <Heading size="md" mb={4}>Disponibilidad</Heading>

        <Flex gap={4} wrap="wrap">
          {mentor.disponibilidad.map((d, i) => (
            <Tag
              key={i}
              size="lg"
              colorScheme="brand"
              variant="solid"
              rounded="full"
            >
              <Icon as={FaClock} mr={2} />

              <TagLabel>
                {d.dia}: {d.horario}
              </TagLabel>
            </Tag>
          ))}
        </Flex>

        {/* CALIFICACIONES */}
        <Divider my={10}  />

        <Heading size="md" mb={4}>Calificaciones y opiniones</Heading>

        <Panel mb={6}>
          <Flex align="center" gap={4}>
            <Text fontSize="4xl" fontWeight="bold" color="brand.300">
              {mentor.calificaciones.promedio}
            </Text>

            <Box>
              <Flex>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    as={FaStar}
                    color={i < mentor.calificaciones.promedio ? "brand.400" : "gray.600"}
                    boxSize={5}
                  />
                ))}
              </Flex>

              <Text color="gray.400" fontSize="sm">
                Basado en {mentor.calificaciones.cantidad} opiniones
              </Text>
            </Box>
          </Flex>
        </Panel>

        <Stack spacing={4}>
          {mentor.calificaciones.opiniones.map((op, i) => (
            <Card key={i}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold" color="gray.100">{op.alumno}</Text>

                <Flex>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Icon
                      key={j}
                      as={FaStar}
                      color={j < op.rating ? "brand.400" : "gray.700"}
                      boxSize={4}
                    />
                  ))}
                </Flex>
              </Flex>

              <Text color="gray.300" mb={2}>{op.comentario}</Text>

              <Text fontSize="xs" color="gray.500">{op.fecha}</Text>
            </Card>
          ))}
        </Stack>

      </Box>

      <Footer />
    </>
  );
}