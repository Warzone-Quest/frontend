import React from 'react';
import { Spinner } from './Spinner';

interface LoadingProps {
  variant?: 'fullscreen' | 'inline' | 'button';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  variant = 'inline',
  size = 'md',
  text = 'Loading...',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const variantClasses = {
    fullscreen: 'fixed inset-0 flex items-center justify-center bg-gray-900/50',
    inline: 'flex items-center justify-center',
    button: 'flex items-center justify-center',
  };

  return (
    <div className={variantClasses[variant]}>
      <div className="flex flex-col items-center gap-2">
        <Spinner size={size} />
        {text && <span className="text-sm text-gray-600">{text}</span>}
      </div>
    </div>
  );
}; 