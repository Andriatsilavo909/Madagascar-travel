'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function RegionsSlider({ regions }: { regions: any[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const amount = 250;
      trackRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        track.scrollBy({ left: e.deltaY, behavior: 'smooth' });
      }
    };
    track.addEventListener('wheel', handleWheel, { passive: false });
    return () => track.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div className="regions-slider">
      <div className="regions-track" ref={trackRef}>
        {regions.map((region) => (
          <Link href={`/region/${region.id}`} key={region.id}>
            <div className="region-card">
              <img src={region.image} alt={region.name} className="region-image" />
              <div className="region-info">
                <div className="region-name">{region.name}</div>
                <div className="region-count">{region.count} lieux</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button className="slider-button slider-left" onClick={() => scroll('left')}>❮</button>
      <button className="slider-button slider-right" onClick={() => scroll('right')}>❯</button>
    </div>
  );
}