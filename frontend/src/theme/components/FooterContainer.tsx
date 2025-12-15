// theme/components/FooterContainer.tsx
import { Box, type BoxProps } from "@chakra-ui/react";

export default function FooterContainer({ children, ...props }: BoxProps) {
  return (
    <Box
      bg="gray.800"
      py={6}
      textAlign="center"
      {...props}
    >
      {children}
    </Box>
  );
}
