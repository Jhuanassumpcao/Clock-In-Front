import React from 'react';
import styles from './Button.module.css';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "medium",
    children,
    type = "button",
    onClick,
    className = "",
    disabled = false,
  }) => {
    const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;
  
    return (
      <button type={type} className={buttonClass} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    );
  };
  
  export default Button;
