import NavbarContainer from "../../theme/components/NavbarContainer";
import NavbarLogo from "../../theme/components/NavbarLogo";
import NavbarMenu from "../../theme/components/NavbarMenu";
import { FaCompass, FaCalendarAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";
import { useAuth } from "../../context/AuthContext";

export default function NavbarAlumno() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { label: "Explorar", icon: FaCompass, path: RUTAS.ALUMNO.EXPLORAR_MENTORES },
    { label: "Agenda", icon: FaCalendarAlt, path: RUTAS.ALUMNO.AGENDA },
    { label: "Perfil", icon: FaUser, path: RUTAS.ALUMNO.PERFIL },
  ];

  const handleLogout = () => {
    logout(); // limpia sesión
    navigate(RUTAS.LOGIN); // redirige
  };

  return (
    <NavbarContainer>
      <NavbarLogo />
      <NavbarMenu navItems={navItems} onLogout={handleLogout} />
    </NavbarContainer>
  );
}