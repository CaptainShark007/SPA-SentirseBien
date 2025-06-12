import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { closeModal } from '@/shared/slice/modal.slice';
import Button from '@components/Button/Button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CrearUsuarioData,
  CrearUsuarioSchema,
} from '@/shared/validations/crearUsuarioSchema';
import ContainerModal from '@components/Containers/ContainerModal/ContainerModal';
import styles from '@components/CrearUsuario/CrearUsuario.module.css';
import ControlledInput from '@components/Controlled/ControlledInput/ControlledInput';
import ControlledCheckbox from '@components/Controlled/ControlledCheckbox/ControlledCheckbox';

const CrearUsuario = () => {
  const dispatch = useAppDispatch();
  const { modalProps } = useAppSelector((state) => state.modal);

  const form = useForm<CrearUsuarioData>({
    resolver: yupResolver(CrearUsuarioSchema),
    defaultValues: {
      firstName: modalProps ? modalProps?.nombre : '',
      lastName: modalProps ? modalProps?.apellido : '',
      email: modalProps ? modalProps?.email : '',
      username: modalProps ? modalProps?.nombre : '',
      password: '',
      isProfessional: modalProps
        ? modalProps?.empleado === 'Profesional'
        : false,
    },
  });

  const { handleSubmit } = form;

  const onClose = () => {
    dispatch(closeModal());
  };

  const onSubmit: SubmitHandler<CrearUsuarioData> = (data) => {
    console.log('todo ok', data);
  };

  return (
    <FormProvider {...form}>
      <ContainerModal onCloseModal={onClose}>
        <div className={styles['crear-usuario-body']}>
          <h2>Crear Usuario</h2>
          <form
            className={styles['crear-usuario-form']}
            onSubmit={handleSubmit(onSubmit)}
          >
            <ControlledInput
              name='firstName'
              label='Nombre/s'
              nextInputName='lastName'
            />
            <ControlledInput
              name='lastName'
              label='Apellido/s'
              nextInputName='email'
            />
            <ControlledInput
              name='email'
              label='Email'
              nextInputName='username'
              type='email'
            />
            <ControlledInput
              name='username'
              label='Usuario'
              nextInputName='password'
            />
            <ControlledInput
              name='password'
              label='Contraseña'
              type='password'
            />

            <ControlledCheckbox name='isProfessional' label='Profesional' />

            <Button variant='contained' type='submit'>
              Crear
            </Button>

            <Button variant='outlined' onClick={onClose}>
              Volver
            </Button>
          </form>
        </div>
      </ContainerModal>
    </FormProvider>
  );
};

export default CrearUsuario;
