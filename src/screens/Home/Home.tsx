import Button from '@components/Button/Button';
import Carousel from '@screens/Home/components/carousel/Carousel';
import styles from '@screens/Home/Home.module.css';
import { useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className={styles['spa-container']}>
        <div className={`${styles['spa-image']} ${styles.uno}`} />
        <div className={styles['spa-content']}>
          <h2 className={styles['spa-title']}>Un Entorno Pacífico</h2>
          <p className={styles['spa-description']}>
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

      <div className={styles['divider']} />

      <section className={styles['testimonial-container']}>
        <h2 className={styles['spa-title']}>Testimonios</h2>

        <Carousel />

        <div className={`${styles['spa-image']} ${styles.dos}`} />
      </section>

      <div className={styles['divider']} />

      <section className={styles['spa-fixed-background']}>
        <div className={styles['spa-background-container']}>
          <h2 className={styles['spa-title']}>Horarios de Atención</h2>
          <h3>Lunes a Viernes</h3>
          <h3>Sábados</h3>
          <p>08:00 - 20:00</p>
          <p>08:00 - 12:00</p>
        </div>
      </section>

      <div className={styles['divider']} />

      <section className={styles['testimonial-container']}>
        <h2 className={styles['spa-title']}>Contactanos</h2>

        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d442.57303807423506!2d-58.979142635310595!3d-27.451063034790945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f50.1!3m3!1m2!1s0x94450cf0c80be0d3%3A0xc9f9278c74810912!2sUTN%20-%20Facultad%20Regional%20Resistencia!5e0!3m2!1ses!2sar!4v1748273628460!5m2!1ses!2sar'
          height='500'
          width='100%'
          style={{ border: '0' }}
          allowFullScreen
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        />

        <div className={styles['contacto']}>
          <h3>Datos</h3>
          <h4>Dirección</h4>
          <p>Calle French 414</p>
          <h4>Teléfono</h4>
          <p>+54 9 362-4123456</p>
          <h4>Email</h4>
          <p>contacto@sentirsebienspa.com</p>
        </div>
      </section>
    </>
  );
};

export default Home;
