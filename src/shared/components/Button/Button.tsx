import styles from './Button.module.css';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'contained' | 'outlined';
  loading?: boolean;
  scale?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  loading,
  scale,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${scale && styles.scale}`}
      {...props}
    >
      {loading ? (
        <span className={`${styles.spin} ${styles[variant]}`} />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
