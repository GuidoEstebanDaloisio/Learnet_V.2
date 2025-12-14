import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { crearSolicitud } from "../../api/solicitudApi";
import 'react-calendar/dist/Calendar.css';
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { mostrarToast } from "../../utils/toast";

import NavbarAlumno from "../../components/alumno/NavbarAlumno";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";

import { obtenerMentorPorId } from "../../api/usuarioApi";
import { obtenerSlotsDisponiblesRango } from "../../api/disponibilidadApi";
import CalendarioSlots from "../../utils/CalendarioSlots";

interface Mentoria {
  _id: string;
  titulo: string;
  descripcion: string;
  tema: { nombre: string };
}

interface Mentor {
  _id: string;
  nombre: string;
  apellido: string;
  mentorias: Mentoria[];
}

interface Slot {
  fecha: string;       // YYYY-MM-DD
  horaDesde: string;   // HH:MM
  horaHasta: string;   // HH:MM
}

export default function SolicitarMentoria() {
  const { "id-mentor": mentorId, "id-mentoria": mentoriaId } = useParams<{
    "id-mentor": string;
    "id-mentoria": string;
  }>();

  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [mentoriaSeleccionada, setMentoriaSeleccionada] = useState<Mentoria | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());
  const [selectedHorario, setSelectedHorario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const toast = useToast();
  const navigate = useNavigate();


  // Traer datos del mentor y mentoría
  useEffect(() => {
    if (!mentorId) return;

    const fetchMentor = async () => {
      try {
        const res = await obtenerMentorPorId(mentorId);
        setMentor(res.data);

        const encontrada = res.data.mentorias.find((m: Mentoria) => m._id === mentoriaId);
        if (encontrada) setMentoriaSeleccionada(encontrada);
      } catch (error) {
        console.error("Error obteniendo mentor:", error);
      }
    };

    fetchMentor();
  }, [mentorId, mentoriaId]);

  // Traer slots de hoy hasta 30 días
  useEffect(() => {
    if (!mentorId || !mentoriaSeleccionada) return;

    const fetchSlots = async () => {
      try {
        const hoy = new Date();
        const hasta = new Date();
        hasta.setDate(hoy.getDate() + 30);

        const res = await obtenerSlotsDisponiblesRango({
          mentorId,
          desde: hoy.toISOString().split("T")[0],
          hasta: hasta.toISOString().split("T")[0],
        });

        const slotsArray: Slot[] = [];
        res.data.forEach((d) => {
          d.slots.forEach((s) => {
            slotsArray.push({ fecha: d.fecha, ...s });
          });
        });

        setSlots(slotsArray);
      } catch (error) {
        console.error("Error obteniendo slots:", error);
      }
    };

    fetchSlots();
  }, [mentorId, mentoriaSeleccionada]);

  // Slots del día seleccionado
  const slotsDelDia = slots.filter(
    (s) => s.fecha === fechaSeleccionada.toISOString().split("T")[0]
  );

  // Enviar solicitud
  const enviarSolicitud = async () => {
    if (!mentor || !mentoriaSeleccionada || !selectedHorario) return;

    const data = {
      mentorId: mentor._id,
      mentoriaId: mentoriaSeleccionada._id,
      horario: selectedHorario,
      mensaje,
    };

    try {
      const res = await crearSolicitud(data);
      console.log("Solicitud creada:", res.data);

      // Mostrar toast de éxito
      mostrarToast(toast, "success", "Solicitud enviada correctamente");

      // Volver atrás (por ejemplo a la página anterior)
      navigate(-1);
    } catch (error: any) {
      console.error("Error al enviar solicitud:", error);
      mostrarToast(toast, "error", error.response?.data?.mensaje || "Ocurrió un error al enviar la solicitud");
    }
  };


  if (!mentor) return <Text p={10}>Cargando mentor...</Text>;

  return (
    <>
      <NavbarAlumno />
      <Box px={6} py={10} minH="100vh">
        <Panel maxW="700px" mx="auto" p={8}>
          <Heading size="lg" mb={4} color="brand.300">
            Solicitar mentoría
          </Heading>

          <Stack spacing={5}>
            <FormControl>
              <FormLabel>Mentor</FormLabel>
              <Input value={`${mentor.nombre} ${mentor.apellido}`} isDisabled />
            </FormControl>

            <FormControl>
              <FormLabel>Mentoría</FormLabel>
              <Input value={mentoriaSeleccionada?.titulo || ""} isDisabled />
            </FormControl>

            <FormControl>
              <FormLabel>Seleccioná un día</FormLabel>
              <CalendarioSlots
                slots={slots}
                fechaSeleccionada={fechaSeleccionada}
                setFechaSeleccionada={setFechaSeleccionada}
              />
            </FormControl>

            {slotsDelDia.length > 0 && (
              <FormControl>
                <FormLabel>Horario disponible</FormLabel>
                <Stack direction="row" wrap="wrap">
                  {slotsDelDia.map((s, i) => (
                    <Button
                      key={i}
                      size="sm"
                      variant={selectedHorario === `${s.fecha} ${s.horaDesde} - ${s.horaHasta}` ? "solid" : "outline"}
                      onClick={() =>
                        setSelectedHorario(`${s.fecha} ${s.horaDesde} - ${s.horaHasta}`)
                      }
                    >
                      {s.horaDesde} - {s.horaHasta}
                    </Button>
                  ))}
                </Stack>
              </FormControl>
            )}

            <FormControl>
              <FormLabel>Mensaje opcional</FormLabel>
              <Textarea
                placeholder="Escribe un mensaje para el mentor (opcional)"
                resize="none"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </FormControl>

            <Button
              isDisabled={!mentoriaSeleccionada || !selectedHorario}
              onClick={enviarSolicitud}
            >
              Solicitar mentoría
            </Button>
          </Stack>
        </Panel>
      </Box>
      <Footer />
    </>
  );
}
