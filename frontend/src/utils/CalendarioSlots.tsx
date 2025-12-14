import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import React from "react";
import './CalendarioSlots.css';


interface Props {
  slots: { fecha: string }[];
  fechaSeleccionada: Date;
  setFechaSeleccionada: (date: Date) => void;
}

const CalendarioSlots: React.FC<Props> = ({ slots, fechaSeleccionada, setFechaSeleccionada }) => {
  return (
    <Calendar
      onChange={(value: unknown) => {
        // forzamos el tipo a Date, porque TS da conflicto con react-calendar
        if (value instanceof Date) {
          setFechaSeleccionada(value);
        }
      }}
      value={fechaSeleccionada}
      tileDisabled={({ date, view }) => {
        const dateStr = date.toISOString().split("T")[0];
        return !slots.some(s => s.fecha === dateStr);
      }}
    />
  );
};

export default CalendarioSlots;
