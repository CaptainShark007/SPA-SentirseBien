import Item from '@screens/Reservas/components/Item';
import { useApiListUserReserve } from '@features/hooks/useApiListUserReserve';
import styles from '@screens/Reservas/Reservas.module.css';
import SpinnerLoading from '@components/SpinnerLoading/SpinnerLoading';

const Reservas = () => {
  const { data: response, isLoading } = useApiListUserReserve();

  if (isLoading) return <SpinnerLoading />;
  return (
    <section className={styles['container-reservas']}>
      <div className={styles['reservas']}>
        <div className={styles['header']}>
          <h3>Mis reservas</h3>
        </div>
        {(response?.data?.reservations ?? []).length == 0 ? (
          <h3>No tiene reservas realizadas</h3>
        ) : (
          response?.data?.reservations?.map((r) => (
            <Item key={r.reserveId} reserve={r} />
          ))
        )}
      </div>
    </section>
  );
};

export default Reservas;
