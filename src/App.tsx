import miLogo from './assets/logo.png';
import './App.css';
import NavBar from '@components/navbar/NavBar';
import { useDispatch } from 'react-redux';
import { useApiLogin, useApiRegister } from '@features/auth/auth.query';
import { setToken } from './features/auth/auth.slice';
import { useApiGetUser, useApiUpdateUser } from '@features/user/user.query';
import './App.css';
import masajeIMG from './assets/images/Masajes.jpg';
import bellezaIMG from './assets/images/belleza.jpg';
import facialIMG from './assets/images/tratamientos-faciales.jpg';
import corporalIMG from './assets/images/tratamiento-corporal.jpg';
import grupalIMG from './assets/images/grupal.jpg';

const App = () => {
  const dispatch = useDispatch();
  const { mutate: login } = useApiLogin();
  const { mutate: register } = useApiRegister();
  const { data: response, refetch, isRefetching, isLoading } = useApiGetUser(1);
  const { mutate: updateUser } = useApiUpdateUser();

  if (response) console.log('Response', response);

  return (
    <div>
      <header>
        <h1>Sentirse Bien</h1>

        {/* FLECHITA */}
        <div className='scroll-indicator'>
          <span className='arrow'>&#x25BC;</span>
        </div>
      </header>

      <nav>
        <a href='#servicios'>Servicios</a>
        <a href='#nosotros'>Nosotros</a>
        <a href='#contacto'>Contacto</a>
      </nav>

      <section id='servicios'>
        <h2>Servicios</h2>
        <div className='services'>
          <div
            className='service'
            style={{ backgroundImage: `url(${masajeIMG})` }}
          >
            <div className='overlay'></div>
            <h3>Masajes</h3>
            <p>
              Relajá cuerpo y mente con masajes que alivian tensiones y renuevan
              tu energía.
            </p>
          </div>

          <div
            className='service'
            style={{ backgroundImage: `url(${bellezaIMG})` }}
          >
            <div className='overlay'></div>
            <h3>Belleza</h3>
            <p>
              Resaltá tu belleza natural con cuidados estéticos pensados para
              vos.
            </p>
          </div>

          <div
            className='service'
            style={{ backgroundImage: `url(${facialIMG})` }}
          >
            <div className='overlay'></div>
            <h3>Tratamientos Faciales</h3>
            <p>
              Renová tu piel con limpieza profunda, hidratación y luminosidad
              saludable.
            </p>
          </div>

          <div
            className='service'
            style={{ backgroundImage: `url(${corporalIMG})` }}
          >
            <div className='overlay'></div>
            <h3>Tratamientos Corporales</h3>
            <p>
              Mejorá la textura y firmeza de tu piel con nuestros rituales
              corporales.
            </p>
          </div>

          <div
            className='service'
            style={{ backgroundImage: `url(${grupalIMG})` }}
          >
            <div className='overlay'></div>
            <h3>Servicios Grupales</h3>
            <p>Compartí momentos únicos de bienestar con quienes más querés.</p>
          </div>
        </div>
      </section>

      {/* HACER LA SECCIÖN ACA PARA EL CALENDARIO */}

      <section id='nosotros'>
        <h2>Sobre Nosotros</h2>
        <p>
          En Sentirse Bien, creemos en el poder de la relajación y el
          autocuidado...
        </p>
      </section>

      <section id='contacto'>
        <h2>Contacto</h2>
        <p>
          📍 Calle Bienestar 123, Ciudad Tranquila
          <br />
          📞 123-456-789
          <br />
          ✉️ contacto@sentirsebienspa.com
        </p>
      </section>

      <footer>
        <p>&copy; 2025 Sentirse Bien Spa. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
