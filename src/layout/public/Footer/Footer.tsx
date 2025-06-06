import './footer.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import imagePath from '@constants/imagePath';

const Footer = () => {
  return (
    <footer className='footer-container'>
      <div className='footer-top'>
        {/* Contenedor principal que incluye logo y columnas */}
        <div className='footer-main-content'>
          {/* Sección del logo */}
          <div className='footer-logo-section'>
            <img
              src={imagePath.icon2white}
              alt='Sentirse Bien Spa Logo'
              className='footer-logo-img'
            />
            <h1 className='footer-logo-text'>Spa Sentirse Bien</h1>
          </div>

          {/* Columnas */}
          <div className='footer-columns'>
            <div className='footer-column'>
              <h3>Equipo de Desarrollo</h3>
              <ul>
                <li>Hugo Brocal</li>
                <li>Diego Gomez</li>
                <li>Joel Trolson</li>
                <li>Lautaro Rodriguez</li>
                <li>Matias Geymonat</li>
              </ul>
            </div>

            <div className='footer-column'>
              <h3>Tecnología & Contribuciones</h3>
              <ul>
                <li>React/Vite & Spring Boot</li>
                <li>GitHub del Frontend</li>
                <li>GitHub del Backend API</li>
                <li>Documentación API REST</li>
                <li>Reportar un bug</li>
              </ul>
            </div>

            <div className='footer-column'>
              <h3>Contacto</h3>
              <address>
                Calle French 414
                <br />
                Ciudad de Resistencia
                <br />
                Chaco, Argentina
                <br />
                <br />
                contacto@sentirsebienspa.com
                <br />
                +54 9 362-4123456
              </address>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <div className='social-links'>
          <a href='' target='_blank' rel='noopener noreferrer'>
            <FacebookOutlinedIcon />
          </a>
          <a
            href='https://github.com/CaptainShark007/SPA-SentirseBien'
            target='_blank'
            rel='noopener noreferrer'
          >
            <InstagramIcon />
          </a>
          <a
            href='https://github.com/CaptainShark007/SPA-SentirseBien'
            target='_blank'
            rel='noopener noreferrer'
          >
            <XIcon />
          </a>
          <a
            href='https://github.com/CaptainShark007/SPA-SentirseBien'
            target='_blank'
            rel='noopener noreferrer'
          >
            <WhatsAppIcon />
          </a>
        </div>

        <div className='legal-links'>
          <span>&copy; 2025 Sentirse Bien Spa by Team DHJLM.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
