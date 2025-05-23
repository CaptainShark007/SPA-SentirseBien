import './servicios.css';
import ContainerServices from '@components/ContainerServices/ContainerServices';
import SpinnerLoading from '@components/SpinnerLoading/SpinnerLoading';
import { useApiListSpa } from '@features/hooks/useApiListSpa';
import Categoria from '@screens/Servicios/components/Categoria/Categoria';
import { Outlet, useNavigate } from 'react-router';

const Servicios = () => {
  const navigate = useNavigate();

  const { data: listSpa, isLoading } = useApiListSpa();

  if (isLoading) return <SpinnerLoading />;

  const handleSelect = (categoria: string) =>
    navigate(`/servicios/${categoria}`);

  const categorias = Array.from(
    new Map(listSpa?.data.map((item) => [item.category, item])).values()
  );
  return (
    <ContainerServices title='Nuestros Servicios'>
      <div className='categorias'>
        {categorias?.map((categoria) => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
            categoriaSeleccionada={handleSelect}
          />
        ))}
      </div>
      <Outlet />
    </ContainerServices>
  );
};

export default Servicios;
