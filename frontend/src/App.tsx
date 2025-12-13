import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import tema from "./theme/Tema";

// Proteccion de rutas
import ProtectedRoute from "./routes/ProtectedRoute";
import { Outlet } from "react-router-dom";


// Paginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Explorar from "./pages/usuario_alumno/Explorar";
import AgendaAlumno from "./pages/usuario_alumno/AgendaAlumno";
import PerfilAlumno from "./pages/usuario_alumno/PerfilAlumno";
import DetalleMentor from "./pages/usuario_alumno/DetalleMentor";
import SolicitarMentoria from "./pages/usuario_alumno/SolicitarMentoria";
import DetalleSesionAsesoriaAlumno from "./pages/usuario_alumno/DetalleSesionAsesoriaAlumno";

import PerfilMentor from "./pages/usuario_mentor/PerfilMentor";
import MisMentoriasMentor from "./pages/usuario_mentor/MisMentoriasMentor";
import DetalleMentoriaMentor from "./pages/usuario_mentor/DetalleMentoriaMentor";
import EditarMentoria from "./pages/usuario_mentor/EditarMentoria";
import NuevaMentoria from "./pages/usuario_mentor/NuevaMentoria";
import SolicitudesMentor from "./pages/usuario_mentor/SolicitudesMentor";
import Agenda from "./pages/usuario_mentor/Agenda";
import DetalleSesionAsesoriaMentor from "./pages/usuario_mentor/DetalleSesionAsesoriaMentor";

// Rutas centralizadas
import { RUTAS } from "./routes";
import Registro from "./pages/register/Registro";
import RegistroMentor from "./pages/register/RegistroMentor";
import RegistroAlumno from "./pages/register/RegistroAlumno";
import RegistroAdmin from "./pages/register/RegistroAdmin";

function App() {
  return (
    <ChakraProvider theme={tema}>
      <BrowserRouter>
        <Routes>

          {/* Rutas generales */}
          <Route path={RUTAS.HOME} element={<Home />} />
          <Route path={RUTAS.LOGIN} element={<Login />} />

          {/* Registro */}
          <Route path={RUTAS.REGISTRO.BASE} element={<Registro />} />
          <Route path={RUTAS.REGISTRO.MENTOR} element={<RegistroMentor />} />
          <Route path={RUTAS.REGISTRO.ALUMNO} element={<RegistroAlumno />} />
          <Route path={RUTAS.REGISTRO.ADMIN} element={<RegistroAdmin />} />


          {/* Alumno */}
          <Route
            path={RUTAS.ALUMNO.BASE}
            element={
              <ProtectedRoute allowedRoles={["alumno"]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path={RUTAS.ALUMNO.EXPLORAR_MENTORES} element={<Explorar />} />
            <Route path={RUTAS.ALUMNO.DETALLE_MENTOR} element={<DetalleMentor />} />
            <Route path={RUTAS.ALUMNO.SOLICITAR_MENTORIA} element={<SolicitarMentoria />} />
            <Route path={RUTAS.ALUMNO.AGENDA} element={<AgendaAlumno />} />
            <Route path={RUTAS.ALUMNO.DETALLE_SESION_ASESORIA} element={<DetalleSesionAsesoriaAlumno />} />
            <Route path={RUTAS.ALUMNO.PERFIL} element={<PerfilAlumno />} />
          </Route>


          {/* Mentor */}
          <Route
            path={RUTAS.MENTOR.BASE}
            element={
              <ProtectedRoute allowedRoles={["mentor"]}>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path={RUTAS.MENTOR.PERFIL} element={<PerfilMentor />} />
            <Route path={RUTAS.MENTOR.MENTORIAS} element={<MisMentoriasMentor />} />
            <Route path={RUTAS.MENTOR.DETALLE_MENTORIA_ID} element={<DetalleMentoriaMentor />} />
            <Route path={RUTAS.MENTOR.EDITAR_MENTORIA} element={<EditarMentoria />} />
            <Route path={RUTAS.MENTOR.NUEVA_MENTORIA} element={<NuevaMentoria />} />
            <Route path={RUTAS.MENTOR.SOLICITUDES} element={<SolicitudesMentor />} />
            <Route path={RUTAS.MENTOR.AGENDA} element={<Agenda />} />
            <Route path={RUTAS.MENTOR.DETALLE_SESION_ASESORIA} element={<DetalleSesionAsesoriaMentor />} />
          </Route>

          {/* 404 */}
          <Route path={RUTAS.NOT_FOUND} element={<h1>Pagina no encontrada. ERROR 404</h1>} />

        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
