import type { UseToastOptions, ToastPosition } from "@chakra-ui/react";

type TipoToast = "success" | "error" | "info";

interface MostrarToastOptions {
  position?: ToastPosition;
  duration?: number;
  isClosable?: boolean;
}

export const mostrarToast = (
  toast: (options: UseToastOptions) => void,
  tipo: TipoToast,
  mensaje: string,
  options?: MostrarToastOptions
) => {
  const baseOptions: UseToastOptions = {
    title: mensaje,
    status: tipo, // Chakra acepta "success" | "error" | "warning" | "info"
    duration: options?.duration ?? 4000,
    position: options?.position ?? "top-right",
    isClosable: options?.isClosable ?? true,
  };

  toast(baseOptions);
};
