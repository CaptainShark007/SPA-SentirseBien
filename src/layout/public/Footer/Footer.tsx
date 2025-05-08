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
      <p>&copy; 2025 Sentirse Bien Spa. Todos los derechos reservados.</p>

      <section>
        <div>
          <h2>Nuestras Redes</h2>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FacebookOutlinedIcon /> Facebook
          </a>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            <InstagramIcon /> Instagram
          </a>
          <a href='https://x.com' target='_blank' rel='noopener noreferrer'>
            <XIcon /> X
          </a>
        </div>

        <div>
          <h2>Contacto</h2>
          <p>
            <LocationOnOutlinedIcon /> Calle French 414, Ciudad de Resistencia
          </p>
          <p>
            <PhoneOutlinedIcon /> +54 9 362-4123456
          </p>
          <p>
            <MailOutlinedIcon /> contacto@sentirsebienspa.com
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
