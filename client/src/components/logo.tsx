import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 40, className = "" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M30 20H45V80H30V20Z" fill="#FFC000" />
      <path d="M55 20H70V80H55V20Z" fill="#FFC000" />
      <path d="M45 40H55V50H45V40Z" fill="#0080FF" />
      <path d="M20 40C20 62.0914 37.9086 80 60 80C82.0914 80 100 62.0914 100 40C100 17.9086 82.0914 0 60 0" stroke="#0080FF" strokeWidth="8" />
    </svg>
  );
};

export default Logo;
