'use client';

import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  link?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button = ({
  children,
  onClick,
  link,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 cursor-pointer';

  const variants = {
    primary: 'bg-linear-to-br from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    secondary: 'bg-linear-to-br from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
    ghost: 'text-primary-500 hover:bg-primary-50',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed transform-none';

  const buttonStyles = `
    ${baseStyles} 
    ${variants[variant]} 
    ${sizes[size]} 
    ${disabled ? disabledStyles : ''} 
    ${className}
  `;

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={buttonStyles}>
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={buttonStyles}
    >
      {children}
    </button>
  );
};

export default Button;

