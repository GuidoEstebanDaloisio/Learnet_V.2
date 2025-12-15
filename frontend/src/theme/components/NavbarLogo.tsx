import { Flex, Image, Box } from "@chakra-ui/react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export default function NavbarLogo() {
  const navigate = useNavigate();

  return (
    <Flex gap={3} cursor="pointer" alignItems="flex-end" onClick={() => navigate("/")}>
      <Image src={Logo} alt="Logo" boxSize="35px" objectFit="contain" />
      <Box fontSize="xl" fontWeight="bold">
        Learnet
      </Box>
    </Flex>
  );
}