import { Box, VStack } from "@chakra-ui/react";
import Hero from "../components/Hero";
import Beneficios from "../components/Beneficios";
import Testimonios from "../components/Testimonios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Hero />
      <VStack spacing={24} mt={12}>
        <Beneficios />
        <Testimonios />
      </VStack>
      <Footer />
    </Box>
  );
}
