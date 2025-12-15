import { Text } from "@chakra-ui/react";
import FooterContainer from "../theme/components/FooterContainer";

export default function Footer() {
  return (
    <FooterContainer mt={20}>
      <Text opacity={0.7}>
        © 2025 Mentorías — Todos los derechos reservados
      </Text>
    </FooterContainer>

  );
}
