import * as yup from 'yup';

export const MetodoPagoSchema = yup.object().shape({
  method: yup.string().required('El metodo es obligatorio'),
});

export type MetodoPagoData = yup.InferType<typeof MetodoPagoSchema>;
