"use client"

import { Users, MapPin, Camera, Star } from "lucide-react"

const stats = [
  {
    icon: MapPin,
    value: "50+",
    label: "Lieux uniques",
    color: "text-red-600"
  },
  {
    icon: Users,
    value: "1000+",
    label: "Visiteurs par mois",
    color: "text-green-600"
  },
  {
    icon: Camera,
    value: "6",
    label: "Régions",
    color: "text-blue-600"
  },
  {
    icon: Star,
    value: "4.8/5",
    label: "Avis clients",
    color: "text-yellow-600"
  }
]

export function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}