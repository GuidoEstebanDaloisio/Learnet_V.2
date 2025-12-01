import { Box, VStack } from "@chakra-ui/react";
import Hero from "../components/Hero";
import Beneficios from "../components/Beneficios";
import Testimonios from "../components/Testimonios";

export default function Home() {
  return (
    <Box>
      <Hero />
      <VStack spacing={24} mt={12}>
        <Beneficios />
        <Testimonios />
      </VStack>
    </Box>
  );
}
