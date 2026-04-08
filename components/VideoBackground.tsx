'use client';

export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      poster="/images/hero-poster.jpg"
    >
      <source src="https://videos.pexels.com/video-files/3141208/3141208-uhd_3840_2160_25fps.mp4" type="video/mp4" />
    </video>
  );
}