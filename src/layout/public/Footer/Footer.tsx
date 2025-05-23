import './footer.css';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

const Footer = () => {
  return (
    <footer>
      <section className='footer-section'>
        <div className='section-column'>
          <h2 className='section-text'>Nuestras Redes</h2>
          <a
            className='section-link'
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FacebookOutlinedIcon /> Facebook
          </a>
          <a
            className='section-link'
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <InstagramIcon /> Instagram
          </a>
          <a
            className='section-link'
            href='https://x.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <XIcon /> X
          </a>
        </div>

        <div className='section-column'>
          <h2 className='section-text'>Contacto</h2>
          <p className=''>
            <LocationOnOutlinedIcon /> Calle French 414, Ciudad de Resistencia
          </p>
          <p className=''>
            <PhoneOutlinedIcon /> +54 9 362-4123456
          </p>
          <p className=''>
            <MailOutlinedIcon /> contacto@sentirsebienspa.com
          </p>
        </div>

        <p className=''>
          &copy; 2025 Sentirse Bien Spa. Todos los derechos reservados.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
