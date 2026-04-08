'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
}

export default function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = 'https://via.placeholder.com/400x300?text=Image+non+disponible' 
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center text-gray-500`}>
        <span>🖼️</span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc)
        setError(true)
      }}
    />
  )
}