import * as yup from 'yup';

export const CrearUsuarioSchema = yup.object().shape({
  firstName: yup.string().required('El nombre es obligatorio'),
  lastName: yup.string().required('El apellido es obligatorio'),
  email: yup
    .string()
    .email('Email inválido')
    .required('El email es obligatorio'),
  username: yup.string().required('El usuario es obligatorio'),
  password: yup
    .string()
    .min(8, 'Mínimo 8 caracteres')
    .required('La contraseña es obligatoria'),
  isProfessional: yup.boolean().notRequired() as yup.BooleanSchema<boolean>,
  license: yup.lazy((_, ctx) => {
    return ctx?.parent?.isProfessional
      ? yup.string().required('La licencia es obligatoria')
      : (yup.string().notRequired() as yup.StringSchema<string>);
  }),
  specialty: yup.lazy((_, ctx) => {
    return ctx?.parent?.isProfessional
      ? yup.string().required('La especialidad es obligatoria')
      : (yup.string().notRequired() as yup.StringSchema<string>);
  }),
  phone: yup.lazy((_, ctx) => {
    return ctx?.parent?.isProfessional
      ? (yup.string().notRequired() as yup.StringSchema<string>)
      : yup
          .string()
          .min(10, 'Teléfono invalido')
          .required('El teléfono es obligatorio');
  }),
});

export type CrearUsuarioData = yup.InferType<typeof CrearUsuarioSchema>;
