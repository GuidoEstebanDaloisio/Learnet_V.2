// src/pages/mentor/EditarHorarioLaboral.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RUTAS } from "../../routes";
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
    const navigate = useNavigate(); // 🔹 debe estar aquí
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
                toast({
                    title: "Error cargando disponibilidad",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDisponibilidad();
    }, []);

     const handleGuardar = async () => {
        try {
            await guardarDisponibilidadBase({ diasSemana, horaDesde, horaHasta });
            toast({
                title: "Horario laboral guardado",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            navigate(RUTAS.MENTOR.PERFIL); // 🔹 ahora funciona
        } catch (error) {
            console.error("Error guardando disponibilidad:", error);
            toast({
                title: "Error al guardar",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
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
                            <FormControl mb={4}>
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
                                <FormControl>
                                    <FormLabel>Desde</FormLabel>
                                    <Input
                                        type="time"
                                        value={horaDesde}
                                        onChange={(e) => setHoraDesde(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl>
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
