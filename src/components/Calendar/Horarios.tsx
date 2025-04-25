import { ScheduleServiceData } from '@/features/schedule/schedule.types';
import { useState } from 'react';

interface Slot {
  startTime: string;
  endTime: string;
  availableSpots: number;
}

interface Schedule {
  date: string;
  serviceName: string;
  availableSlots: Slot[];
}

interface Props {
  selectedDate: string; // debe estar en formato 'YYYY-MM-DD'
  schedules: ScheduleServiceData[];
}

export const HorariosDisponibles = ({
  selectedDate,
  schedules,
  selectedHour,
  setSelectedHour,
}: Props) => {
  console.log('schedule', schedules);
  console.log('selectedDate', selectedDate);
  const horarioDelDia = schedules?.find((s) => s.date === selectedDate);

  console.log('horarioDelDia', horarioDelDia);
  console.log('selectedHour', selectedHour);

  return (
    <div className='reserva-seccion'>
      <div className='horarios-container'>
        <h3>Horarios disponibles</h3>
        <div className='zona-horaria'>
          <span>Zona horaria: Hora estándar central (GMT-6)</span>
        </div>
        <div className='horarios-grid'>
          {horarioDelDia?.availableSlots?.map((slot) => {
            const formattedHour = slot.startTime.slice(0, 5);
            const isSelected = selectedHour === slot.startTime;

            return (
              <button
                key={slot.startTime}
                className={`hora-btn ${
                  slot.availableSpots === 0 ? 'no-disponible' : ''
                } ${isSelected ? 'seleccionado' : ''}`}
                onClick={() => setSelectedHour(slot.startTime)}
                disabled={slot.availableSpots === 0}
              >
                {formattedHour} hrs
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
