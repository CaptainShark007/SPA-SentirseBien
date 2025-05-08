import { useParams } from 'react-router';
import './reservas.css';
import { useApiListUserReserve } from '@features/user/user.query';
import Item from '@screens/Reservas/components/Item';

const Reservas = () => {
  // hooks
  const params = useParams<{ idUser: string }>();
  //   apis
  const { data: response, isLoading } = useApiListUserReserve(
    Number(params.idUser)
  );
  return (
    <section className='container-reservas'>
      {isLoading ? (
        <div className='container-spinner'>
          <span className='spinner' />
          <p>Cargando información...</p>
        </div>
      ) : (
        <div className='reservas'>
          <div className='header'>
            <h3>Mis reservas</h3>
          </div>

          {response?.data?.reservations?.map((r, index: number) => {
            return <Item key={index} reserve={r} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Reservas;
