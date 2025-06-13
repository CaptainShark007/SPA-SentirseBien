import Button from '@components/Button/Button';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  CrearUsuarioData,
  CrearUsuarioSchema,
} from '@/shared/validations/crearUsuarioSchema';
import ContainerModal from '@components/Containers/ContainerModal/ContainerModal';
import ControlledInput from '@components/Controlled/ControlledInput/ControlledInput';
import ControlledCheckbox from '@components/Controlled/ControlledCheckbox/ControlledCheckbox';
import { useEffect } from 'react';
import styles from '@screens/Admin/components/CrearUsuario.module.css';
import ControlledSelect from '@components/Controlled/ControlledSelect/ControlledSelect';
import { useApiCreateUser } from '@features/hooks/useApiCreateUser';
import { UserCreate } from '@features/types/admin.types';

interface CrearUsuarioProps {
  open: boolean;
  onClose: () => void;
}

const defaultValues: CrearUsuarioData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  isProfessional: false,
  license: '',
  specialty: '',
};

const CrearUsuario = ({ open, onClose }: CrearUsuarioProps) => {
  const { createUser, isPending } = useApiCreateUser(onClose);
  const form = useForm<CrearUsuarioData>({
    resolver: yupResolver(CrearUsuarioSchema),
    defaultValues,
  });

  const { handleSubmit, watch, reset } = form;
  const isProfessional = watch('isProfessional');

  const onSubmit: SubmitHandler<CrearUsuarioData> = (data) => {
    let dataSend: UserCreate;

    if (data.isProfessional) {
      dataSend = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        license: data.license,
        specialty: data.specialty,
        role: 'PROFESSIONAL',
      };
    } else {
      dataSend = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        username: data.username,
        password: data.password,
        phone: data.phone,
        role: 'CUSTOMER',
      };
    }

    createUser(dataSend);
  };

  useEffect(() => {
    return () => {
      if (!open) return;

      reset(defaultValues);
    };
  }, [reset, open]);

  if (!open) return null;
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
              nextInputName={isProfessional ? 'license' : 'phone'}
              type='email'
            />
            {!isProfessional && (
              <ControlledInput
                name='phone'
                label='Teléfono'
                nextInputName={isProfessional ? 'license' : 'username'}
                type='tel'
              />
            )}
            {isProfessional && (
              <>
                <ControlledInput
                  name='license'
                  label='Licencia'
                  nextInputName='specialty'
                />

                <ControlledSelect
                  name='specialty'
                  label='Especialidad'
                  options={[
                    { label: 'Masajes', value: 'MASAJE' },
                    { label: 'Belleza', value: 'BELLEZA' },
                    {
                      label: 'Tratamiento Facial',
                      value: 'TRATAMIENTOS FACIALES',
                    },
                    {
                      label: 'Tratamiento Corporal',
                      value: 'TRATAMIENTOS CORPORALES',
                    },
                    { label: 'Servicio Grupal', value: 'GRUPALES' },
                  ]}
                />
              </>
            )}

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

            <Button variant='contained' type='submit' loading={isPending}>
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
