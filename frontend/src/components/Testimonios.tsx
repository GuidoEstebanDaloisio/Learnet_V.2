import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import Card from "../theme/components/Card";

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
          <Card key={t.name} textAlign="center">
            <VStack spacing={3}>
              <Heading fontSize="xl">{t.name}</Heading>
              <Text opacity={0.8}>{t.text}</Text>
            </VStack>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}