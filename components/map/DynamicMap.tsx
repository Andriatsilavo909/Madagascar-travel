'use client'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

const Map = dynamic(() => import('@/components/map/Map'), {
  ssr: false,
  loading: () => <p>Chargement...</p>
})

export default function DynamicMap({ lieux }: { lieux: any[] }) {
  return <Map lieux={lieux} />
}