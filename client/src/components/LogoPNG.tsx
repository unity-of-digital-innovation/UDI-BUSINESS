import React from 'react';
import logoImage from '../assets/logo.png';

interface LogoProps {
  size?: number;
  className?: string;
}

const LogoPNG: React.FC<LogoProps> = ({ size = 40, className = "" }) => {
  return (
    <img 
      src={logoImage} 
      width={size} 
      height={size} 
      alt="Unity of Digital Innovation Logo" 
      className={`object-contain ${className}`}
    />
  );
};

export default LogoPNG;