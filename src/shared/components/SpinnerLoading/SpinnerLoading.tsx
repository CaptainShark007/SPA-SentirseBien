import styles from '@components/SpinnerLoading/SpinnerLoading.module.css';

const SpinnerLoading = () => {
  return (
    <div className={styles['container-spinner']}>
      <span className={styles['spinner']} />
      <p>Cargando información...</p>
    </div>
  );
};
export default SpinnerLoading;
