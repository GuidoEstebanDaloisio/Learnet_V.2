import {
  Box,
  Flex,
  Avatar,
  Heading,
  Text,
  Divider,
  VStack,
  Icon,
  Switch,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import {
  FaEnvelope,
  FaUserEdit,
  FaGraduationCap,
  FaBriefcase,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";
import { formatoFecha } from "../../utils/fechaConfig";
import { useAuth } from "../../context/AuthContext";
import { RUTAS } from "../../routes";
import { obtenerDisponibilidadBase } from "../../api/disponibilidadApi";
import { actualizarDisponibilidad } from "../../api/usuarioApi";

const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function PerfilMentor() {
const { usuario, setUsuario } = useAuth();
  const navigate = useNavigate();
  const [disponibilidadBase, setDisponibilidadBase] = useState<{
    diasSemana: number[];
    horaDesde: string;
    horaHasta: string;
  } | null>(null);

  useEffect(() => {
    obtenerDisponibilidadBase().then((res) => {
      if (res.data) setDisponibilidadBase(res.data);
    });
  }, []);

  //Protección básica
  if (!usuario) return null;

  const diasTexto =
    disponibilidadBase?.diasSemana.map((d) => DIAS[d]).join(", ") || "-";
  const rangoHoras =
    disponibilidadBase?.horaDesde && disponibilidadBase?.horaHasta
      ? `${disponibilidadBase.horaDesde} - ${disponibilidadBase.horaHasta}`
      : "-";

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box py={10} px={{ base: 4, md: 10 }} flex="1">
        <Panel maxW="700px" mx="auto" p={8}>
          {/* HEADER */}
          <Flex direction="column" align="center" mb={6}>
            <Avatar
              size="2xl"
              name={`${usuario.nombre} ${usuario.apellido}`}
              mb={4}
            />

            <Heading>
              {usuario.nombre} {usuario.apellido}
            </Heading>

            <Text color="brand.300" mt={1}>
              Mentor en Learnet
            </Text>
          </Flex>

          <Divider mb={6} />

          {/* DATOS */}
          <VStack align="start" spacing={5}>
            <Flex align="center" gap={3}>
              <Icon as={FaGraduationCap} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Título profesional:</strong>{" "}
                {usuario.tituloProfesional || "No cargado"}
              </Text>
            </Flex>

            <Flex align="flex-start" gap={3}>
              <Icon as={FaBriefcase} color="brand.400" boxSize={5} mt={1} />
              <Text fontSize="lg">
                <strong>Experiencia:</strong>{" "}
                {usuario.experiencia || "No cargada"}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <Icon as={FaEnvelope} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Email:</strong> {usuario.email}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <Icon as={FaCalendarAlt} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Fecha de ingreso:</strong>{" "}
                {usuario.fechaDeIngreso
                  ? formatoFecha(usuario.fechaDeIngreso)
                  : "No disponible"}
              </Text>
            </Flex>

            <Flex align="center" gap={3}>
              <Icon as={FaClock} color="brand.400" boxSize={5} />
              <Text fontSize="lg">
                <strong>Horario laboral:</strong>{" "}
                {diasTexto} — {rangoHoras}
              </Text>
              <Button
                variant="secondary"
                onClick={() => navigate(RUTAS.MENTOR.EDITAR_HORARIO_LABORAL)}
              >
                Editar
              </Button>
            </Flex>

            {/* DISPONIBILIDAD */}
            <FormControl display="flex" alignItems="center" mt={4}>
              <FormLabel
                htmlFor="disponible"
                mb="0"
                fontSize="lg"
                fontWeight="bold"
              >
                Disponible para mentorías
              </FormLabel>

              <Switch
                id="disponible"
                colorScheme="green"
                size="lg"
                isChecked={usuario.estaDisponible}
                onChange={async (e) => {
                  const nuevaDisponibilidad = e.target.checked;
                  try {
                    await actualizarDisponibilidad(nuevaDisponibilidad);

                    // Actualiza el estado global del usuario
                    setUsuario({ ...usuario, estaDisponible: nuevaDisponibilidad });
                  } catch (error) {
                    console.error("Error al actualizar disponibilidad:", error);
                  }
                }}
              />

            </FormControl>


          </VStack>

          <Button
            leftIcon={<FaUserEdit />}
            variant="primary"
            w="100%"
            mt={8}
          >
            Editar perfil
          </Button>
        </Panel>
      </Box>

      <Footer />
    </Box>
  );
}
