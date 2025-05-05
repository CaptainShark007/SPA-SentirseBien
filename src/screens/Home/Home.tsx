import './Home.css';
import { useApiGetUser, useApiUpdateUser } from '@features/user/user.query';
import { useEffect, useState } from 'react';
import {
  useApiGetScheduleFilter,
  useApiListScheduleService,
} from '@features/schedule/schedule.query';
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

const Home = () => {
  // hooks
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

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
  const { data: response, refetch, isRefetching, isLoading } = useApiGetUser(1);
  const { mutate: updateUser } = useApiUpdateUser();
  const { data: listScheduleService, refetch: refetchListScheduleService } =
    useApiListScheduleService();
  const { data: listSpa, refetch: refetchListSpa } = useApiListSpa();
  const {
    data: listSchedulFilter,
    refetch: refetchListScheduleFilter,
    isLoading: loadingList,
    isRefetching: isRefetchingList,
  } = useApiGetScheduleFilter(servicio?.id, fechaSeleccionada, 60);

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
  const servicioSeleccionado = (servicio: string) => {
    const data = listSpa?.data.find((item) => item.name == servicio);

    setServicio(data);
    setOpenServices(false);
    setOpenSchedule(true);
  };

  // handles
  const handleSubmitReserve = () => {
    if (!token) return dispatch(openModal({ type: 'AUTH' }));

    const data = {
      userId: 3,
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

  useEffect(() => {
    servicio && refetchListScheduleFilter();
  }, [refetchListScheduleFilter, servicio]);

  return (
    <>
      {openCategory && (
        <section className='servicios-container'>
          <h2>Servicios</h2>

          <div className='services'>
            {categorias.map((categoria) => (
              <Categoria
                key={categoria.key}
                categoria={categoria}
                categoriaSeleccionada={categoriaSeleccionada}
              />
            ))}
          </div>
        </section>
      )}

      {openServices && (
        <section id='servicios-lista' className='servicios-container'>
          <h2>Nuestros Tratamientos</h2>

          <div className='categoria-servicio'>
            <div className='header'>
              <div />
              <h3>{categoria}</h3>
              <div style={{ alignItems: 'center', alignContent: 'center' }}>
                <button
                  className='btn-cancelar'
                  onClick={() => {
                    setOpenCategory(true);
                    setOpenServices(false);
                  }}
                >
                  Volver
                </button>
              </div>
            </div>

            {categorias
              .find((c) => c.key === categoria)
              ?.servicios.map((s) => (
                <Servicio
                  key={s.key}
                  servicio={s}
                  servicioSeleccionado={servicioSeleccionado}
                />
              ))}
          </div>
        </section>
      )}

      {openSchedule && !loadingList && !isRefetchingList && (
        <section id='reservas' className='reserva-container'>
          <h2>Reserva tu cita en nuestro SPA</h2>

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

            <div className='reserva-seccion'>
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
                  <button
                    className='btn-reservarr'
                    disabled={isPending}
                    onClick={handleSubmitReserve}
                  >
                    {isPending ? (
                      <span className='spinner'></span>
                    ) : (
                      'Confirmar Reserva'
                    )}
                  </button>
                  <button
                    id='volver'
                    className='btn-cancelar'
                    onClick={() => {
                      setOpenServices(true);
                      setOpenSchedule(false);
                      setFechaSeleccionada(
                        fechaMinima.toISOString().split('T')[0]
                      );
                      setHoraSeleccionada(null);
                    }}
                  >
                    Volver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;

const categorias = [
  {
    key: 'MASAJES',
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
    key: 'SERVICIOS GRUPALES',
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
