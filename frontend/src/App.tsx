import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import tema from "./theme/Tema";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Explorar from "./pages/usuario_alumno/Explorar";
import AgendaAlumno from "./pages/usuario_alumno/AgendaAlumno";
import PerfilAlumno from "./pages/usuario_alumno/PerfilAlumno";
import DetalleMentor from "./pages/usuario_alumno/DetalleMentor";
import PerfilMentor from "./pages/usuario_mentor/PerfilMentor";
import MisMentoriasMentor from "./pages/usuario_mentor/MisMentoriasMentor";
import SolicitudesMentor from "./pages/usuario_mentor/SolicitudesMentor";
import Agenda from "./pages/usuario_mentor/Agenda";
import DetalleSesionAsesoriaMentor from "./pages/usuario_mentor/DetalleSesionAsesoriaMentor";
import NuevaMentoria from "./pages/usuario_mentor/NuevaMentoria";
import EditarMentoria from "./pages/usuario_mentor/EditarMentoria";
import DetalleMentoriaMentor from "./pages/usuario_mentor/DetalleMentoriaMentor";
import DetalleSesionAsesoriaAlumno from "./pages/usuario_alumno/DetalleSesionAsesoriaAlumno";
import SolicitarMentoria from "./pages/usuario_alumno/SolicitarMentoria";

function App() {
  return (
    <ChakraProvider theme={tema}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/alumno/explorar-mentores" element={<Explorar />} />
          <Route path="/alumno/mentor/detalle" element={<DetalleMentor />} />
          <Route path="/alumno/mentor/solicitar-mentoria" element={<SolicitarMentoria />} />
          <Route path="/alumno/agenda" element={<AgendaAlumno />} />
          <Route path="/alumno/sesion-de-asesoria/detalle" element={<DetalleSesionAsesoriaAlumno />} />
          <Route path="/alumno/perfil" element={<PerfilAlumno />} />

          <Route path="/mentor/perfil" element={<PerfilMentor />} />
          <Route path="/mentor/mentorias" element={<MisMentoriasMentor />} />
          <Route path="/mentor/mentoria/detalle" element={<DetalleMentoriaMentor />} />
          <Route path="/mentor/mentoria/editar" element={<EditarMentoria />} />
          <Route path="/mentor/mentoria/nueva" element={<NuevaMentoria />} />
          <Route path="/mentor/solicitudes" element={<SolicitudesMentor />} />
          <Route path="/mentor/agenda" element={<Agenda />} />
          <Route path="/mentor/sesion-de-asesoria/detalle" element={<DetalleSesionAsesoriaMentor />} />


          <Route path="*" element={<h1>Pagina no encontrada. ERROR 404</h1>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
