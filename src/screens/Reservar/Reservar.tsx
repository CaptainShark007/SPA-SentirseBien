import Calendario from '@screens/Reservar/components/Calendario/Calendario';
import './reservar.css';
import { HorariosDisponibles } from '@screens/Reservar/components/Horario/Horario';
import { formatearFecha, formatearHora } from '@utils/format';
import Button from '@components/Button/Button';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useApiAvailability } from '@features/hooks/useApiAvailability';
import { useApiGetService } from '@features/hooks/useApiGetService';
import { useApiCreateReserve } from '@features/hooks/useApiCreateReserve';
import SpinnerLoading from '@components/SpinnerLoading/SpinnerLoading';
import ContainerServices from '@components/ContainerServices/ContainerServices';

const Reservar = () => {
  const { servicioId } = useParams();
  const navigate = useNavigate();

  const fechaMinima = useMemo(() => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 4);
    return hoy;
  }, []);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(
    fechaMinima.toISOString().split('T')[0]
  );
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | undefined>(
    undefined
  );

  const { createReserve, isPending } = useApiCreateReserve();

  const { data: availability, isLoading: isLoadingAvailability } =
    useApiAvailability({
      date: fechaSeleccionada,
      id: Number(servicioId!),
      days: 60,
    });

  const { data: response, isLoading: isLoadingServicio } = useApiGetService(
    Number(servicioId!)
  );

  if (isLoadingAvailability || isLoadingServicio) return <SpinnerLoading />;

  return (
    <ContainerServices title='Reserva tu cita en nuestro SPA'>
      <div className='reserva-grid'>
        <Calendario
          fechaSeleccionada={fechaSeleccionada}
          setFechaSeleccionada={setFechaSeleccionada}
          setHoraSeleccionada={setHoraSeleccionada}
        />

        <HorariosDisponibles
          fechaSeleccionada={fechaSeleccionada}
          schedules={availability?.data}
          horaSeleccionada={horaSeleccionada}
          setHoraSeleccionada={setHoraSeleccionada}
        />

        <div className='datos-reserva'>
          <h3>Detalles de la reserva</h3>
          <div className='reserva-info'>
            <div className='info-item'>
              <span className='info-label'>Servicio:</span>
              <span>{response?.data?.name}</span>
            </div>

            <div className='info-item'>
              <span className='info-label'>Fecha:</span>
              <span>{formatearFecha(fechaSeleccionada)}</span>
            </div>

            {horaSeleccionada && (
              <div className='info-item'>
                <span className='info-label'>Horario:</span>
                <span>{formatearHora(horaSeleccionada)} hrs</span>
              </div>
            )}
            <div className='info-item'>
              <span className='info-label'>Duración:</span>
              <span>1 h 00 min</span>
            </div>
            <div className='info-item'>
              <span className='info-label'>Ubicación:</span>
              <span>C. French 414</span>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <Button
              variant='contained'
              loading={isPending}
              disabled={isPending || !horaSeleccionada}
              onClick={() =>
                createReserve({
                  fechaSeleccionada,
                  horaSeleccionada,
                  serviceId: response?.data?.id,
                })
              }
            >
              Confirmar Reserva
            </Button>
            <Button variant='outlined' onClick={() => navigate(-1)}>
              Volver
            </Button>
          </div>
        </div>
      </div>
    </ContainerServices>
  );
};

export default Reservar;
