
import React from 'react';

interface CreativeLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pulse' | 'wave' | 'dots' | 'medical';
  text?: string;
}

const CreativeLoader: React.FC<CreativeLoaderProps> = ({ 
  size = 'md', 
  variant = 'medical',
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const renderMedicalLoader = () => (
    <div className="relative">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Heart beat animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full animate-pulse"></div>
        <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
        </div>
      </div>
      {/* EKG Line */}
      <div className="mt-4 w-24 h-1 bg-gray-200 rounded overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-teal-400 via-blue-500 to-teal-400 animate-pulse"></div>
      </div>
    </div>
  );

  const renderWaveLoader = () => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`${size === 'sm' ? 'w-1 h-6' : size === 'md' ? 'w-2 h-8' : 'w-3 h-12'} bg-gradient-to-t from-teal-400 to-blue-500 rounded-full animate-pulse`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  const renderDotsLoader = () => (
    <div className="flex space-x-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} bg-gradient-to-br from-teal-400 to-blue-500 rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );

  const renderPulseLoader = () => (
    <div className={`${sizeClasses[size]} relative`}>
      <div className="absolute inset-0 bg-teal-400 rounded-full animate-ping"></div>
      <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse"></div>
    </div>
  );

  const getLoader = () => {
    switch (variant) {
      case 'wave': return renderWaveLoader();
      case 'dots': return renderDotsLoader();
      case 'pulse': return renderPulseLoader();
      case 'medical': return renderMedicalLoader();
      default: return renderMedicalLoader();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      {getLoader()}
      <p className="text-gray-600 text-sm font-medium animate-pulse">{text}</p>
    </div>
  );
};

export default CreativeLoader;
