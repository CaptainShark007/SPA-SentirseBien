import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import imagePath from '@constants/imagePath';
import styles from '@layout/Footer/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles['footer-container']}>
      <div className={styles['footer-top']}>
        <div className={styles['footer-main-content']}>
          <div className={styles['footer-logo-section']}>
            <img
              src={imagePath.icon2white}
              alt='Sentirse Bien Spa Logo'
              className={styles['footer-logo-img']}
            />
            <h1 className={styles['footer-logo-text']}>Spa Sentirse Bien</h1>
          </div>

          <div className={styles['footer-columns']}>
            <div className={styles['footer-column']}>
              <h3>Equipo de Desarrollo</h3>
              <ul>
                <li>
                  <a
                    href='https://github.com/CaptainShark007/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Hugo Brocal
                  </a>
                </li>
                <li>
                  <a
                    href='https://github.com/hackcode15/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Diego Gomez
                  </a>
                </li>
                <li>
                  <a
                    href='https://github.com/trolsonjoel1992/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Joel Trolson
                  </a>
                </li>
                <li>
                  <a
                    href='https://github.com/LautaroRodriguez54/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Lautaro Rodriguez
                  </a>
                </li>
                <li>
                  <a
                    href='https://github.com/geymomati/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Matias Geymonat
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles['footer-column']}>
              <h3>Tecnología & Contribuciones</h3>
              <ul>
                <li>React/Vite & Spring Boot</li>
                <li>GitHub del Frontend</li>
                <li>GitHub del Backend API</li>
                <li>Documentación API REST</li>
                <li>Reportar un bug</li>
              </ul>
            </div>

            <div className={styles['footer-column']}>
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

      <div className={styles['footer-bottom']}>
        <div className={styles['social-links']}>
          <a
            href='https://facebook.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FacebookOutlinedIcon />
          </a>
          <a
            href='https://instagram.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <InstagramIcon />
          </a>
          <a href='https://x.com/' target='_blank' rel='noopener noreferrer'>
            <XIcon />
          </a>
          <a
            href='https://whatsapp.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <WhatsAppIcon />
          </a>
        </div>

        <div className={styles['legal-links']}>
          <span>&copy; 2025 Sentirse Bien Spa by Team DHJLM.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
