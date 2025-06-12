import Button from '@components/Button/Button';
import { SpaInfoData } from '@features/types/serviceSpa.types';
import styles from '@screens/Tratamientos/components/Servicio/Servicio.module.css';

interface ServicioProps {
  servicio: SpaInfoData;
  servicioSeleccionado: (servicio: SpaInfoData) => void;
}

const Servicio = ({ servicio, servicioSeleccionado }: ServicioProps) => {
  const { name } = servicio;

  return (
    <div className={styles['servicio-item']}>
      <div className={styles['servicio-info']}>
        <h4>{name}</h4>
        <a>Más información</a>
      </div>
      <div className={styles['servicio-accion']}>
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
