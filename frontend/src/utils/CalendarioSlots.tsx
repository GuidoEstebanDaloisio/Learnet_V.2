import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import React from "react";
import './CalendarioSlots.css';

interface Props {
  slots: { fecha: string }[];
  fechaSeleccionada: Date;
  setFechaSeleccionada: (date: Date) => void;
}

// Helper para convertir Date a YYYY-MM-DD en local
const getFechaYYYYMMDD = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const CalendarioSlots: React.FC<Props> = ({ slots, fechaSeleccionada, setFechaSeleccionada }) => {
  return (
    <Calendar
      onChange={(value: unknown) => {
        if (value instanceof Date) {
          setFechaSeleccionada(value);
        }
      }}
      value={fechaSeleccionada}
      tileDisabled={({ date }) => {
        const dateStr = getFechaYYYYMMDD(date);
        return !slots.some(s => s.fecha === dateStr);
      }}
    />
  );
};

export default CalendarioSlots;
