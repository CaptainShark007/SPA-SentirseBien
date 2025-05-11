import './Home.css';
import { useMemo, useState } from 'react';
import Calendario from '@screens/Home/components/Calendario/Calendario';
import { HorariosDisponibles } from '@screens/Home/components/Horario/Horario';
import imagePath from '@constants/imagePath';
import Categoria from '@screens/Home/components/Categoria/Categoria';
import Servicio from '@screens/Home/components/Servicio/Servicio';
import Button from '@components/Button/Button';
import { formatearFecha, formatearHora } from '@utils/format';
import { useApiCreateReserve } from '@features/hooks/useApiCreateReserve';
import { useApiAvailability } from '@features/hooks/useApiAvailability';
import { useQueryClient } from '@tanstack/react-query';
import { useApiListSpa } from '@features/hooks/useApiListSpa';
import { SpaInfoData } from '@features/types/serviceSpa.types';

const Home = () => {
  const queryClient = useQueryClient();
  const fechaMinima = useMemo(() => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 4);
    return hoy;
  }, []);

  // states
  const [categoria, setCategoria] = useState<string | undefined>(undefined);
  const [servicio, setServicio] = useState<SpaInfoData | undefined>(undefined);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(
    fechaMinima.toISOString().split('T')[0]
  );
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | undefined>(
    undefined
  );
  const [openCategory, setOpenCategory] = useState(true);
  const [openServices, setOpenServices] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);

  // apis
  const { createReserve, isPending } = useApiCreateReserve();
  const { data: listSpa } = useApiListSpa();

  const {
    availability,
    data: listAvailability,
    isPending: isPendingAvailability,
  } = useApiAvailability();

  const mostrarSpinner =
    openSchedule && (isPendingAvailability || !listAvailability?.data);

  // arrow functions
  const categoriaSeleccionada = (categoria: string) => {
    setCategoria(categoria);
    setOpenCategory(false);
    setOpenServices(true);
  };
  const servicioSeleccionado = (servicio: SpaInfoData) => {
    setServicio(servicio);
    setOpenServices(false);
    setOpenSchedule(true);

    availability({
      id: servicio.id,
      date: fechaSeleccionada,
      days: 60,
    });
  };

  // handles
  const handleReserve = () => {
    setFechaSeleccionada(fechaMinima.toISOString().split('T')[0]);
    setHoraSeleccionada(undefined);
    setCategoria(undefined);
    setServicio(undefined);
    setOpenSchedule(false);
    setOpenCategory(true);
  };

  const handleCloseReserve = () => {
    queryClient.invalidateQueries({ queryKey: ['availability'] });
    setServicio(undefined);
    setOpenServices(true);
    setOpenSchedule(false);
    setFechaSeleccionada(fechaMinima.toISOString().split('T')[0]);
    setHoraSeleccionada(undefined);
  };

  return (
    <>
      <section className='container'>
        <h2>
          {openCategory
            ? 'Servicios'
            : openServices
              ? 'Nuestros Tratamientos'
              : !mostrarSpinner && 'Reserva tu cita en nuestro SPA'}
        </h2>

        {openCategory && (
          <div className='categorias'>
            {categorias.map((categoria) => (
              <Categoria
                key={categoria.key}
                categoria={categoria}
                categoriaSeleccionada={categoriaSeleccionada}
              />
            ))}
          </div>
        )}

        {openServices && (
          <div className='servicios'>
            <div className='header'>
              <div />
              <h3>{categoria}</h3>
              <Button
                variant='outlined'
                onClick={() => {
                  setOpenCategory(true);
                  setOpenServices(false);
                }}
              >
                Volver
              </Button>
            </div>

            {listSpa?.data
              ?.filter((c) => c.category === categoria)
              ?.map((s) => (
                <Servicio
                  key={s.id}
                  servicio={s}
                  servicioSeleccionado={servicioSeleccionado}
                />
              ))}
          </div>
        )}

        {mostrarSpinner ? (
          <div className='container-spinner'>
            <span className='spinner' />
            <p>Cargando información...</p>
          </div>
        ) : (
          openSchedule && (
            <div className='reserva-grid'>
              <Calendario
                fechaSeleccionada={fechaSeleccionada}
                setFechaSeleccionada={setFechaSeleccionada}
                setHoraSeleccionada={setHoraSeleccionada}
              />

              <HorariosDisponibles
                fechaSeleccionada={fechaSeleccionada}
                schedules={listAvailability?.data}
                horaSeleccionada={horaSeleccionada}
                setHoraSeleccionada={setHoraSeleccionada}
              />

              <div className='datos-reserva'>
                <h3>Detalles de la reserva</h3>
                <div className='reserva-info'>
                  <div className='info-item'>
                    <span className='info-label'>Servicio:</span>
                    <span>{servicio?.name}</span>
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
                        serviceId: servicio?.id,
                        handleCreateReserve: handleReserve,
                      })
                    }
                  >
                    Confirmar Reserva
                  </Button>
                  <Button variant='outlined' onClick={handleCloseReserve}>
                    Volver
                  </Button>
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default Home;

const categorias = [
  {
    key: 'MASAJE',
    title: 'Masajes',
    description:
      ' Relajá el cuerpo con masajes que alivian tensiones y renuevan tu energía.',
    imagePath: imagePath.masaje,
    servicios: [
      { key: 'Anti-stress', title: 'Anti-Stress' },
      { key: 'Descontracturantes', title: 'Descontracturante' },
      {
        key: 'Masajes con piedras calientes',
        title: 'Masajes con piedras calientes',
      },
      { key: 'Circulatorios', title: 'Circulatorios' },
    ],
  },
  {
    key: 'BELLEZA',
    title: 'Belleza',
    description:
      ' Resaltá tu belleza natural con cuidados estéticos pensados para vos.',
    imagePath: imagePath.belleza,
    servicios: [
      { key: 'Lifting de pestaña', title: 'Lifting de pestañas' },
      { key: 'Depilación facial', title: 'Depilación facial' },
      { key: 'Belleza de manos y pies', title: 'Belleza de manos y pies' },
    ],
  },
  {
    key: 'TRATAMIENTOS FACIALES',
    title: 'Tratamientos Faciales',
    description:
      'Renová tu piel con limpieza profunda, hidratación y luminosidad saludable.',
    imagePath: imagePath.facial,
    servicios: [
      {
        key: 'Punta de diamante',
        title: 'Punta de diamante: microexfoliación',
      },
      {
        key: 'Limpieza profunda + hidratación',
        title: 'Limpieza profunda + Hidratación',
      },
      { key: 'Crio frecuencia facial', title: 'Crio frecuencia facial' },
    ],
  },
  {
    key: 'TRATAMIENTOS CORPORALES',
    title: 'Tratamientos Corporales',
    description:
      'Mejorá la textura y firmeza de tu piel con nuestros rituales corporales.',
    imagePath: imagePath.corporal,
    servicios: [
      { key: 'VelaSlim', title: 'VelaSlim' },
      { key: 'DermoHealth', title: 'DermoHealth' },
      { key: 'Criofrecuencia', title: 'Criofrecuencia' },
      { key: 'Ultracavitación', title: 'Ultracavitación' },
    ],
  },
  {
    key: 'GRUPALES',
    title: 'Servicios Grupales',
    description:
      'Compartí momentos únicos de bienestar con quienes más querés.',
    imagePath: imagePath.grupal,
    servicios: [
      { key: 'Hidromasajes', title: 'Hidromasajes' },
      { key: 'Yoga', title: 'Yoga' },
    ],
  },
  {
    key: 'GRUPALES',
    title: 'Servicios Grupales',
    description:
      'Compartí momentos únicos de bienestar con quienes más querés.',
    imagePath: imagePath.grupal,
    servicios: [
      { key: 'Hidromasajes', title: 'Hidromasajes' },
      { key: 'Yoga', title: 'Yoga' },
    ],
  },
];
  
