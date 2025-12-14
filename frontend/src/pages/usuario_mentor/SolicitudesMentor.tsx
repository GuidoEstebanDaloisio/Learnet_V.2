import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import SolicitudCard from "../../components/mentor/SolicitudCard";

import { listarSolicitudesMentor } from "../../api/solicitudApi";
import { formatoFechaHoraLocal } from "../../utils/fechaConfig";

interface Solicitud {
  _id: string;
  alumno: {
    nombre: string;
    apellido: string;
  };
  mentoria: {
    titulo: string;
    tema: {
      nombre: string;
    };
  };
  fechaDesde: string;   
  fechaHasta: string;
  mensajeOpcional?: string;
  estado: "pendiente" | "aceptada" | "rechazada";
}



export default function SolicitudesMentor() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const res = await listarSolicitudesMentor();
        setSolicitudes(res.data);
      } catch (error) {
        console.error("Error cargando solicitudes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  if (loading) return <Text p={10}>Cargando solicitudes...</Text>;

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <NavbarMentor />

      <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
        <Heading size="xl" mb={8} textAlign="center">
          Solicitudes de Mentoría
        </Heading>

        <Box
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            sm: "1fr 1fr",
            lg: "1fr 1fr 1fr",
          }}
          gap={8}
        >
          {solicitudes.map((s) => {
            const { fecha } = formatoFechaHoraLocal(s.fechaDesde);
            const { hora: horaDesde } = formatoFechaHoraLocal(s.fechaDesde);
            const { hora: horaHasta } = formatoFechaHoraLocal(s.fechaHasta);

            return (
              <SolicitudCard
                key={s._id}
                alumno={`${s.alumno.nombre} ${s.alumno.apellido}`}
                tituloMentoria={s.mentoria.titulo}
                tema={s.mentoria.tema.nombre}
                fecha={fecha}
                horario={`${horaDesde} a ${horaHasta}`}
                mensaje={s.mensajeOpcional}
                estado={s.estado === "rechazada" ? "cancelada" : s.estado}
              />
            );
          })}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
