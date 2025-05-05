import './servicio.css';

interface ServicioProps {
  servicio: { key: string; title: string };
  servicioSeleccionado: (_servicio: string) => void;
}

const Servicio = ({ servicio, servicioSeleccionado }: ServicioProps) => {
  const { key, title } = servicio;

  return (
    <div className='servicio-item'>
      <div className='servicio-info'>
        <h4>{title}</h4>
        <a className='mas-info'>Más información</a>
      </div>
      <div className='servicio-accion'>
        <button
          className='btn-reservar'
          onClick={() => servicioSeleccionado(key)}
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default Servicio;
