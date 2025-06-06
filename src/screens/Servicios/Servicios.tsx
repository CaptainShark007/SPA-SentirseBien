import './servicios.css';
import ContainerServices from '@components/ContainerServices/ContainerServices';
import SpinnerLoading from '@components/SpinnerLoading/SpinnerLoading';
import imagePath from '@constants/imagePath';
import { useApiListSpa } from '@features/hooks/useApiListSpa';
// import Categoria from '@screens/Servicios/components/Categoria/Categoria';
import { Outlet, useNavigate } from 'react-router';

const Servicios = () => {
  const navigate = useNavigate();

  const { isLoading } = useApiListSpa();

  if (isLoading) return <SpinnerLoading />;

  const handleSelect = (categoria: string) =>
    navigate(`/servicios/${categoria}`);

  // const categorias = Array.from(
  //   new Map(listSpa?.data.map((item) => [item.category, item])).values()
  // );
  return (
    <ContainerServices title='Nuestros Servicios'>
      <div className='categorias'>
        {/* {categorias?.map((categoria) => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
            categoriaSeleccionada={handleSelect}
          />
        ))} */}

        <div className='categorias'>
          <div
            className='service'
            style={{ backgroundImage: `url(${imagePath.masaje})` }}
            onClick={() => handleSelect('MASAJE')}
          >
            <div className='overlay'></div>
            <h3>Masajes</h3>
            <p>
              Relajá cuerpo y mente con masajes que alivian tensiones y renuevan
              tu energía.
            </p>
          </div>

          <div
            className='service'
            style={{ backgroundImage: `url(${imagePath.belleza})` }}
            onClick={() => handleSelect('BELLEZA')}
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
            onClick={() => handleSelect('TRATAMIENTOS FACIALES')}
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
            onClick={() => handleSelect('TRATAMIENTOS CORPORALES')}
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
            onClick={() => handleSelect('GRUPALES')}
          >
            <div className='overlay'></div>
            <h3>Servicios Grupales</h3>
            <p>Compartí momentos únicos de bienestar con quienes más querés.</p>
          </div>
        </div>
      </div>
      <Outlet />
    </ContainerServices>
  );
};

export default Servicios;
