import { Box, SimpleGrid, VStack, Heading, Text } from "@chakra-ui/react";
import Card from "../theme/components/Card";

const datos = [
  { title: "Mentores reales", desc: "Profesionales con experiencia comprobable." },
  { title: "Flexibilidad total", desc: "Elegí horarios que se adapten a vos." },
  { title: "Crecimiento constante", desc: "Seguimiento y recomendaciones personalizadas." },
];

export default function Beneficios() {
  return (
    <Box id="beneficios" px={6}>
      <Heading textAlign="center" mb={12}>Beneficios</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {datos.map((item) => (
          <Card key={item.title} textAlign="center">
            <VStack spacing={3}>
              <Heading fontSize="xl">{item.title}</Heading>
              <Text opacity={0.8}>{item.desc}</Text>
            </VStack>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
