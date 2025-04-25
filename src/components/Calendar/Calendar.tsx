import React, { useState, useEffect } from 'react';

interface TimeSlot {
  startTime: string;
  endTime: string;
  availableSpots: number;
}

interface AvailabilityData {
  date: string;
  serviceName: string;
  availableSlots: TimeSlot[];
}

interface ApiResponse {
  status: string;
  data: AvailabilityData[];
}

interface CalendarProps {
  serviceId: string;
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
  onAvailabilityChange: (data: AvailabilityData[]) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  serviceId,
  onDateSelect,
  selectedDate,
  onAvailabilityChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  // Función para obtener los datos de disponibilidad (60 días desde hoy)
  const fetchAvailability = async () => {
    setLoading(true);
    try {
      const today = new Date();
      const dateParam = today.toISOString().split('T')[0];

      const response = await fetch(
        `http://localhost:8080/api/availability?serviceId=${serviceId}&date=${dateParam}&days=60`
      );
      const data: ApiResponse = await response.json();
      if (data.status === 'Success') {
        setAvailabilityData(data.data);
        onAvailabilityChange(data.data);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, [serviceId, onAvailabilityChange]);

  // Función para cambiar de mes
  const changeMonth = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + increment);

    // No permitir navegar a meses anteriores al actual
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newMonthStart = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      1
    );
    const currentMonthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (newMonthStart >= currentMonthStart) {
      setCurrentMonth(newDate);
    }
  };

  // Función para renderizar solo el mes actual
  const renderCurrentMonth = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    const days = [];

    // Días del mes anterior (para completar la primera semana)
    for (let i = 0; i < startDay; i++) {
      days.push(<span key={`empty-${i}`} className='calendario-vacio'></span>);
    }

    // Días del mes actual
    /* for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayData = availabilityData.find(item => item.date === dateStr);
      const dateObj = new Date(dateStr);
      const isToday = dateObj.toDateString() === today.toDateString();
      const isPast = dateObj < today;
      const hasAvailability = dayData && dayData.availableSlots.some(slot => slot.availableSpots > 0);

      let dayClass = 'calendario-dia';
      if (isToday) dayClass += ' hoy';
      if (isPast) dayClass += ' pasado';
      if (!hasAvailability && !isPast) dayClass += ' sin-disponibilidad';

      days.push(
        <span
          key={`day-${i}`}
          className={dayClass}
          onClick={() => {
            if (!isPast && hasAvailability) {
              // Corregimos el problema de zona horaria aquí
              const correctedDate = new Date(dateObj);
              correctedDate.setMinutes(correctedDate.getMinutes() - correctedDate.getTimezoneOffset());
              onDateSelect(correctedDate.toISOString().split('T')[0]);
            }
          }}
        >
          {i}
          {hasAvailability && !isPast && (
            <span className="disponibilidad-indicador"></span>
          )}
        </span>
      );
    } */

    // Días del mes actual
    for (let i = 1; i <= totalDays; i++) {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1; // Los meses en Date van de 0-11
      const day = i;

      // Crear la fecha en formato ISO (YYYY-MM-DD)
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // Crear objeto Date usando UTC para evitar problemas de zona horaria
      const dateObj = new Date(Date.UTC(year, month - 1, day));

      const dayData = availabilityData.find((item) => item.date === dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Comparación segura para el día actual
      const isToday =
        dateObj.getUTCDate() === today.getDate() &&
        dateObj.getUTCMonth() === today.getMonth() &&
        dateObj.getUTCFullYear() === today.getFullYear();

      const isPast = dateObj < today;
      const hasAvailability =
        dayData &&
        dayData.availableSlots.some((slot) => slot.availableSpots > 0);

      let dayClass = 'calendario-dia';
      if (isToday) dayClass += ' hoy';
      if (isPast) dayClass += ' pasado';
      if (!hasAvailability && !isPast) dayClass += ' sin-disponibilidad';

      days.push(
        <span
          key={`day-${i}`}
          className={dayClass}
          onClick={() => {
            if (!isPast && hasAvailability) {
              // Enviar directamente la fecha en formato ISO (ya está en UTC)
              console.log('Seleccionado:', dateStr, 'Objeto Date:', dateObj);
              onDateSelect(dateStr); // Usamos dateStr que ya está en formato correcto
            }
          }}
        >
          {i}
          {hasAvailability && !isPast && (
            <span className='disponibilidad-indicador'></span>
          )}
        </span>
      );
    }

    // Calcular el total de celdas para completar la cuadrícula (múltiplo de 7)
    const totalCells = Math.ceil((startDay + totalDays) / 7) * 7;
    const remainingCells = totalCells - (startDay + totalDays);

    for (let i = 0; i < remainingCells; i++) {
      days.push(
        <span key={`empty-end-${i}`} className='calendario-vacio'></span>
      );
    }

    return (
      <div className='calendario-mes'>
        <h4>
          {currentMonth.toLocaleString('es-ES', { month: 'long' })}{' '}
          {currentMonth.getFullYear()}
        </h4>
        <div className='calendario-dias-semana'>
          <span>Do</span>
          <span>Lu</span>
          <span>Ma</span>
          <span>Mi</span>
          <span>Ju</span>
          <span>Vi</span>
          <span>Sá</span>
        </div>
        <div className='calendario-grid'>{days}</div>
      </div>
    );
  };

  // Verificar si podemos navegar al mes anterior
  const canGoToPreviousMonth = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    return prevMonth >= new Date(today.getFullYear(), today.getMonth(), 1);
  };

  // Verificar si podemos navegar al mes siguiente
  const canGoToNextMonth = () => {
    // Permitir siempre navegar al siguiente mes
    return true;
  };

  return (
    <div className='calendario-spa'>
      <div className='calendario-header'>
        <button
          className='calendario-nav-btn'
          onClick={() => changeMonth(-1)}
          disabled={!canGoToPreviousMonth()}
          aria-label='Mes anterior'
        >
          &lt;
        </button>
        <h3>
          {currentMonth.toLocaleString('es-ES', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <button
          className='calendario-nav-btn'
          onClick={() => changeMonth(1)}
          disabled={!canGoToNextMonth()}
          aria-label='Mes siguiente'
        >
          &gt;
        </button>
      </div>

      <div className='calendario-meses-container'>
        {loading ? (
          <div className='calendario-loading'>Cargando disponibilidad...</div>
        ) : (
          renderCurrentMonth()
        )}
      </div>
    </div>
  );
};

export default Calendar;
