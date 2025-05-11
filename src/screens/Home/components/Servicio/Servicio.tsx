// Servicio.tsx
/* import Button from '@components/Button/Button';
import './servicio.css';
import { SpaInfoData } from '@features/types/serviceSpa.types';

interface ServicioProps {
  servicio: SpaInfoData;
  servicioSeleccionado: (servicio: SpaInfoData) => void;
}

const Servicio = ({ servicio, servicioSeleccionado }: ServicioProps) => {
  const { name, description, duration, price } = servicio;

  return (
    <div className='servicio-card'>
      <div className='servicio-header'>
        <h3>{name}</h3>
        <div className='servicio-duration'>{duration}</div>
      </div>
      <p className='servicio-description'>{description}</p>
      <div className='servicio-footer'>
        <div className='servicio-price'>{price} €</div>
        <Button
          variant='contained'
          onClick={() => servicioSeleccionado(servicio)}
        >
          Reservar ahora
        </Button>
      </div>
    </div>
  );
};

export default Servicio; */

import Button from '@components/Button/Button';
import './servicio.css';
//import { SpaInfoData } from '@features/types/serviceSpa.types';
import imagePath from '@constants/imagePath';

const Servicio = ({ servicio, servicioSeleccionado }: ServicioProps) => {
  const { name, description, duration, price, category } = servicio;
  
  // Mapeo de categorías a imágenes
  const getCategoryImage = (cat: string) => {
    switch(cat) {
      case 'MASAJE': return imagePath.masaje;
      case 'BELLEZA': return imagePath.belleza;
      case 'TRATAMIENTOS FACIALES': return imagePath.facial;
      case 'TRATAMIENTOS CORPORALES': return imagePath.corporal;
      case 'GRUPALES': return imagePath.grupal;
      default: return imagePath.masaje;
    }
  };

  return (
    <div className='servicio-card'>
      <div className='servicio-content'>
        <div className='servicio-image' style={{ backgroundImage: `url(${getCategoryImage(category)})` }}></div>
        <div className='servicio-details'>
          <div className='servicio-header'>
            <h3>{name}</h3>
            <div className='servicio-duration'>{duration}</div>
          </div>
          <p className='servicio-description'>{description}</p>
        </div>
      </div>
      <div className='servicio-footer'>
        <div className='servicio-price'>$ {price}</div>
        <Button
          variant='contained'
          onClick={() => servicioSeleccionado(servicio)}
        >
          Reservar ahora
        </Button>
      </div>
    </div>
  );
};

export default Servicio;