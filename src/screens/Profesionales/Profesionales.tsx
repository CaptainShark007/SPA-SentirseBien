import Button from '@components/Button/Button';
import ContainerServices from '@components/Containers/ContainerServices/ContainerServices';
import SpinnerLoading from '@components/SpinnerLoading/SpinnerLoading';
import { useApiListProfessional } from '@features/hooks/useApiListProfessional';
import { ProfessionalData } from '@features/types/serviceSpa.types';
import styles from '@screens/Profesionales/Profesionales.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';

const Profesionales = () => {
  const { data: listProfessional, isLoading } = useApiListProfessional();
  const { categoria } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSelect = (p: ProfessionalData) => {
    console.log('seleccionado', p);
    queryClient.removeQueries({ queryKey: ['availability'] });
    queryClient.removeQueries({ queryKey: ['getService'] });
    navigate(`/servicios/${categoria}/${p.id}`);
  };

  if (isLoading) return <SpinnerLoading />;
  return (
    <ContainerServices title='Nuestros Expertos'>
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

        {listProfessional?.data
          ?.filter((f) => f.specialty === categoria)
          ?.map((p) => (
            <div key={p.id} className={styles['servicio-item']}>
              <div className={styles['servicio-info']}>
                <h4>
                  {p.lastName}, {p.firstName}
                </h4>
              </div>
              <div className={styles['servicio-accion']}>
                <Button variant='contained' onClick={() => handleSelect(p)}>
                  Seleccionar Profesional
                </Button>
              </div>
            </div>
          ))}
      </div>
    </ContainerServices>
  );
};

export default Profesionales;
