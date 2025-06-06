import { useAppDispatch } from '@hooks/useRedux';
import './crearUsuario.css';
import { closeModal } from '@/shared/slice/modal.slice';
import Button from '@components/Button/Button';

const CrearUsuario = () => {
  const dispatch = useAppDispatch();
  return (
    <div className='modal-overlay' onClick={() => dispatch(closeModal())}>
      <div className='modal-container' onClick={(e) => e.stopPropagation()}>
        <h2>Crear Usuario</h2>
        <form
          className='modal-form'
          onSubmit={() => dispatch(closeModal())}
          // ref={registerFormRef}
        >
          <div className='input-group'>
            <input type='text' id='first-name' name='first-name' required />
            <label htmlFor='first-name'>Nombre/s</label>
          </div>
          <div className='input-group'>
            <input type='text' id='last-name' name='last-name' required />
            <label htmlFor='last-name'>Apellido/s</label>
          </div>
          <div className='input-group'>
            <input type='email' id='email' name='email' required />
            <label htmlFor='email'>Email</label>
          </div>
          <div className='input-group'>
            <input type='text' id='user' name='user' required />
            <label htmlFor='user'>Usuario</label>
          </div>

          <div className='input-group'>
            <input type='password' id='password' name='password' required />
            <label htmlFor='password'>Contraseña</label>
          </div>

          <div className='checkbox-group'>
            <input type='checkbox' id='rol' name='rol' />
            <label htmlFor='rol'></label>
            <span>Profesional</span>
          </div>

          <Button
            variant='contained'
            type='submit'
            // loading={loadingRegister}
            // disabled={loadingRegister}
          >
            Crear
          </Button>

          <Button variant='outlined' onClick={() => dispatch(closeModal())}>
            Volver
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CrearUsuario;
