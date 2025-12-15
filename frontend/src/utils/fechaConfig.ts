// Quiero mostrar una fecha de manera legible (dd/mm/yyyy)
export const formatoFecha = (fechaISO?: string | Date) => {
  if (!fechaISO) return "No cargada"; // Si no recibo fecha, aviso que no hay

  const fecha = new Date(fechaISO);
  if (isNaN(fecha.getTime())) return "No cargada"; // Si la fecha no es válida, aviso también

  // Tomo día, mes y año, y me aseguro de que siempre tengan 2 dígitos
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();

  // Devuelvo la fecha formateada
  return `${dia}/${mes}/${anio}`;
};

// Quiero obtener fecha y hora local legibles desde un ISO
export const formatoFechaHoraLocal = (iso: string) => {
  const d = new Date(iso);

  // Devuelvo un objeto con fecha y hora en formato local (Argentina)
  return {
    fecha: d.toLocaleDateString("es-AR"),
    hora: d.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Quiero 24h
    }),
  };
};
