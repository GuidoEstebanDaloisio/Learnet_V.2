import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

const testimonios = [
  { name: "Laura G.", text: "Me ayudaron a ordenar mi carrera y conseguir mi primer empleo IT." },
  { name: "Julián P.", text: "La mentoría fue clara, directa y muy útil. Súper recomendable." },
  { name: "Martina R.", text: "Es un antes y un después. El acompañamiento es excelente." },
];

export default function Testimonios() {
  return (
    <Box id="testimonios" px={6} py={16}>
      <Heading textAlign="center" mb={12}>Testimonios</Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {testimonios.map((t) => (
          <VStack
            key={t.name}
            bg="gray.800"
            p={6}
            rounded="lg"
            boxShadow="lg"
          >
            <Text fontWeight="bold">{t.name}</Text>
            <Text opacity={0.8}>{t.text}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
}
