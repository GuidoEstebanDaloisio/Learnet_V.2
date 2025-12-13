import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
import Panel from "../../theme/components/Panel";

interface MentoriaFormProps {
  titulo: string;
  descripcion: string;
  tema: string;
  temas: { _id: string; nombre: string; slug: string }[]; // Lista de temas desde el backend
  onChangeTitulo: (v: string) => void;
  onChangeDescripcion: (v: string) => void;
  onChangeTema: (v: string) => void;
  onSubmit: () => void;
  modo: "crear" | "editar";
}

export default function MentoriaForm({
  titulo,
  descripcion,
  tema,
  temas,
  onChangeTitulo,
  onChangeDescripcion,
  onChangeTema,
  onSubmit,
  modo,
}: MentoriaFormProps) {
  return (
    <Panel maxW="700px" mx="auto">
      {/* Tema - para crear y editar */}
      <FormControl mb={5}>
        <FormLabel>Tema</FormLabel>
        <Select
          placeholder="Selecciona un tema"
          value={tema}
          onChange={(e) => onChangeTema(e.target.value)}
        >
          {temas.map((t) => (
            <option key={t._id} value={t._id}>
              {t.nombre}
            </option>
          ))}
        </Select>


      </FormControl>

      {/* Título */}
      <FormControl mb={5}>
        <FormLabel>Título</FormLabel>
        <Input
          value={titulo}
          onChange={(e) => onChangeTitulo(e.target.value)}
        />
      </FormControl>

      {/* Descripción */}
      <FormControl mb={8}>
        <FormLabel>Descripción</FormLabel>
        <Textarea
          value={descripcion}
          onChange={(e) => onChangeDescripcion(e.target.value)}
          rows={5}
        />
      </FormControl>

      {/* Botón */}
      <Button w="100%" variant="primary" onClick={onSubmit}>
        {modo === "crear" ? "Crear Mentoría" : "Guardar Cambios"}
      </Button>
    </Panel>
  );
}
