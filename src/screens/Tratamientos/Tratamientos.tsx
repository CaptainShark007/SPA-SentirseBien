import ContainerServices from '@components/Containers/ContainerServices/ContainerServices';
import { useNavigate, useParams } from 'react-router';
import { useApiListSpa } from '@features/hooks/useApiListSpa';
import SpinnerLoading from '@components/SpinnerLoading/SpinnerLoading';
import Button from '@components/Button/Button';
import Servicio from '@screens/Tratamientos/components/Servicio/Servicio';
import { SpaInfoData } from '@features/types/serviceSpa.types';
import { useQueryClient } from '@tanstack/react-query';
import styles from '@screens/Tratamientos/Tratamientos.module.css';

const Tratamientos = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data: listSpa, isLoading } = useApiListSpa();

  if (isLoading) return <SpinnerLoading />;

  const handleSelect = (categoria: SpaInfoData) => {
    queryClient.removeQueries({ queryKey: ['availability'] });
    queryClient.removeQueries({ queryKey: ['getService'] });
    navigate(`/servicios/${categoria.category}/${categoria.id}`);
  };

  return (
    <ContainerServices title='Nuestros Tratamientos'>
      <div className={styles['servicios']}>
        <div className={styles['header']}>
          <div />
          <h3>{categoria}</h3>
          <Button
            variant='outlined'
            onClick={() => {
              navigate(-1);
            }}
          >
            Volver
          </Button>
        </div>

        {listSpa?.data
          ?.filter((c) => c.category === categoria)
          ?.map((s) => (
            <Servicio
              key={s.id}
              servicio={s}
              servicioSeleccionado={handleSelect}
            />
          ))}
      </div>
    </ContainerServices>
  );
};

export default Tratamientos;
