import './spinnerLoading.css';

const SpinnerLoading = () => {
  return (
    <div className='container-spinner'>
      <span className='spinner' />
      <p>Cargando información...</p>
    </div>
  );
};
export default SpinnerLoading;
