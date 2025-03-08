
import React from 'react';
import { cn } from '@/lib/utils';

type CalculatorButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'secondary' | 'operator' | 'equals';
  className?: string;
  active?: boolean;
};

const CalculatorButton = ({
  children,
  onClick,
  variant = 'default',
  className,
  active = false,
}: CalculatorButtonProps) => {
  const baseStyles = "calculator-button h-16";
  
  const variantStyles = {
    default: "bg-white text-gray-800 shadow-sm",
    secondary: "bg-calculator-light text-calculator-dark shadow-sm",
    operator: active 
      ? "bg-calculator-main text-white shadow-sm" 
      : "bg-calculator-operator text-white shadow-sm",
    equals: "bg-calculator-equals text-white shadow-sm"
  };
  
  return (
    <button
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

export default CalculatorButton;
