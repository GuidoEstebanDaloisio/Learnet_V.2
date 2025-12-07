import { Box, Flex, HStack, Icon, Image, Button, Link } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaClipboardList, FaCalendarAlt, FaBookOpen, FaUser, FaSignOutAlt } from "react-icons/fa";
import Logo from "../../assets/logo.png";
import { RUTAS } from "../../routes";

export default function NavbarMentor() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Solicitudes", icon: FaClipboardList, path: RUTAS.MENTOR.SOLICITUDES },
    { label: "Agenda", icon: FaCalendarAlt, path: RUTAS.MENTOR.AGENDA },
    { label: "Mis Mentorías", icon: FaBookOpen, path: RUTAS.MENTOR.MENTORIAS },
    { label: "Perfil", icon: FaUser, path: RUTAS.MENTOR.PERFIL },
  ];

  const logout = () => navigate(RUTAS.LOGIN);

  return (
    <Box bg="gray.800" px={6} py={3} boxShadow="md">
      <Flex align="center">
        {/* LOGO */}
        <HStack spacing={3} cursor="pointer" onClick={() => navigate("/")}>
          <Image src={Logo} alt="Logo" boxSize="35px" objectFit="contain" />
          <Box fontSize="xl" fontWeight="bold">
            Learnet
          </Box>
        </HStack>

        <Flex ml="auto" align="center" gap={6}>
          {/* NAV ITEMS */}
          {navItems.map((item) => (
            <Link
              key={item.label}
              as={RouterLink}
              to={item.path}
              variant="navbarLink"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Icon as={item.icon} boxSize={5} />
              {item.label}
            </Link>
          ))}

          {/* LOGOUT */}
          <Button variant="logout" leftIcon={<FaSignOutAlt />} onClick={logout}>
            Cerrar sesión
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
