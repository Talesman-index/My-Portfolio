import React from 'react';

interface GoogleAIStudioLogoProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export const GoogleAIStudioLogo: React.FC<GoogleAIStudioLogoProps> = ({
  size = 36,
  className = '',
  style = {}
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
    >
      <defs>
        {/* Top Capsule Gradient: Vibrant Emerald/Green to Azure/Blue */}
        <linearGradient id="aiStudioTopGrad" x1="12" y1="30" x2="88" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00B050" />
          <stop offset="35%" stopColor="#00C853" />
          <stop offset="65%" stopColor="#2979FF" />
          <stop offset="100%" stopColor="#1E88E5" />
        </linearGradient>

        {/* Bottom Capsule Gradient: Azure/Blue to Gold/Orange to Vivid Coral/Red */}
        <linearGradient id="aiStudioBottomGrad" x1="12" y1="70" x2="88" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2196F3" />
          <stop offset="35%" stopColor="#1E88E5" />
          <stop offset="65%" stopColor="#FFB300" />
          <stop offset="85%" stopColor="#FF6D00" />
          <stop offset="100%" stopColor="#F44336" />
        </linearGradient>
      </defs>

      {/* Top Rounded Capsule Shape */}
      <path
        d="M 30 14 
           L 68 14 
           A 18 18 0 0 1 86 32 
           A 18 18 0 0 1 76 48 
           L 32 70 
           A 18 18 0 0 1 14 52 
           A 18 18 0 0 1 30 14 Z"
        fill="url(#aiStudioTopGrad)"
      />

      {/* Bottom Rounded Capsule Shape */}
      <path
        d="M 70 86 
           L 32 86 
           A 18 18 0 0 1 14 68 
           A 18 18 0 0 1 24 52 
           L 68 30 
           A 18 18 0 0 1 86 48 
           A 18 18 0 0 1 70 86 Z"
        fill="url(#aiStudioBottomGrad)"
      />
    </svg>
  );
};

export default GoogleAIStudioLogo;
