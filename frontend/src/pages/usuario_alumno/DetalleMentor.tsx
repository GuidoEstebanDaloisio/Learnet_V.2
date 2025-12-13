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
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RUTAS } from "../../routes";

import {
  FaUserTie,
  FaCalendarAlt,
  FaBook,
  FaClock,
  FaStar,
} from "react-icons/fa";

import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";
import Card from "../../theme/components/Card";

import { obtenerMentorPorId } from "../../api/usuarioApi";

/* =======================
   Tipos
======================= */

interface Mentoria {
  _id: string;
  titulo: string;
  descripcion: string;
  tema: {
    nombre: string;
  };
}

interface Mentor {
  _id: string;
  nombre: string;
  apellido: string;
  tituloProfesional?: string;
  experiencia?: string;
  fechaDeIngreso?: string;
  mentorias: Mentoria[];
}

/* =======================
   Component
======================= */

export default function DetalleMentor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const res = await obtenerMentorPorId(id!);
        setMentor(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (loading) {
    return <Text p={10}>Cargando mentor...</Text>;
  }

  if (!mentor) {
    return <Text p={10}>Mentor no encontrado</Text>;
  }

  /* =======================
     Agrupar mentorías por tema
  ======================= */

  const mentoriasPorTema = mentor.mentorias.reduce<Record<string, Mentoria[]>>(
    (acc, mentoria) => {
      const tema = mentoria.tema.nombre;
      if (!acc[tema]) acc[tema] = [];
      acc[tema].push(mentoria);
      return acc;
    },
    {}
  );

  /* =======================
     MOCKS (fase 2)
  ======================= */

  const disponibilidad = [
    { dia: "Lunes", horario: "18:00 - 20:00" },
    { dia: "Miércoles", horario: "17:00 - 19:00" },
    { dia: "Viernes", horario: "19:00 - 21:00" },
  ];

  const calificaciones = {
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
  };

  return (
    <>
      <NavbarAlumno />

      <Box minH="100vh" px={6} py={10}>
        {/* HEADER */}
        <Panel p={8} rounded="2xl" mb={10}>
          <Flex gap={6} align="center">
            <Avatar size="xl" name={`${mentor.nombre} ${mentor.apellido}`} />

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
                Registrado el:{" "}
                {mentor.fechaDeIngreso
                  ? new Date(mentor.fechaDeIngreso).toLocaleDateString()
                  : "—"}
              </Text>
            </Box>

            {/* ACCIONES */}
            <Stack spacing={3} minW="180px">
              <Button
                variant="primary"
                onClick={() =>
                  navigate(RUTAS.ALUMNO.SOLICITAR_MENTORIA, {
                    state: { mentorId: mentor._id },
                  })
                }
              >
                Solicitar mentoría
              </Button>

              <Button variant="alerta_secondary" w="100%" rounded="lg">
                Reportar perfil
              </Button>
            </Stack>
          </Flex>
        </Panel>

        {/* MENTORIAS */}
        <Heading size="md" mb={4}>
          Mentorías por temática
        </Heading>

        <Accordion allowToggle>
          {Object.entries(mentoriasPorTema).map(([tema, mentorias]) => (
            <AccordionItem key={tema} border="none" mb={4}>
              <Panel p={0} overflow="hidden">
                <AccordionButton
                  _expanded={{ bg: "brand.500", color: "white" }}
                >
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    <Icon as={FaBook} mr={2} />
                    {tema}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel pb={4}>
                  <Stack spacing={4} mt={2}>
                    {mentorias.map((m) => (
                      <Card key={m._id}>
                        <Text
                          fontSize="lg"
                          fontWeight="bold"
                          color="brand.300"
                        >
                          {m.titulo}
                        </Text>
                        <Text color="gray.300">{m.descripcion}</Text>
                      </Card>
                    ))}
                  </Stack>
                </AccordionPanel>
              </Panel>
            </AccordionItem>
          ))}
        </Accordion>

        {/* DISPONIBILIDAD */}
        <Divider my={10} />
        <Heading size="md" mb={4}>
          Disponibilidad
        </Heading>

        <Flex gap={4} wrap="wrap">
          {disponibilidad.map((d, i) => (
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
        <Divider my={10} />
        <Heading size="md" mb={4}>
          Calificaciones y opiniones
        </Heading>

        <Panel mb={6}>
          <Flex align="center" gap={4}>
            <Text fontSize="4xl" fontWeight="bold" color="brand.300">
              {calificaciones.promedio}
            </Text>

            <Box>
              <Flex>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    as={FaStar}
                    color={
                      i < Math.round(calificaciones.promedio)
                        ? "brand.400"
                        : "gray.600"
                    }
                    boxSize={5}
                  />
                ))}
              </Flex>

              <Text color="gray.400" fontSize="sm">
                Basado en {calificaciones.cantidad} opiniones
              </Text>
            </Box>
          </Flex>
        </Panel>

        <Stack spacing={4}>
          {calificaciones.opiniones.map((op, i) => (
            <Card key={i}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold" color="gray.100">
                  {op.alumno}
                </Text>

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

              <Text color="gray.300" mb={2}>
                {op.comentario}
              </Text>

              <Text fontSize="xs" color="gray.500">
                {op.fecha}
              </Text>
            </Card>
          ))}
        </Stack>
      </Box>

      <Footer />
    </>
  );
}
