import Button from '@components/Button/Button';
import './horario.css';
import { ScheduleServiceData } from '@/features/schedule/schedule.types';
interface Props {
  selectedDate: string;
  schedules: ScheduleServiceData[];
}

export const HorariosDisponibles = ({
  selectedDate,
  schedules,
  horaSeleccionada,
  setHoraSeleccionada,
}: Props) => {
  const horarioDelDia = schedules?.find((s) => s.date === selectedDate);

  return (
    <div className='horarios-container'>
      <h3>Horarios disponibles</h3>
      <div className='zona-horaria'>
        <span>Zona horaria: Hora estándar central (GMT-6)</span>
      </div>
      <div className='horarios-grid'>
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
