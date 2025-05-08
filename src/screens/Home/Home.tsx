import './Home.css';
import { useState } from 'react';
import { useApiGetScheduleFilter } from '@features/schedule/schedule.query';
import { useApiListSpa } from '@features/spa/spa.query';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { SpaInfoData } from '@features/spa/spa.types';
import { showSnackbar } from '@components/SnackBar/snackBar.slice';
import Calendario from '@screens/Home/components/Calendario/Calendario';
import { HorariosDisponibles } from '@screens/Home/components/Horario/Horario';
import { useApiCreateReserve } from '@features/reserve/reserve.query';
import imagePath from '@constants/imagePath';
import Categoria from '@screens/Home/components/Categoria/Categoria';
import Servicio from '@screens/Home/components/Servicio/Servicio';
import { openModal } from '@components/ModalRenderer/modal.slice';
import Button from '@components/Button/Button';

const Home = () => {
  // hooks
  const dispatch = useAppDispatch();
  const { token, idUser } = useAppSelector((state) => state.auth);

  // consts
  const hoy = new Date();
  const fechaMinima = new Date(hoy);
  fechaMinima.setDate(hoy.getDate() + 4);

  // states
  const [categoria, setCategoria] = useState<string | null>(null);
  const [servicio, setServicio] = useState<SpaInfoData | undefined>(undefined);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>(
    fechaMinima.toISOString().split('T')[0]
  );
  const [horaSeleccionada, setHoraSeleccionada] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState(true);
  const [openServices, setOpenServices] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);

  // apis
  const { mutate: reserve, isPending } = useApiCreateReserve();
  const { data: listSpa } = useApiListSpa();

  const {
    mutate: refetchListScheduleFilter,
    data: listSchedulFilter,
    isPending: isPendingListScheduleFilter,
    reset: resetListScheduleFilter,
  } = useApiGetScheduleFilter();

  const mostrarSpinner =
    openSchedule && (isPendingListScheduleFilter || !listSchedulFilter?.data);

  // arrow functions
  const formatearFecha = (fecha: string) => {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  };
  const formatearHora = (hora: string) => {
    return hora.slice(0, 5);
  };
  const categoriaSeleccionada = (categoria: string) => {
    setCategoria(categoria);
    setOpenCategory(false);
    setOpenServices(true);
  };
  const servicioSeleccionado = (servicio) => {
    setServicio(servicio);
    setOpenServices(false);
    setOpenSchedule(true);

    refetchListScheduleFilter({
      id: servicio?.id,
      date: fechaSeleccionada,
      days: 60,
    });
  };

  // handles
  const handleSubmitReserve = () => {
    if (!token) return dispatch(openModal({ type: 'AUTH' }));

    const data = {
      userId: idUser,
      serviceId: servicio?.id,
      selectedTime: `${fechaSeleccionada}T${horaSeleccionada}`,
    };

    reserve(data, {
      onSuccess: () => {
        dispatch(
          showSnackbar({
            type: 'success',
            duration: 3000,
            message: 'Reserva exitosa',
          })
        );
        setFechaSeleccionada(fechaMinima.toISOString().split('T')[0]);
        setHoraSeleccionada(null);
        setCategoria(null);
        setServicio(undefined);
        setOpenSchedule(false);
        setOpenCategory(true);
      },
      onError: () => {
        dispatch(
          showSnackbar({
            type: 'error',
            duration: 3000,
            message: 'Error al reservar',
          })
        );
      },
    });
  };

  const handleCloseReserve = () => {
    resetListScheduleFilter();
    setServicio(undefined);
    setOpenServices(true);
    setOpenSchedule(false);
    setFechaSeleccionada(fechaMinima.toISOString().split('T')[0]);
    setHoraSeleccionada(null);
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
              .filter((c) => c.category === categoria)
              ?.map((s, index: number) => (
                <Servicio
                  key={index}
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
                selectedDate={fechaSeleccionada}
                schedules={listSchedulFilter?.data}
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
                    onClick={handleSubmitReserve}
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
      ' Relajá cuerpo y mente con masajes que alivian tensiones y renuevan tu energía.',
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
];
