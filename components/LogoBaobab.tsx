'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LogoBaobab() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href="/" 
      className="flex items-center gap-3 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Baobab SVG */}
      <div className="relative">
        <svg 
          width="45" 
          height="45" 
          viewBox="0 0 100 100" 
          className={`transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}
        >
          {/* Baobab tree */}
          <g>
            {/* Tronc */}
            <rect x="45" y="40" width="10" height="40" fill="#8B5A2B" rx="2" />
            {/* Branches */}
            <path d="M45 45 Q30 30 20 35" stroke="#8B5A2B" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M55 45 Q70 30 80 35" stroke="#8B5A2B" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M50 40 Q50 25 40 20" stroke="#8B5A2B" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M50 40 Q50 25 60 20" stroke="#8B5A2B" strokeWidth="4" fill="none" strokeLinecap="round"/>
            {/* Feuillage */}
            <circle cx="20" cy="32" r="8" fill="#2E7D32" opacity="0.9"/>
            <circle cx="80" cy="32" r="8" fill="#2E7D32" opacity="0.9"/>
            <circle cx="40" cy="18" r="7" fill="#388E3C" opacity="0.9"/>
            <circle cx="60" cy="18" r="7" fill="#388E3C" opacity="0.9"/>
            <circle cx="50" cy="12" r="6" fill="#43A047" opacity="0.9"/>
            {/* Baobab fruit */}
            <ellipse cx="65" cy="45" rx="3" ry="5" fill="#D4A574"/>
            <ellipse cx="35" cy="48" rx="3" ry="5" fill="#D4A574"/>
          </g>
        </svg>
        <div className={`absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full transition-all duration-300 ${isHovered ? 'scale-150' : 'scale-100'}`} />
      </div>

      {/* Texte */}
      <div>
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-bold text-red-600 transition-all duration-300 ${isHovered ? 'tracking-wide' : ''}`}>
            Madagascar
          </span>
          <span className={`text-xl font-bold text-green-600 transition-all duration-300 ${isHovered ? 'tracking-wide' : ''}`}>
            Travel
          </span>
        </div>
        <div className="text-[9px] text-gray-400 letter-spacing-wider">
          VOYAGE & DÉCOUVERTE
        </div>
      </div>
    </Link>
  );
}