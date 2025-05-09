import Button from '@components/Button/Button';
import './servicio.css';
import { SpaInfoData } from '@features/types/serviceSpa.types';

interface ServicioProps {
  servicio: SpaInfoData;
  servicioSeleccionado: (servicio: SpaInfoData) => void;
}

const Servicio = ({ servicio, servicioSeleccionado }: ServicioProps) => {
  const { name } = servicio;

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
