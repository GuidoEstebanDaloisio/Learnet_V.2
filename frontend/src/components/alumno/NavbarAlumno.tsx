import { Box, Flex, HStack, Link, Icon, Spacer, Image } from "@chakra-ui/react";
import { FaCompass, FaUser, FaSignOutAlt,FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png"; // <-- IMPORTA EL LOGO

export default function NavbarAlumno() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Explorar", icon: FaCompass, path: "/alumno/explorar-mentores" },
    { label: "Agenda", icon: FaCalendarAlt, path: "/alumno/agenda" },
    { label: "Perfil", icon: FaUser, path: "/alumno/perfil" },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Box bg="gray.800" px={6} py={3} boxShadow="md">
      <Flex align="center">

        {/* LOGO + NOMBRE */}
        <HStack
          spacing={2}
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          <Image
            src={Logo}
            alt="logo"
            boxSize="35px"
            objectFit="contain"
          />

          <Box fontSize="xl" fontWeight="bold" color="white">
            Learnet
          </Box>
        </HStack>

        <Spacer />

        {/* NAV ITEMS */}
        <HStack spacing={8}>
          {navItems.map((item) => (
            <HStack
              key={item.label}
              spacing={2}
              color="gray.200"
              cursor="pointer"
              _hover={{ color: "white" }}
              onClick={() => navigate(item.path)}
            >
              <Icon as={item.icon} boxSize={5} />
              <Link fontSize="md" _hover={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            </HStack>
          ))}

          {/* LOGOUT */}
          <HStack
            spacing={2}
            color="red.300"
            cursor="pointer"
            _hover={{ color: "red.400" }}
            onClick={handleLogout}
          >
            <Icon as={FaSignOutAlt} boxSize={5} />
            <Link fontSize="md" _hover={{ textDecoration: "none" }}>
              Cerrar sesión
            </Link>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
}
