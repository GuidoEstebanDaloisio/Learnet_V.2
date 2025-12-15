import { Box, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import SolicitudCard from "../../components/mentor/SolicitudCard";

import {
  listarSolicitudesMentor,
  rechazarSolicitud,
  aceptarSolicitud,
} from "../../api/solicitudApi";

import { formatoFechaHoraLocal } from "../../utils/fechaConfig";
import { crearSesionDesdeSolicitud } from "../../api/sesionAsesoriaApi";

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

  const handleRechazar = async (id: string) => {
    try {
      await rechazarSolicitud(id);
      setSolicitudes((prev) =>
        prev.map((s) => (s._id === id ? { ...s, estado: "rechazada" } : s))
      );
    } catch (error) {
      console.error("Error al rechazar solicitud:", error);
    }
  };

  const handleAceptar = async (id: string) => {
  try {
    // 1️⃣ Aceptar la solicitud
    await aceptarSolicitud(id);

    // 2️⃣ Actualizar el estado local de la solicitud
    setSolicitudes((prev) =>
      prev.map((s) => (s._id === id ? { ...s, estado: "aceptada" } : s))
    );

    // 3️⃣ Crear la sesión de asesoría basada en la solicitud
    await crearSesionDesdeSolicitud(id);

    console.log("Sesión de asesoría creada correctamente.");
  } catch (error) {
    console.error("Error al aceptar la solicitud o crear la sesión:", error);
  }
};

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

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={8}>
          {solicitudes.map((s) => {
            const { fecha } = formatoFechaHoraLocal(s.fechaDesde);
            const { hora: horaDesde } = formatoFechaHoraLocal(s.fechaDesde);
            const { hora: horaHasta } = formatoFechaHoraLocal(s.fechaHasta);

            return (
              <SolicitudCard
                key={s._id}
                id={s._id}
                alumno={`${s.alumno.nombre} ${s.alumno.apellido}`}
                tituloMentoria={s.mentoria.titulo}
                tema={s.mentoria.tema.nombre}
                fecha={fecha}
                horario={`${horaDesde} a ${horaHasta}`}
                mensaje={s.mensajeOpcional}
                estado={s.estado}
                onAceptar={handleAceptar}
                onRechazar={handleRechazar}
              />
            );
          })}
        </SimpleGrid>
      </Box>

      <Footer />
    </Box>
  );
}
