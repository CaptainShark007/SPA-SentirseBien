import './button.css';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'contained' | 'outlined';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button className={variant} {...props}>
      {loading ? <span className={`spin-${variant}`} /> : children}
    </button>
  );
};

export default Button;
