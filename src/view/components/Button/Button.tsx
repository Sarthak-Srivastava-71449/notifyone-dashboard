import React from 'react';

import './Button.css';

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Success = 'success',
  Info = 'info',
}

interface ButtonPropsType {
  className?: string;
  children?: any;
  disabled?: boolean;
  onClick?: (event: any) => void;
  type?: ButtonType;
  hidden?: boolean;
}

const Button = (props: ButtonPropsType) => {
  const {
    className,
    children,
    onClick,
    type = ButtonType.Primary,
    ...rest
  } = props;

  return (
    <button
      className={`button ${type}-button ${className}`}
      data-testid="custom-button"
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
