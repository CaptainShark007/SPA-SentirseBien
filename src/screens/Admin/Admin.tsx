import Button from '@components/Button/Button';
import SpinnerLoading from '@components/SpinnerLoading/SpinnerLoading';
import { useApiListUser } from '@features/hooks/useApiListUser';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
// import { useAppDispatch } from '@hooks/useRedux';
// import { openModal } from '@/shared/slice/modal.slice';
import styles from '@screens/Admin/Admin.module.css';
import CrearUsuario from '@screens/Admin/components/CrearUsuario';
import { useCrearUsuario } from '@screens/Admin/components/useCrearUsuario';

const Admin = () => {
  const { isOpen, openModal, closeModal } = useCrearUsuario();
  const { data: listUser, isLoading } = useApiListUser();

  if (isLoading) return <SpinnerLoading />;
  return (
    <>
      <div className={styles['admin-usuarios']}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant='contained' onClick={openModal} scale>
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
              {/* <th>Acciones</th> */}
            </tr>
          </thead>
          <tbody>
            {listUser?.data?.map((usuario, index) => (
              <tr key={index}>
                <td>{usuario.firstName}</td>
                <td>{usuario.lastName}</td>
                <td>
                  {usuario.roleName === 'CUSTOMER' ? 'Cliente' : 'Profesional'}
                </td>
                <td>{usuario.email}</td>
                {/* <td>
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
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CrearUsuario open={isOpen} onClose={closeModal} />
    </>
  );
};

export default Admin;
