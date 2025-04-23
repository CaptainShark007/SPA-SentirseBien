import miLogo from './assets/images/logo-png.png';
import miLogo2 from './assets/logo2-png.png';
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
        
        {/* <h1>BIENVENIDO</h1> */}
        <div className='logo-container'>
          <img className='logo' src={miLogo2} alt="Logo Sentirse Bien" />
        </div>

        {/* FLECHITA */}
        <div className='scroll-indicator'>
          <span className='arrow'>&#x25BC;</span>
        </div>
      </header>

      {/* <nav>
        <a href="#">
          <img 
            src={miLogo}
            alt="Logo"
            className='logo'
            style={{ width: '100px', height: 'auto' }}
            />
        </a>
        <a href='#servicios'>Servicios</a>
        <a href='#nosotros'>Nosotros</a>
        <a href='#contacto'>Contacto</a>
      </nav> */}

      <nav className="compact-nav">
        <div className="nav-wrapper">
          <a href="#" className="nav-logo-link">
            <img 
              src={miLogo}
              alt="Logo Sentirse Bien"
              className="compact-logo"
            />
          </a>
          <div className="nav-menu-links">
            <a href="#servicios" className="nav-menu-item">Servicios</a>
            <a href="#nosotros" className="nav-menu-item">Nosotros</a>
            <a href="#contacto" className="nav-menu-item">Contacto</a>
          </div>
        </div>
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

      {/* HACER LA SECCION DE LAS LISTAS*/}

      <section id="servicios-lista">

        <h2>Nuestros Tratamientos</h2>
        
        {/* Categoria MASAJES */}
        <div className="categoria-servicio">

          <h3>MASAJES</h3>

          {/* Tratamientos */}
          <div className="servicio-item">
            <div className="servicio-info">
              <h4>Anti-Stress</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>
          <div className='servicio-item'>
            <div className="servicio-info">
              <h4>Descontracturante</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>
          <div className='servicio-item'>
            <div className="servicio-info">
              <h4>Masajes con piedras calientes</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>
          <div className='servicio-item'>
            <div className="servicio-info">
              <h4>Circulatorios</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>

        </div>

        <div className="categoria-servicio">

          <h3>BELLEZA</h3>

          <div className="servicio-item">
            <div className="servicio-info">
              <h4>Lifting de pestañas</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>
          
          <div className="servicio-item">
            <div className="servicio-info">
              <h4>Depilación facial</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>
          
          <div className="servicio-item">
            <div className="servicio-info">
              <h4>Belleza de manos y pies</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>
          
        </div>

        <div className='categoria-servicio'>

          <h3>TRATAMIENTOS FACIALES</h3>

          <div className="servicio-item">
            <div className="servicio-info">
              <h4>Punta de diamante: microexfoliación</h4>
              {/* <p className='requiere-sena'>Más información</p> */}
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>

          <div className="servicio-item">
            <div className="servicio-info">
              <h4>Limpieza profunda + Hidratación</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>

          <div className="servicio-item">
            <div className="servicio-info">
              <h4>Crio frecuencia facial</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>

        </div>

        <div className='categoria-servicio'>

          <h3>TRATAMIENTOS CORPORALES</h3>

          <div className="servicio-item">
            <div className="servicio-info">
              <h4>VelaSlim</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>

          <div className="servicio-item">
            <div className="servicio-info">
              <h4>DermoHealth</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>

          <div className="servicio-item">
            <div className="servicio-info">
              <h4>Criofrecuencia</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>

          <div className="servicio-item">
            <div className="servicio-info">
              <h4>Ultracavitación</h4>
              <a className='mas-info'>Más información</a>
            </div>
            <div className="servicio-accion">
              <button className="btn-reservar">Reservar</button>
            </div>
          </div>

        </div>

        <div className='categoria-servicio'>
      
            <h3>SERVICIOS GRUPALES</h3>
  
            <div className="servicio-item">
              <div className="servicio-info">
                <h4>Hidromasajes</h4>
                <a className='mas-info'>Más información</a>
              </div>
              <div className="servicio-accion">
                <button className="btn-reservar">Reservar</button>
              </div>
            </div>
  
            <div className="servicio-item">
              <div className="servicio-info">
                <h4>Yoga</h4>
                <a className='mas-info'>Más información</a>
              </div>
              <div className="servicio-accion">
                <button className="btn-reservar">Reservar</button>
              </div>
            </div>

        </div>

      </section>

      {/* HACER LA SECCION DE LAS LISTAS*/}

      {/* HACER LA SECCION DEL CALENDARIO */}
      <section id='calendario'>
        <h2>Calendario</h2>
        <p>Reserva tu cita en nuestro spa</p>
        
        <div className="calendario-spa">
          <div className="calendario-header">
            <h3>Abril 2025</h3>
          </div>
          <div className="calendario-dias-semana">
            <span>Do</span>
            <span>Lu</span>
            <span>Ma</span>
            <span>Mi</span>
            <span>Ju</span>
            <span>Vi</span>
            <span>Sá</span>
          </div>
          <div className="calendario-grid">
            {/* Espacios vacíos para alinear el primer día (miércoles) */}
            <span className="calendario-vacio"></span>
            <span className="calendario-vacio"></span>
            <span className="calendario-vacio"></span>
            
            {/* Días de abril (1-22 en gris, 23 en adelante normales) */}
            <span className="calendario-dia pasado">1</span>
            <span className="calendario-dia pasado">2</span>
            <span className="calendario-dia pasado">3</span>
            <span className="calendario-dia pasado">4</span>
            <span className="calendario-dia pasado">5</span>
            <span className="calendario-dia pasado">6</span>
            <span className="calendario-dia pasado">7</span>
            <span className="calendario-dia pasado">8</span>
            <span className="calendario-dia pasado">9</span>
            <span className="calendario-dia pasado">10</span>
            <span className="calendario-dia pasado">11</span>
            <span className="calendario-dia pasado">12</span>
            <span className="calendario-dia pasado">13</span>
            <span className="calendario-dia pasado">14</span>
            <span className="calendario-dia pasado">15</span>
            <span className="calendario-dia pasado">16</span>
            <span className="calendario-dia pasado">17</span>
            <span className="calendario-dia pasado">18</span>
            <span className="calendario-dia pasado">19</span>
            <span className="calendario-dia pasado">20</span>
            <span className="calendario-dia pasado">21</span>
            <span className="calendario-dia pasado">22</span>
            <span className="calendario-dia hoy">23</span>
            <span className="calendario-dia">24</span>
            <span className="calendario-dia">25</span>
            <span className="calendario-dia">26</span>
            <span className="calendario-dia">27</span>
            <span className="calendario-dia">28</span>
            <span className="calendario-dia">29</span>
            <span className="calendario-dia">30</span>
          </div>
        </div>
      </section>
      {/* HACER LA SECCION DEL CALENDARIO */}

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
