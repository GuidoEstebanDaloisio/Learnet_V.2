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
import { obtenerProximaDisponibilidadMentor, obtenerDisponibilidadPorId } from "../../api/disponibilidadApi";

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

interface Slot {
  fecha: string;
  horaDesde: string;
  horaHasta: string;
}

interface DisponibilidadBase {
  diasSemana: number[]; // 0 = domingo
  horaDesde: string;
  horaHasta: string;
  duracionSesion?: number;
}

/* =======================
   Component
======================= */

export default function DetalleMentor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(true);
  const [proximoSlot, setProximoSlot] = useState<Slot | null>(null);
  const [disponibilidadBase, setDisponibilidadBase] = useState<DisponibilidadBase | null>(null);

  const diasSemanaMap = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        // 🔹 Datos del mentor
        const mentorRes = await obtenerMentorPorId(id!);
        setMentor(mentorRes.data);

        // 🔹 Horario laboral
        try {
          const baseRes = await obtenerDisponibilidadPorId(id!);
          setDisponibilidadBase(baseRes.data);
        } catch (error) {
          console.error("No se pudo obtener la disponibilidad base:", error);
          setDisponibilidadBase(null);
        }

        // 🔹 Próximo slot disponible
        try {
          const slotRes = await obtenerProximaDisponibilidadMentor(id!);
          setProximoSlot(slotRes.data);
        } catch (error) {
          console.error("No se pudo obtener la próxima disponibilidad:", error);
          setProximoSlot(null);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [id]);

  if (loading) return <Text p={10}>Cargando mentor...</Text>;
  if (!mentor) return <Text p={10}>Mentor no encontrado</Text>;

  // Agrupar mentorías por tema
  const mentoriasPorTema = mentor.mentorias.reduce<Record<string, Mentoria[]>>(
    (acc, m) => {
      const tema = m.tema.nombre;
      if (!acc[tema]) acc[tema] = [];
      acc[tema].push(m);
      return acc;
    },
    {}
  );

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
              <Text mt={2} color="gray.400" fontSize="sm">{mentor.experiencia}</Text>
              <Text mt={3} color="gray.400" fontSize="sm">
                <Icon as={FaCalendarAlt} mr={2} />
                Registrado el: {mentor.fechaDeIngreso ? new Date(mentor.fechaDeIngreso).toLocaleDateString() : "—"}
              </Text>
            </Box>
            <Stack spacing={3} minW="180px">
              <Button
                variant="primary"
                onClick={() => navigate(RUTAS.ALUMNO.SOLICITAR_MENTORIA, { state: { mentorId: mentor._id } })}
              >
                Solicitar mentoría
              </Button>
              <Button variant="alerta_secondary" w="100%" rounded="lg">Reportar perfil</Button>
            </Stack>
          </Flex>
        </Panel>

        {/* MENTORIAS */}
        <Heading size="md" mb={4}>Mentorías por temática</Heading>
        <Accordion allowToggle>
          {Object.entries(mentoriasPorTema).map(([tema, mentorias]) => (
            <AccordionItem key={tema} border="none" mb={4}>
              <Panel p={0} overflow="hidden">
                <AccordionButton _expanded={{ bg: "brand.500", color: "white" }}>
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
                        <Text fontSize="lg" fontWeight="bold" color="brand.300">{m.titulo}</Text>
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
        <Heading size="md" mb={6}>Disponibilidad</Heading>

        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          {/* Horario laboral */}
          {disponibilidadBase && (
            <Panel flex="1" >
              <Flex align="center" mb={4}>
                <Icon as={FaClock} boxSize={6} mr={3} color="brand.300" />
                <Text fontSize="lg" fontWeight="bold">Horario laboral</Text>
              </Flex>
              <Flex wrap="wrap" gap={2}>
                {disponibilidadBase.diasSemana.map((d) => (
                  <Tag
                    key={d}
                    size="md"
                    colorScheme="brand"
                    variant="subtle"
                    rounded="full"
                  >
                    {diasSemanaMap[d]}
                  </Tag>
                ))}
              </Flex>
              <Text mt={3} fontSize="md" color="gray.300">
                {disponibilidadBase.horaDesde} - {disponibilidadBase.horaHasta}
              </Text>
            </Panel>
          )}

          {/* Próximo slot disponible */}
          {proximoSlot && (
            <Panel flex="1" bg="brand.600" borderColor="brand.400" color="white">
              <Flex align="center" mb={4}>
                <Icon as={FaCalendarAlt} boxSize={6} mr={3} />
                <Text fontSize="lg" fontWeight="bold">Próximo horario disponible</Text>
              </Flex>
              <Text fontSize="md">
                <strong>Fecha:</strong> {new Date(proximoSlot.fecha).toLocaleDateString()}
              </Text>
              <Text fontSize="md">
                <strong>Horario:</strong> {proximoSlot.horaDesde} - {proximoSlot.horaHasta}
              </Text>
            </Panel>
          )}
        </Flex>


        {/* CALIFICACIONES */}
        <Divider my={10} />
        <Heading size="md" mb={4}>Calificaciones y opiniones</Heading>
        <Panel mb={6}>
          <Flex align="center" gap={4}>
            <Text fontSize="4xl" fontWeight="bold" color="brand.300">4.8</Text>
            <Box>
              <Flex>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} as={FaStar} color={i < 5 ? "brand.400" : "gray.600"} boxSize={5} />
                ))}
              </Flex>
              <Text color="gray.400" fontSize="sm">Basado en 126 opiniones</Text>
            </Box>
          </Flex>
        </Panel>
      </Box>
      <Footer />
    </>
  );
}
