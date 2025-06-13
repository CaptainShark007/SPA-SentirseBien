import {
  MetodoPagoData,
  MetodoPagoSchema,
} from '@/shared/validations/metodoPagoSchema';
import Button from '@components/Button/Button';
import ContainerModal from '@components/Containers/ContainerModal/ContainerModal';
import ControlledSelect from '@components/Controlled/ControlledSelect/ControlledSelect';
import { useApiMethodPayment } from '@features/hooks/useApiMethodPayment';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from '@screens/Reservas/components/MetodoPago/MetodoPago.module.css';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

interface MetodoPagoProps {
  open: boolean;
  onClose: () => void;
}

const MetodoPago = ({ open, onClose }: MetodoPagoProps) => {
  const { methodPayment, isPending } = useApiMethodPayment(onClose);

  const form = useForm<MetodoPagoData>({
    resolver: yupResolver(MetodoPagoSchema),
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<MetodoPagoData> = (dataSend) => {
    methodPayment(dataSend);
  };

  if (!open) return null;
  return (
    <FormProvider {...form}>
      <ContainerModal onCloseModal={onClose}>
        <div className={styles['body']}>
          <h2>Metodo de Pago</h2>
          <form className={styles['form']} onSubmit={handleSubmit(onSubmit)}>
            <ControlledSelect
              name='method'
              label='Metodo de Pago'
              options={[
                { label: 'Efectivo', value: 'CASH' },
                { label: 'Crédito', value: 'CREDIT_CARD' },
                {
                  label: 'Débito',
                  value: 'DEBIT_CARD',
                },
                {
                  label: 'Transferencia Bancaria',
                  value: 'BANK_TRANSFER',
                },
                { label: 'Otro', value: 'OTHER' },
              ]}
            />

            <div className={styles['modal-buttons']}>
              <Button variant='outlined' onClick={onClose}>
                Cancelar
              </Button>
              <Button
                variant='contained'
                disabled={isPending}
                loading={isPending}
                type='submit'
              >
                Confirmar
              </Button>
            </div>
          </form>
        </div>
      </ContainerModal>
    </FormProvider>
  );
};

export default MetodoPago;
