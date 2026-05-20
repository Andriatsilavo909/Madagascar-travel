'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Logo() {
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
          width="48" 
          height="48" 
          viewBox="0 0 100 100" 
          className={`transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}`}
        >
          {/* Cercle de fond */}
          <circle cx="50" cy="50" r="48" fill="#FFF8F5" stroke="#E74C3C" strokeWidth="2.5" />
          
          {/* Baobab tree */}
          <g transform="translate(50,55)">
            {/* Tronc */}
            <rect x="-7" y="-18" width="14" height="35" fill="#8B5A2B" rx="3" />
            {/* Tronc texture */}
            <line x1="-3" y1="-15" x2="-3" y2="15" stroke="#A0522D" strokeWidth="1" opacity="0.5"/>
            <line x1="3" y1="-15" x2="3" y2="15" stroke="#A0522D" strokeWidth="1" opacity="0.5"/>
            
            {/* Branches gauches */}
            <path d="M-7 -8 Q-22 -12 -28 -2" stroke="#8B5A2B" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M-7 -12 Q-18 -22 -12 -26" stroke="#8B5A2B" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M-7 -15 Q-12 -28 -5 -32" stroke="#8B5A2B" strokeWidth="3" fill="none" strokeLinecap="round"/>
            
            {/* Branches droites */}
            <path d="M7 -8 Q22 -12 28 -2" stroke="#8B5A2B" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M7 -12 Q18 -22 12 -26" stroke="#8B5A2B" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            <path d="M7 -15 Q12 -28 5 -32" stroke="#8B5A2B" strokeWidth="3" fill="none" strokeLinecap="round"/>
            
            {/* Feuillage */}
            <circle cx="-30" cy="-4" r="8" fill="#2E7D32" opacity="0.9"/>
            <circle cx="-14" cy="-28" r="7" fill="#388E3C" opacity="0.9"/>
            <circle cx="-4" cy="-35" r="6" fill="#43A047" opacity="0.9"/>
            <circle cx="30" cy="-4" r="8" fill="#2E7D32" opacity="0.9"/>
            <circle cx="14" cy="-28" r="7" fill="#388E3C" opacity="0.9"/>
            <circle cx="4" cy="-35" r="6" fill="#43A047" opacity="0.9"/>
            <circle cx="-20" cy="-14" r="6" fill="#4CAF50" opacity="0.8"/>
            <circle cx="20" cy="-14" r="6" fill="#4CAF50" opacity="0.8"/>
            
            {/* Baobab fruits */}
            <ellipse cx="-22" cy="-2" rx="4" ry="6" fill="#D4A574"/>
            <ellipse cx="22" cy="-2" rx="4" ry="6" fill="#D4A574"/>
            <ellipse cx="-6" cy="10" rx="5" ry="8" fill="#D4A574"/>
            <ellipse cx="6" cy="10" rx="5" ry="8" fill="#D4A574"/>
          </g>
          
          {/* Soleil couchant */}
          <circle cx="80" cy="20" r="8" fill="#FF9800" opacity="0.3"/>
          <circle cx="80" cy="20" r="5" fill="#FFB74D" opacity="0.5"/>
          
          {/* Étoile */}
          <path 
            d="M18 18 L20 23 L25 24 L21 27 L22 32 L18 29 L14 32 L15 27 L11 24 L16 23 Z" 
            fill="#F1C40F"
            className={`transition-all duration-300 ${isHovered ? 'opacity-100 scale-110' : 'opacity-70'}`}
          />
        </svg>
      </div>

      {/* Texte */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <span className={`text-2xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent transition-all duration-300 ${isHovered ? 'tracking-wide' : ''}`}>
            Madagascar
          </span>
          <span className={`text-2xl font-bold text-green-600 transition-all duration-300 ${isHovered ? 'tracking-wide' : ''}`}>
            Travel
          </span>
        </div>
        <div className="text-[10px] text-gray-400 tracking-wider font-medium">
          VOYAGE & DÉCOUVERTE
        </div>
      </div>
    </Link>
  );
}