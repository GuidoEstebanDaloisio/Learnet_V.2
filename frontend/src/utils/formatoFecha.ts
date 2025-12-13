export const formatoFecha = (fechaISO?: string | Date) => {
  if (!fechaISO) return "No cargada";

  const fecha = new Date(fechaISO);

  if (isNaN(fecha.getTime())) return "No cargada";

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
};
