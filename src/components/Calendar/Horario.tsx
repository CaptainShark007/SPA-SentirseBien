import React from 'react';
//import './TimeSlots.css';

interface TimeSlotsProps {
  selectedDate: string | null;
  availabilityData: {
    date: string;
    serviceName: string;
    availableSlots: {
      startTime: string;
      endTime: string;
      availableSpots: number;
    }[];
  }[];
  onTimeSelect: (time: string) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedDate,
  availabilityData,
  onTimeSelect,
}) => {
  if (!selectedDate) {
    return (
      <div className='horarios-container'>
        <h3>Horarios disponibles</h3>
        <div className='zona-horaria'>
          <span>Selecciona una fecha en el calendario</span>
        </div>
      </div>
    );
  }

  const selectedDayData = availabilityData.find(
    (item) => item.date === selectedDate
  );
  const today = new Date().toISOString().split('T')[0];
  const isPastDate = selectedDate < today;

  if (!selectedDayData) {
    return (
      <div className='horarios-container'>
        <h3>Horarios disponibles</h3>
        <div className='zona-horaria'>
          <span>No hay horarios disponibles para esta fecha</span>
        </div>
      </div>
    );
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'p.m.' : 'a.m.';
    const displayHour = hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <div className='horarios-container'>
      <h3>Horarios disponibles</h3>
      <div className='zona-horaria'>
        <span>Zona horaria: Hora estÃ¡ndar central (GMT-6)</span>
      </div>
      <div className='horarios-grid'>
        {selectedDayData.availableSlots.map((slot, index) => {
          const isAvailable = slot.availableSpots > 0 && !isPastDate;
          return (
            <button
              key={index}
              className={`hora-btn ${isAvailable ? '' : 'no-disponible'}`}
              onClick={() =>
                isAvailable && onTimeSelect(`${selectedDate} ${slot.startTime}`)
              }
              disabled={!isAvailable}
            >
              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
              {!isAvailable && (
                <span className='tooltip'>No hay disponibilidad</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;
