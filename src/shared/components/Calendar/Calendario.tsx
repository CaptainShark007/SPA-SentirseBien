import { useState } from 'react';

const diasSemana = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

export function CalendarioReserva({
  fechaSeleccionada,
  setFechaSeleccionada,
  setSelectedHour,
}) {
  const hoy = new Date();
  const [mesActual, setMesActual] = useState(
    new Date(hoy.getFullYear(), hoy.getMonth())
  );

  const fechaMaxima = new Date(hoy.getFullYear(), hoy.getMonth() + 2);

  const avanzarMes = () => {
    const siguiente = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth() + 1
    );
    if (siguiente <= fechaMaxima) {
      setMesActual((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1));
    }
  };

  const mesEsMaximo =
    mesActual.getMonth() === fechaMaxima.getMonth() &&
    mesActual.getFullYear() === fechaMaxima.getFullYear();

  const retrocederMes = () => {
    const anterior = new Date(
      mesActual.getFullYear(),
      mesActual.getMonth() - 1
    );
    if (anterior >= new Date(hoy.getFullYear(), hoy.getMonth())) {
      setMesActual(anterior);
    }
  };

  const obtenerDiasDelMes = () => {
    const inicio = new Date(mesActual.getFullYear(), mesActual.getMonth(), 1);
    const fin = new Date(mesActual.getFullYear(), mesActual.getMonth() + 1, 0);
    const dias = [];

    // Espacios vacíos al inicio
    for (let i = 0; i < inicio.getDay(); i++) {
      dias.push(<span key={`empty-${i}`} className='calendario-vacio'></span>);
    }

    // Días del mes
    for (let d = 1; d <= fin.getDate(); d++) {
      const fecha = new Date(mesActual.getFullYear(), mesActual.getMonth(), d);
      const esPasado = fecha < new Date(hoy.toDateString());
      const esSeleccionado =
        fecha.toISOString().split('T')[0] === fechaSeleccionada;

      dias.push(
        <span
          key={d}
          className={`calendario-dia ${esPasado ? 'pasado' : ''} ${esSeleccionado ? 'seleccionado' : ''}`}
          onClick={() => {
            if (!esPasado) {
              const fechaFormateada = fecha.toISOString().split('T')[0];
              setFechaSeleccionada(fechaFormateada);
              setSelectedHour(null);
              console.log('Fecha seleccionada:', fechaFormateada);
            }
          }}
        >
          {d}
        </span>
      );
    }

    return dias;
  };

  const nombreMes = mesActual.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className='reserva-seccion'>
      <div className='calendario-spa'>
        <div className='calendario-header'>
          <button
            onClick={retrocederMes}
            disabled={
              mesActual.getMonth() === hoy.getMonth() &&
              mesActual.getFullYear() === hoy.getFullYear()
            }
          >
            ◀
          </button>
          <h3>{nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)}</h3>
          <button onClick={avanzarMes} disabled={mesEsMaximo}>
            ▶
          </button>
        </div>
        <div className='calendario-dias-semana'>
          {diasSemana.map((dia) => (
            <span key={dia}>{dia}</span>
          ))}
        </div>
        <div className='calendario-grid'>{obtenerDiasDelMes()}</div>
      </div>
    </div>
  );
}
