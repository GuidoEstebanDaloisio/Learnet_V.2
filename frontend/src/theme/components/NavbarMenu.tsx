import { Flex, Icon, Button, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

interface NavbarMenuProps {
  navItems: { label: string; icon: React.ElementType; path: string }[];
  onLogout: () => void;
}

export default function NavbarMenu({ navItems, onLogout }: NavbarMenuProps) {
  return (
    <Flex ml="auto" align="center" gap={6}>
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
      <Button variant="logout" leftIcon={<FaSignOutAlt />} onClick={onLogout}>
        Cerrar sesión
      </Button>
    </Flex>
  );
}