import { Box, SimpleGrid, VStack, Heading, Text } from "@chakra-ui/react";

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
          <VStack
            key={item.title}
            bg="gray.800"
            p={6}
            rounded="lg"
            boxShadow="lg"
          >
            <Heading fontSize="xl">{item.title}</Heading>
            <Text opacity={0.8}>{item.desc}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
