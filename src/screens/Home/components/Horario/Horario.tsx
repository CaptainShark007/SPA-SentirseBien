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
    <div className='reserva-seccion'>
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
              <button
                key={slot.startTime}
                className={`hora-btn ${
                  slot.availableSpots === 0 ? 'no-disponible' : ''
                } ${isSelected ? 'seleccionado' : ''}`}
                onClick={() => setHoraSeleccionada(slot.startTime)}
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
