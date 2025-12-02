import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import tema from "./theme/Tema";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Explorar from "./pages/usuario_alumno/Explorar";
import MisMentorias from "./pages/usuario_alumno/MisMentorias";
import PerfilAlumno from "./pages/usuario_alumno/PerfilAlumno";
import DetalleMentoria from "./pages/usuario_alumno/DetalleMentoria";
import DetalleMentor from "./pages/usuario_alumno/DetalleMentor";

function App() {
  return (
    <ChakraProvider theme={tema}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route path="/alumno/explorar-mentores" element={<Explorar />} />
          <Route path="/alumno/detalles-mentor" element={<DetalleMentor />} />
          <Route path="/alumno/mentorias" element={<MisMentorias />} />
          <Route path="/alumno/mentoria/detalle" element={<DetalleMentoria />} />
          <Route path="/alumno/perfil" element={<PerfilAlumno />} />

          <Route path="*" element={<h1>Pagina no encontrada. ERROR 404</h1>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
