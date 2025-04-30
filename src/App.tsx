import './App.css';
import { useApiGetUser, useApiUpdateUser } from '@features/user/user.query';
import { useEffect, useState } from 'react';
import Snackbar from '@components/SnackBar/SnackBar';
import {
  useApiGetScheduleFilter,
  useApiListScheduleService,
} from './features/schedule/schedule.query';
import { useApiListSpa } from './features/spa/spa.query';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { SpaInfoData } from './features/spa/spa.types';
import { showSnackbar } from '@components/SnackBar/snackBar.slice';
import { CalendarioReserva } from '@components/Calendar/Calendario';
import { HorariosDisponibles } from '@components/Calendar/Horarios';
import { useApiCreateReserve } from './features/reserve/reserve.query';
import imagePath from '@constants/imagePath';
import Header from '@layout/public/Header/Header';
import Footer from '@layout/public/Footer/Footer';
import Auth from '@components/Auth/Auth';

const App = () => {
  const hoy = new Date();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  const { mutate: reserve } = useApiCreateReserve();
  const { data: response, refetch, isRefetching, isLoading } = useApiGetUser(1);
  const { mutate: updateUser } = useApiUpdateUser();

  const { data: listScheduleService, refetch: refetchListScheduleService } =
    useApiListScheduleService();

  const { data: listSpa, refetch: refetchListSpa } = useApiListSpa();

  const [servicio, setServicio] = useState<SpaInfoData | undefined>(undefined);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(
    hoy.toISOString().split('T')[0]
  );
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const formatearFecha = (fecha: string) => {
    const [anio, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${anio}`;
  };

  const formatearHora = (hora: string) => {
    return hora.slice(0, 5); // elimina los segundos
  };

  const {
    data: listSchedulFilter,
    refetch: refetchListScheduleFilter,
    isLoading: loadingList,
    isRefetching: isRefetchingList,
  } = useApiGetScheduleFilter(servicio?.id, fechaSeleccionada, 60);

  const [categoria, setCategoria] = useState<string | null>(null);
  const categoriaSeleccionada = (categoria: string) => {
    console.log('Categoría seleccionada:', categoria);
    setCategoria(categoria);
    refetchListSpa();

    const dataFiltrada = listSpa?.data?.filter(
      (item) => item.category == categoria
    );

    console.log('Data filtrada:', dataFiltrada);
    setOpenCategory(false);
    setOpenServices(true);
  };

  const [servicioo, setServicioo] = useState<SpaInfoData | undefined>(
    undefined
  );

  const servicioSeleccionado = (servicio: string) => {
    console.log('Servicio seleccionado:', servicio);

    const data = listSpa?.data?.find((item) => item.name == servicio);
    console.log(
      'find',
      listSpa?.data?.find((item) => item.name == servicio)
    );
    console.log('Servicio seleccionado data:', data);

    setServicioo(data);
    setServicio(data);
    setOpenServices(false);
    setOpenSchedule(true);
  };

  useEffect(() => {
    servicio && refetchListScheduleFilter();
  }, [refetchListScheduleFilter, servicio]);
  console.log('todos los dias de un servicio', listSchedulFilter);

  const [openModal, setOpenModal] = useState(false);
  const [openCategory, setOpenCategory] = useState(true);
  const [openServices, setOpenServices] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);

  if (response) console.log('Response', response);
  if (listScheduleService)
    console.log('List Schedule Service', listScheduleService);

  const handleSubmitReserve = () => {
    if (!token) return setOpenModal(true);

    const data = {
      userId: 3,
      serviceId: servicio?.id,
      selectedTime: `${fechaSeleccionada}T${selectedHour}`,
    };
    console.log('data', data);
    reserve(data, {
      onSuccess: () => {
        dispatch(
          showSnackbar({
            type: 'success',
            duration: 3000,
            message: 'Reserva exitosa',
          })
        );
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

  return (
    <div>
      <Snackbar />
      {openModal && <Auth setOpenModal={setOpenModal} />}

      <Header setOpenModal={setOpenModal} />

      {openCategory && (
        <section id='servicios' className='servicios-container'>
          <h2>Servicios</h2>
          <div className='services'>
            <div
              className='service'
              style={{ backgroundImage: `url(${imagePath.masaje})` }}
              onClick={() => categoriaSeleccionada('MASAJES')}
            >
              <div className='overlay'></div>
              <h3>Masajes</h3>
              <p>
                Relajá cuerpo y mente con masajes que alivian tensiones y
                renuevan tu energía.
              </p>
            </div>

            <div
              className='service'
              style={{ backgroundImage: `url(${imagePath.belleza})` }}
              onClick={() => categoriaSeleccionada('BELLEZA')}
            >
              <div className='overlay'></div>
              <h3>Belleza</h3>
              <p>
                Resaltá tu belleza natural con cuidados estéticos pensados para
                vos.
              </p>
            </div>

            <div
              className='service'
              style={{ backgroundImage: `url(${imagePath.facial})` }}
              onClick={() => categoriaSeleccionada('TRATAMIENTOS FACIALES')}
            >
              <div className='overlay'></div>
              <h3>Tratamientos Faciales</h3>
              <p>
                Renová tu piel con limpieza profunda, hidratación y luminosidad
                saludable.
              </p>
            </div>

            <div
              className='service'
              style={{ backgroundImage: `url(${imagePath.corporal})` }}
              onClick={() => categoriaSeleccionada('TRATAMIENTOS CORPORALES')}
            >
              <div className='overlay'></div>
              <h3>Tratamientos Corporales</h3>
              <p>
                Mejorá la textura y firmeza de tu piel con nuestros rituales
                corporales.
              </p>
            </div>

            <div
              className='service'
              style={{ backgroundImage: `url(${imagePath.grupal})` }}
              onClick={() => categoriaSeleccionada('SERVICIOS GRUPALES')}
            >
              <div className='overlay'></div>
              <h3>Servicios Grupales</h3>
              <p>
                Compartí momentos únicos de bienestar con quienes más querés.
              </p>
            </div>
          </div>
        </section>
      )}

      {openServices && (
        <section id='servicios-lista' className='servicios-container'>
          <h2>Nuestros Tratamientos</h2>

          {categoria == 'MASAJES' && (
            <div className='categoria-servicio'>
              <div className='header'>
                <div />
                <h3>MASAJES</h3>
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
              {/* Tratamientos */}
              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Anti-Stress</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Anti-stress')}
                  >
                    Reservar
                  </button>
                </div>
              </div>
              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Descontracturante</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Descontracturantes')}
                  >
                    Reservar
                  </button>
                </div>
              </div>
              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Masajes con piedras calientes</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() =>
                      servicioSeleccionado('Masajes con piedras calientes')
                    }
                  >
                    Reservar
                  </button>
                </div>
              </div>
              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Circulatorios</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Circulatorios')}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          )}

          {categoria == 'BELLEZA' && (
            <div className='categoria-servicio'>
              <div className='header'>
                <div />
                <h3>BELLEZA</h3>
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
              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Lifting de pestañas</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Lifting de pestaña')}
                  >
                    Reservar
                  </button>
                </div>
              </div>

              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Depilación facial</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Depilación facial')}
                  >
                    Reservar
                  </button>
                </div>
              </div>

              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Belleza de manos y pies</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() =>
                      servicioSeleccionado('Belleza de manos y pies')
                    }
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          )}

          {categoria == 'TRATAMIENTOS FACIALES' && (
            <div className='categoria-servicio'>
              <div className='header'>
                <div />
                <h3>TRATAMIENTOS FACIALES</h3>

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
              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Punta de diamante: microexfoliación</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Punta de diamante')}
                  >
                    Reservar
                  </button>
                </div>
              </div>

              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Limpieza profunda + Hidratación</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() =>
                      servicioSeleccionado('Limpieza profunda + hidratación')
                    }
                  >
                    Reservar
                  </button>
                </div>
              </div>

              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Crio frecuencia facial</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() =>
                      servicioSeleccionado('Crio frecuencia facial')
                    }
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          )}

          {categoria == 'TRATAMIENTOS CORPORALES' && (
            <div className='categoria-servicio'>
              <div className='header'>
                <div />
                <h3>TRATAMIENTOS CORPORALES</h3>

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
              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>VelaSlim</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('VelaSlim')}
                  >
                    Reservar
                  </button>
                </div>
              </div>

              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>DermoHealth</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('DermoHealth')}
                  >
                    Reservar
                  </button>
                </div>
              </div>

              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Criofrecuencia</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Criofrecuencia')}
                  >
                    Reservar
                  </button>
                </div>
              </div>

              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Ultracavitación</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Ultracavitación')}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          )}
          {categoria == 'SERVICIOS GRUPALES' && (
            <div className='categoria-servicio'>
              <div className='header'>
                <div />
                <h3>SERVICIOS GRUPALES</h3>

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
              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Hidromasajes</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Hidromasajes')}
                  >
                    Reservar
                  </button>
                </div>
              </div>

              <div className='servicio-item'>
                <div className='servicio-info'>
                  <h4>Yoga</h4>
                  <a className='mas-info'>Más información</a>
                </div>
                <div className='servicio-accion'>
                  <button
                    className='btn-reservar'
                    onClick={() => servicioSeleccionado('Yoga')}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {openSchedule && !loadingList && !isRefetchingList && (
        <section id='reservas' className='reserva-container'>
          <h2>Reserva tu cita en nuestro SPA</h2>

          <div className='reserva-grid'>
            {/* Sección del Calendario */}

            <CalendarioReserva
              fechaSeleccionada={fechaSeleccionada}
              setFechaSeleccionada={setFechaSeleccionada}
              setSelectedHour={setSelectedHour}
            />
            {/* <div className='reserva-seccion'>
              <div className='calendario-spa'>
                <div className='calendario-header'>
                  <h3>Abril 2025</h3>
                </div>
                <div className='calendario-dias-semana'>
                  <span>Do</span>
                  <span>Lu</span>
                  <span>Ma</span>
                  <span>Mi</span>
                  <span>Ju</span>
                  <span>Vi</span>
                  <span>Sá</span>
                </div>
                <div className='calendario-grid'>
                  <span className='calendario-vacio'></span>
                  <span className='calendario-vacio'></span>
                  <span className='calendario-vacio'></span>
                  <span className='calendario-dia pasado'>1</span>
                  <span className='calendario-dia pasado'>2</span>
                  <span className='calendario-dia pasado'>3</span>
                  <span className='calendario-dia pasado'>4</span>
                  <span className='calendario-dia pasado'>5</span>
                  <span className='calendario-dia pasado'>6</span>
                  <span className='calendario-dia pasado'>7</span>
                  <span className='calendario-dia pasado'>8</span>
                  <span className='calendario-dia pasado'>9</span>
                  <span className='calendario-dia pasado'>10</span>
                  <span className='calendario-dia pasado'>11</span>
                  <span className='calendario-dia pasado'>12</span>
                  <span className='calendario-dia pasado'>13</span>
                  <span className='calendario-dia pasado'>14</span>
                  <span className='calendario-dia pasado'>15</span>
                  <span className='calendario-dia pasado'>16</span>
                  <span className='calendario-dia pasado'>17</span>
                  <span className='calendario-dia pasado'>18</span>
                  <span className='calendario-dia pasado'>19</span>
                  <span className='calendario-dia pasado'>20</span>
                  <span className='calendario-dia pasado'>21</span>
                  <span className='calendario-dia pasado'>22</span>
                  <span className='calendario-dia hoy'>23</span>
                  <span className='calendario-dia'>24</span>
                  <span className='calendario-dia'>25</span>
                  <span className='calendario-dia'>26</span>
                  <span className='calendario-dia'>27</span>
                  <span className='calendario-dia'>28</span>
                  <span className='calendario-dia'>29</span>
                  <span className='calendario-dia'>30</span>
                </div>
              </div>
            </div> */}

            <HorariosDisponibles
              selectedDate={fechaSeleccionada}
              schedules={listSchedulFilter?.data}
              selectedHour={selectedHour}
              setSelectedHour={setSelectedHour}
            />

            {/* <div className='reserva-seccion'>
              <div className='horarios-container'>
                <h3>Horarios disponibles</h3>
                <div className='zona-horaria'>
                  <span>Zona horaria: Hora estándar central (GMT-6)</span>
                </div>
                <div className='horarios-grid'>
                  <button className='hora-btn no-disponible'>08:00 a.m.</button>
                  <button className='hora-btn'>10:00 a.m.</button>
                  <button className='hora-btn'>12:00 a.m.</button>
                  <button className='hora-btn no-disponible'>14:00 a.m.</button>
                  <button className='hora-btn'>16:00 p.m.</button>
                  <button className='hora-btn'>18:30 p.m.</button>
                  <button className='hora-btn'>20:00 p.m.</button>
                  <button className='hora-btn no-disponible'>22:00 p.m.</button>
                </div>
              </div>
            </div> */}

            <div className='reserva-seccion'>
              <div className='datos-reserva'>
                <h3>Detalles de la reserva</h3>
                <div className='reserva-info'>
                  <div className='info-item'>
                    <span className='info-label'>Servicio:</span>
                    <span>{servicioo?.name}</span>
                  </div>

                  <div className='info-item'>
                    <span className='info-label'>Fecha:</span>
                    <span>{formatearFecha(fechaSeleccionada)}</span>
                  </div>

                  {selectedHour && (
                    <div className='info-item'>
                      <span className='info-label'>Horario:</span>
                      <span>{formatearHora(selectedHour)} hrs</span>
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
                  {/* <div className="info-item">
                  <span className="info-label">Precio:</span>
                  <span>$10</span>
                </div> */}
                </div>
                <button className='btn-confirmar' onClick={handleSubmitReserve}>
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default App;
