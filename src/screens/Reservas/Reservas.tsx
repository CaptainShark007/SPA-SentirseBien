import './reservas.css';
import Item from '@screens/Reservas/components/Item';
import { useApiListUserReserve } from '@features/hooks/useApiListUserReserve';

const Reservas = () => {
  const { data: response, isLoading } = useApiListUserReserve();

  return (
    <section className='container-reservas'>
      {isLoading ? (
        <div className='container-spinner'>
          <span className='spinner' />
          <p>Cargando información...</p>
        </div>
      ) : (response?.data?.reservations ?? []).length == 0 ? (
        <></>
      ) : (
        <div className='reservas'>
          <div className='header'>
            <h3>Mis reservas</h3>
          </div>

          {response?.data?.reservations?.map((r) => {
            return <Item key={r.reserveId} reserve={r} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Reservas;
