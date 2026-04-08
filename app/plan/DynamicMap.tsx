'use client'

import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

// Import dynamique avec désactivation du SSR (uniquement côté client)
const Map = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => <p className="text-center py-20">Chargement de la carte...</p>
})

export default function DynamicMap({ lieux }: { lieux: any[] }) {
  return <Map lieux={lieux} />
}