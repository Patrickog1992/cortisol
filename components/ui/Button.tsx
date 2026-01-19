import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary' | 'success';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "py-4 px-6 rounded-full font-bold text-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md";
  
  const variants = {
    primary: "bg-[#FF6B6B] text-white hover:bg-[#ff5252]",
    secondary: "bg-[#4ECDC4] text-white hover:bg-[#3dbdb4]",
    outline: "bg-white border-2 border-[#FF6B6B] text-[#FF6B6B] hover:bg-red-50",
    success: "bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-200"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};