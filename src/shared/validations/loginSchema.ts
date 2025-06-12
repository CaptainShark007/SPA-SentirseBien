import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  username: yup.string().required('El usuario es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
});

export type LoginData = yup.InferType<typeof LoginSchema>;
