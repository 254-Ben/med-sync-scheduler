
import React from 'react';

interface TealThemeProps {
  children: React.ReactNode;
  variant?: 'ocean' | 'forest' | 'medical' | 'cosmic';
}

const TealTheme: React.FC<TealThemeProps> = ({ children, variant = 'medical' }) => {
  const getGradientClass = () => {
    switch (variant) {
      case 'ocean':
        return 'bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-100';
      case 'forest':
        return 'bg-gradient-to-br from-teal-50 via-emerald-50 to-green-100';
      case 'cosmic':
        return 'bg-gradient-to-br from-teal-900 via-blue-900 to-purple-900 text-white';
      case 'medical':
      default:
        return 'bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${getGradientClass()}`}>
      {children}
    </div>
  );
};

export default TealTheme;
