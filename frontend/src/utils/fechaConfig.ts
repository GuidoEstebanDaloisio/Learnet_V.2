export const formatoFecha = (fechaISO?: string | Date) => {
  if (!fechaISO) return "No cargada";

  const fecha = new Date(fechaISO);
  if (isNaN(fecha.getTime())) return "No cargada";

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
};

export const formatoFechaHoraLocal = (iso: string) => {
  const d = new Date(iso);

  return {
    fecha: d.toLocaleDateString("es-AR"),
    hora: d.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 👈 CLAVE
    }),
  };
};
