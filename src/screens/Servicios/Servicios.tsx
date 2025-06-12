import ContainerServices from '@components/Containers/ContainerServices/ContainerServices';
import imagePath from '@constants/imagePath';
import styles from '@screens/Servicios/Servicios.module.css';
import { Outlet, useNavigate } from 'react-router';

const Servicios = () => {
  const navigate = useNavigate();
  const handleSelect = (categoria: string) =>
    navigate(`/servicios/${categoria}`);

  return (
    <ContainerServices title='Nuestros Servicios'>
      <div className={styles['categorias']}>
        <div
          className={styles['service']}
          style={{ backgroundImage: `url(${imagePath.masaje})` }}
          onClick={() => handleSelect('MASAJE')}
        >
          <div className={styles['overlay']}></div>
          <h3>Masajes</h3>
          <p>
            Relajá cuerpo y mente con masajes que alivian tensiones y renuevan
            tu energía.
          </p>
        </div>

        <div
          className={styles['service']}
          style={{ backgroundImage: `url(${imagePath.belleza})` }}
          onClick={() => handleSelect('BELLEZA')}
        >
          <div className={styles['overlay']}></div>
          <h3>Belleza</h3>
          <p>
            Resaltá tu belleza natural con cuidados estéticos pensados para vos.
          </p>
        </div>

        <div
          className={styles['service']}
          style={{ backgroundImage: `url(${imagePath.facial})` }}
          onClick={() => handleSelect('TRATAMIENTOS FACIALES')}
        >
          <div className={styles['overlay']}></div>
          <h3>Tratamientos Faciales</h3>
          <p>
            Renová tu piel con limpieza profunda, hidratación y luminosidad
            saludable.
          </p>
        </div>

        <div
          className={styles['service']}
          style={{ backgroundImage: `url(${imagePath.corporal})` }}
          onClick={() => handleSelect('TRATAMIENTOS CORPORALES')}
        >
          <div className={styles['overlay']}></div>
          <h3>Tratamientos Corporales</h3>
          <p>
            Mejorá la textura y firmeza de tu piel con nuestros rituales
            corporales.
          </p>
        </div>

        <div
          className={styles['service']}
          style={{ backgroundImage: `url(${imagePath.grupal})` }}
          onClick={() => handleSelect('GRUPALES')}
        >
          <div className={styles['overlay']}></div>
          <h3>Servicios Grupales</h3>
          <p>Compartí momentos únicos de bienestar con quienes más querés.</p>
        </div>
      </div>
      <Outlet />
    </ContainerServices>
  );
};

export default Servicios;
