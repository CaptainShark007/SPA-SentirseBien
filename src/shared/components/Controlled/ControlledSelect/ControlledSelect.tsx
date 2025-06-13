import styles from '@components/Controlled/ControlledSelect/ControlledSelect.module.css';
import React, { useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export type Option = {
  label: string;
  value: string;
};

export type ControlledSelectProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  options: Option[];
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'name'>;

const ControlledSelect = <T extends FieldValues>({
  name,
  label,
  options,
  ...props
}: ControlledSelectProps<T>) => {
  const { control } = useFormContext<T>();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={styles['input-group']}>
          <label htmlFor={name} className={styles['floating-label']}>
            {label}
          </label>
          <div className={styles['select-wrapper']}>
            <select
              {...field}
              {...props}
              id={name}
              className={styles['select']}
              onBlur={() => setIsOpen(false)}
              onClick={() => setIsOpen(!isOpen)}
            >
              <option value='' disabled hidden />
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className={styles['icon']}>
              {isOpen ? (
                <ArrowDropUpIcon className={styles['icon-size']} />
              ) : (
                <ArrowDropDownIcon className={styles['icon-size']} />
              )}
            </div>
          </div>
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

export default ControlledSelect;
