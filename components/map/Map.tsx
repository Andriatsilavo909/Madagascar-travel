'use client'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Lieu } from '@/types/lieu'
import { TypeLieuLabels, RegionLabels } from '@/types/lieu'
import Link from 'next/link'

// Fix pour les icônes Leaflet (problème avec webpack)
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

interface MapProps {
  lieux: (Lieu & { imagesArray?: string[] })[]
  center?: [number, number]
  zoom?: number
}

// Composant Map (un seul export default ici)
export default function Map({ lieux, center = [-18.8792, 47.5079], zoom = 6 }: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '600px', width: '100%', borderRadius: '0.5rem' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {lieux.map((lieu) => (
        <Marker key={lieu.id} position={[lieu.lat, lieu.lng]}>
          <Popup>
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-lg">{lieu.nom}</h3>
              <p className="text-sm text-gray-600">
                {RegionLabels[lieu.region as keyof typeof RegionLabels]}
              </p>
              <p className="text-sm mt-1">
                {TypeLieuLabels[lieu.type as keyof typeof TypeLieuLabels]}
              </p>
              <Link
                href={`/lieux/${lieu.id}`}
                className="text-red-600 text-sm hover:underline block mt-2"
              >
                Voir détails →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}