
import { Box, Flex } from "@chakra-ui/react";

interface NavbarContainerProps {
  children: React.ReactNode;
}

export default function NavbarContainer({ children }: NavbarContainerProps) {
  return (
    <Box bg="gray.800" px={6} py={3} boxShadow="md">
      <Flex align="center">{children}</Flex>
    </Box>
  );
}