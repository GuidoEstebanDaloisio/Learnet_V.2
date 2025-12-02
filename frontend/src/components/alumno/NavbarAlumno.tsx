import { Box, Flex, HStack, Link, Icon, Spacer } from "@chakra-ui/react";
import { FaCompass, FaBookOpen, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavbarAlumno() {
  const navigate = useNavigate();

  const navItems = [
    { label: "Explorar", icon: FaCompass, path: "/alumno/explorar-mentores" },
    { label: "Mis Mentorías", icon: FaBookOpen, path: "/alumno/mentorias" },
    { label: "Perfil", icon: FaUser, path: "/alumno/perfil" },
  ];

  const handleLogout = () => {
    // Acá va tu lógica de logout
    navigate("/login");
  };

  return (
    <Box bg="gray.800" px={6} py={3} boxShadow="md">
      <Flex align="center">
        {/* NOMBRE DE LA PÁGINA */}
        <Box
          fontSize="xl"
          fontWeight="bold"
          color="white"
          cursor="pointer"
          onClick={() => navigate("/")}
        >
          Learnet
        </Box>

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

          {/* BOTÓN DE CERRAR SESIÓN */}
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
