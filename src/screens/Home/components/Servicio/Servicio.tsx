import Button from '@components/Button/Button';
import './servicio.css';

interface ServicioProps {
  servicio: { key: string; title: string };
  servicioSeleccionado: (_servicio: string) => void;
}

const Servicio = ({ servicio, servicioSeleccionado }: ServicioProps) => {
  const { name } = servicio;

  console.log('servicio', servicio);
  return (
    <div className='servicio-item'>
      <div className='servicio-info'>
        <h4>{name}</h4>
        <a className='mas-info'>Más información</a>
      </div>
      <div className='servicio-accion'>
        <Button
          variant='contained'
          onClick={() => servicioSeleccionado(servicio)}
        >
          Reservar
        </Button>
      </div>
    </div>
  );
};

export default Servicio;
