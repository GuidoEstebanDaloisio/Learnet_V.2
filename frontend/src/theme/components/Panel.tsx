import { Box, type BoxProps } from "@chakra-ui/react";

export default function Panel({ children, ...props }: BoxProps) {
  return (
    <Box
      bg="gray.800"
      p={6}
      rounded="lg"
      borderWidth="1px"
      borderColor="gray.700"
      shadow="md"
      {...props}
    >
      {children}
    </Box>
  );
}
