import Button from '@components/Button/Button';
import { Available } from '@features/types/serviceSpa.types';
import styles from '@screens/Reservar/components/Horario/Horario.module.css';
import React from 'react';
interface Props {
  fechaSeleccionada: string;
  schedules: Available[] | undefined;
  horaSeleccionada: string | undefined;
  setHoraSeleccionada: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const HorariosDisponibles = ({
  fechaSeleccionada,
  schedules,
  horaSeleccionada,
  setHoraSeleccionada,
}: Props) => {
  const horarioDelDia = schedules?.find((s) => s.date === fechaSeleccionada);

  return (
    <div className={styles['horarios-container']}>
      <h3>Horarios disponibles</h3>
      <div className={styles['zona-horaria']}>
        <span>Zona horaria: Hora estándar central (GMT-6)</span>
      </div>
      <div className={styles['horarios-grid']}>
        {horarioDelDia?.availableSlots?.map((slot) => {
          const formattedHour = slot.startTime.slice(0, 5);
          const isSelected = horaSeleccionada === slot.startTime;

          return (
            <Button
              variant='contained'
              key={slot.startTime}
              onClick={() => setHoraSeleccionada(slot.startTime)}
              disabled={slot.availableSpots === 0 || isSelected}
            >
              {formattedHour} hrs
            </Button>
          );
        })}
      </div>
    </div>
  );
};
