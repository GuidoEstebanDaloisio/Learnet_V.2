import { Text, Badge, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";
import Card from "../../theme/components/Card";


interface MentoriaCardMentorProps {
  id: string;
  titulo: string;
  descripcion: string;
  tema: string;
}

export default function MentoriaCardMentor({
  id,
  titulo,
  descripcion,
  tema,
}: MentoriaCardMentorProps) {
  const navigate = useNavigate();

  return (
    <Card>
      {/* Tema */}
      <Badge
        colorScheme="brand"
        mb={3}
        px={3}
        py={1}
        rounded="md"
        fontSize="0.8rem"
      >
        {tema}
      </Badge>

      {/* Título */}
      <Text fontSize="xl" color="brand.300" fontWeight="bold" mb={2}>
        {titulo}
      </Text>

      {/* Descripción */}
      <Text fontSize="md" color="gray.300" noOfLines={3} mb={4}>
        {descripcion}
      </Text>

      <Button
        w="100%"
        variant="primary"
        onClick={() =>
          navigate(`${RUTAS.MENTOR.DETALLE_MENTORIA}/${id}`)
        }
      >
        Ver
      </Button>
    </Card>
  );
}
