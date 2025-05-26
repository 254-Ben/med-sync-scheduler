
import React from 'react';
import CreativeLoader from './CreativeLoader';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  variant?: 'pulse' | 'wave' | 'dots' | 'medical';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...',
  variant = 'medical'
}) => {
  return <CreativeLoader size={size} text={text} variant={variant} />;
};

export default LoadingSpinner;
