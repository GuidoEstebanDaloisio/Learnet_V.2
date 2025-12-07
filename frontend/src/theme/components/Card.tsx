import { Box, type BoxProps } from "@chakra-ui/react";

//Tuve que crear este componente porque era la unica forma de tener los estilos de las cards en un solo lugar
//Ya que no podia crear "variants" del box porque tira error, ni de Card porque reordenaba los elementos dentro
//de las cards
export default function Card({ children, ...props }: BoxProps) {
  return (
    <Box
      bg="gray.800"
      p={5}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      borderColor="gray.700"
      transition="0.2s"
      _hover={{
        shadow: "lg",
        transform: "translateY(-3px)",
        borderColor: "brand.400",
      }}
      {...props}
    >
      {children}
    </Box>
  );
}