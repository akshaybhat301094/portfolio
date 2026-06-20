import React from 'react';

export function ZetaIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="120" height="120" rx="20" fill="#6534c9" />
      <text 
        x="60" 
        y="72" 
        fill="#ffffff" 
        fontFamily="sans-serif, Arial" 
        fontSize="44" 
        fontWeight="600" 
        textAnchor="middle"
        letterSpacing="-1"
      >
        zeta
      </text>
    </svg>
  );
}
