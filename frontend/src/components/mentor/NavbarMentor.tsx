import NavbarContainer from "../../theme/components/NavbarContainer";
import NavbarLogo from "../../theme/components/NavbarLogo";
import NavbarMenu from "../../theme/components/NavbarMenu";
import { FaClipboardList, FaCalendarAlt, FaBookOpen, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";
import { useAuth } from "../../context/AuthContext";

export default function NavbarMentor() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { label: "Solicitudes", icon: FaClipboardList, path: RUTAS.MENTOR.SOLICITUDES },
    { label: "Agenda", icon: FaCalendarAlt, path: RUTAS.MENTOR.AGENDA },
    { label: "Mis Mentorías", icon: FaBookOpen, path: RUTAS.MENTOR.MENTORIAS },
    { label: "Perfil", icon: FaUser, path: RUTAS.MENTOR.PERFIL }
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
