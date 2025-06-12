import Button from '@components/Button/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import { useAppDispatch } from '@hooks/useRedux';
import { openModal } from '@/shared/slice/modal.slice';
import styles from '@screens/Admin/Admin.module.css';
const usuarios = [
  {
    id: 1,
    nombre: 'Juan Carlos',
    apellido: 'Pelegrino',
    empleado: 'Cliente',
    email: 'usuario1@gmail.com',
  },
  {
    id: 2,
    nombre: 'Ruben',
    apellido: 'Fernandez',
    empleado: 'Profesional',
    email: 'usuario1@gmail.com',
  },
  {
    id: 3,
    nombre: 'Alan Cesar',
    apellido: 'Gautto',
    empleado: 'Profesional',
    email: 'usuario1@gmail.com',
  },
  {
    id: 4,
    nombre: 'Cesar Augusto',
    apellido: 'Rabadeti',
    empleado: 'Cliente',
    email: 'usuario1@gmail.com',
  },
  {
    id: 5,
    nombre: 'Agustin',
    apellido: 'Godoy',
    empleado: 'Profesional',
    email: 'usuario1@gmail.com',
  },
  {
    id: 6,
    nombre: 'Federico',
    apellido: 'Fernandez',
    empleado: 'Cliente',
    email: 'usuario1@gmail.com',
  },
  {
    id: 7,
    nombre: 'Facundo',
    apellido: 'Pautazo',
    empleado: 'Cliente',
    email: 'usuario1@gmail.com',
  },
  {
    id: 8,
    nombre: 'Maria',
    apellido: 'Fernandez',
    empleado: 'Cliente',
    email: 'usuario1@gmail.com',
  },
  {
    id: 9,
    nombre: 'Marai de los Milagros',
    apellido: 'Perez',
    empleado: 'Cliente',
    email: 'usuario1@gmail.com',
  },
  {
    id: 10,
    nombre: 'Ezequiel',
    apellido: 'Fernandez',
    empleado: 'Cliente',
    email: 'usuario1@gmail.com',
  },
];

const Admin = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles['admin-usuarios']}>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant='contained'
          onClick={() => dispatch(openModal({ type: 'CREATE-USER' }))}
          scale
        >
          Crear Usuario
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.empleado}</td>
              <td>{usuario.email}</td>
              <td>
                <Button variant='contained' scale disabled>
                  <InfoOutlineIcon />
                </Button>
                <Button
                  variant='contained'
                  scale
                  onClick={() =>
                    dispatch(
                      openModal({
                        type: 'CREATE-USER',
                        props: usuario,
                      })
                    )
                  }
                >
                  <EditIcon />
                </Button>
                <Button
                  onClick={() =>
                    dispatch(
                      openModal({
                        type: 'DELETE-USER',
                        props: usuario,
                      })
                    )
                  }
                  variant='contained'
                  scale
                >
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
