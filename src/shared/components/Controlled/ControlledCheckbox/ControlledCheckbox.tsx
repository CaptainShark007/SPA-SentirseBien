import styles from '@components/Controlled/ControlledCheckbox/ControlledCheckbox.module.css';
import React from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export type ControlledCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'>;

const ControlledCheckbox = <T extends FieldValues>({
  name,
  label,
  ...props
}: ControlledCheckboxProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={styles['checkbox-group']}>
          <input
            {...field}
            {...props}
            checked={field.value}
            id={name}
            type='checkbox'
          />
          <label htmlFor={name} />
          <span>{label}</span>
          {fieldState.error && (
            <>
              <br />
              <span className={styles['checkbox-error']}>
                {fieldState.error.message}
              </span>
            </>
          )}
        </div>
      )}
    />
  );
};

export default ControlledCheckbox;
