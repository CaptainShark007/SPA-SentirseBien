import styles from '@components/Controlled/ControlledInput/ControlledInput.module.css';
import React from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

export type ControlledInputProps<T extends FieldValues> = {
  name: Path<T>;
  nextInputName?: Path<T>;
  label: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>;

const ControlledInput = <T extends FieldValues>({
  name,
  label,
  nextInputName,
  ...props
}: ControlledInputProps<T>) => {
  const { control, setFocus } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={styles['input-group']}>
          <input
            {...field}
            {...props}
            id={name}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && nextInputName) {
                e.preventDefault();
                setFocus(nextInputName);
              }
            }}
          />
          <label htmlFor={name}>{label}</label>
          {fieldState.error && (
            <span className={styles['input-error']}>
              {fieldState.error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default ControlledInput;
