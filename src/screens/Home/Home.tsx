import Button from '@components/Button/Button';
import './Home.css';
import Carousel from '@screens/Home/components/carousel/Carousel';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className='spa-container'>
        <div className='spa-image uno' />
        <div className='spa-content'>
          <h1 className='spa-title'>UN ENTORNO PACÍFICO</h1>
          <p className='spa-description'>
            Sumérgete en un refugio de serenidad, donde el sonido suave del agua
            fluyendo y el aroma delicado de esencias naturales envuelven cada
            espacio. En nuestro spa, el tiempo se detiene y la paz se convierte
            en tu mejor compañía. Rodeado de tonos cálidos y luces suaves, cada
            rincón está diseñado para brindarte una sensación de bienestar
            absoluto.
          </p>
          <Button variant='contained' onClick={() => navigate(`/servicios`)}>
            Reservar un tratamiento
          </Button>
        </div>
      </section>

      <div className='divider' />

      <section className='testimonial-container'>
        <h1 className='spa-title'>TESTIMONIOS</h1>

        <Carousel />

        <div className='spa-image dos' />
      </section>

      <section className='spa-fixed-background'>
        <div className='spa-background-container'>
          <h1 className='spa-title'>HORARIOS DE ATENCIÓN</h1>
          <span className='spa-dias'>Lunes a Viernes</span>
          <span className='spa-dias'>Sábados</span>
          <span>08:00 - 20:00</span>
          <span>08:00 - 12:00</span>
        </div>
      </section>
    </>
  );
};

export default Home;
