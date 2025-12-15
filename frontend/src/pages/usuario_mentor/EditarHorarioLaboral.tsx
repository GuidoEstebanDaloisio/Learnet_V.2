import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";
import { mostrarToast } from "../../utils/toast";
import {
    Box,
    Heading,
    VStack,
    HStack,
    FormControl,
    FormLabel,
    Checkbox,
    CheckboxGroup,
    Input,
    Button,
    Wrap,
    WrapItem,
    Badge,
    Text,
    useToast,
} from "@chakra-ui/react";
import NavbarMentor from "../../components/mentor/NavbarMentor";
import Footer from "../../components/Footer";
import Panel from "../../theme/components/Panel";
import {
    obtenerDisponibilidadBase,
    guardarDisponibilidadBase,
} from "../../api/disponibilidadApi";


const DIAS = [
    { label: "Dom", value: 0 },
    { label: "Lun", value: 1 },
    { label: "Mar", value: 2 },
    { label: "Mié", value: 3 },
    { label: "Jue", value: 4 },
    { label: "Vie", value: 5 },
    { label: "Sáb", value: 6 },
];

export default function EditarHorarioLaboral() {
    const navigate = useNavigate(); 
    const toast = useToast();

    const [diasSemana, setDiasSemana] = useState<number[]>([]);
    const [horaDesde, setHoraDesde] = useState("08:00");
    const [horaHasta, setHoraHasta] = useState("16:00");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDisponibilidad = async () => {
            try {
                const res = await obtenerDisponibilidadBase();
                if (res.data) {
                    setDiasSemana(res.data.diasSemana);
                    setHoraDesde(res.data.horaDesde);
                    setHoraHasta(res.data.horaHasta);
                }
            } catch (error) {
                console.error("Error cargando disponibilidad:", error);
                mostrarToast(toast, "error", "Error cargando disponibilidad");
            } finally {
                setLoading(false);
            }
        };

        fetchDisponibilidad();
    }, []);


    const handleGuardar = async () => {
        try {
            await guardarDisponibilidadBase({ diasSemana, horaDesde, horaHasta });
            mostrarToast(toast, "success", "Horario laboral guardado correctamente");
            navigate(RUTAS.MENTOR.PERFIL);
        } catch (error) {
            console.error("Error guardando disponibilidad:", error);
            mostrarToast(toast, "error", "Error al guardar el horario");
        }
    };

    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <NavbarMentor />

            <Box flex="1" px={{ base: 4, md: 12 }} py={10}>
                <Heading mb={8} textAlign="center">
                    Editar Horario Laboral
                </Heading>

                <Panel maxW="700px" mx="auto">
                    <VStack spacing={6} align="stretch">
                        {/* Mostrar horario actual */}
                        <Box>
                            <Text fontWeight="bold" mb={2}>
                                Horario actual
                            </Text>
                            {loading ? (
                                <Text>Cargando...</Text>
                            ) : diasSemana.length > 0 ? (
                                <>
                                    <Text>
                                        Horas: {horaDesde} - {horaHasta}
                                    </Text>
                                    <Wrap mt={1}>
                                        {diasSemana.map((d) => (
                                            <WrapItem key={d}>
                                                <Badge colorScheme="blue">{DIAS[d].label}</Badge>
                                            </WrapItem>
                                        ))}
                                    </Wrap>
                                </>
                            ) : (
                                <Text color="gray.500">No hay horario definido</Text>
                            )}
                        </Box>

                        {/* Formulario */}
                        <Box>
                            <FormControl mb={4} isRequired>
                                <FormLabel>Días de la semana</FormLabel>
                                <CheckboxGroup
                                    value={diasSemana.map(String)}
                                    onChange={(v) => setDiasSemana(v.map(Number))}
                                >
                                    <HStack spacing={4}>
                                        {DIAS.map((d) => (
                                            <Checkbox key={d.value} value={String(d.value)}>
                                                {d.label}
                                            </Checkbox>
                                        ))}
                                    </HStack>
                                </CheckboxGroup>
                            </FormControl>

                            <HStack spacing={4} mb={4}>
                                <FormControl isRequired>
                                    <FormLabel>Desde</FormLabel>
                                    <Input
                                        type="time"
                                        value={horaDesde}
                                        onChange={(e) => setHoraDesde(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Hasta</FormLabel>
                                    <Input
                                        type="time"
                                        value={horaHasta}
                                        onChange={(e) => setHoraHasta(e.target.value)}
                                    />
                                </FormControl>
                            </HStack>

                            <Button w="100%" colorScheme="green" onClick={handleGuardar}>
                                Guardar horario
                            </Button>
                        </Box>
                    </VStack>
                </Panel>
            </Box>

            <Footer />
        </Box>
    );
}
