import { cookies } from 'next/headers'
import Link from "next/link"
import VideoBackground from "@/components/VideoBackground"
import NewsletterForm from "@/components/NewsletterForm"

async function getFeaturedLieux(locale: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/lieux?locale=${locale}&take=6`, { cache: 'no-store' })
    return await res.json()
  } catch {
    return []
  }
}

async function getStats() {
  try {
    const res = await fetch('http://localhost:3000/api/lieux', { cache: 'no-store' })
    const lieux = await res.json()
    return { lieuxCount: lieux.length }
  } catch {
    return { lieuxCount: 0 }
  }
}

const regions = [
  { id: 'ANTANANARIVO', name: 'Antananarivo', image: '/images/antananarivo.jpg' },
  { id: 'TOAMASINA', name: 'Toamasina', image: '/images/toamasina.jpg' },
  { id: 'MAHAJANGA', name: 'Mahajanga', image: '/images/mahajanga.jpg' },
  { id: 'FIANARANTSOA', name: 'Fianarantsoa', image: '/images/fianarantsoa.jpg' },
  { id: 'ANTSIRANANA', name: 'Antsiranana', image: '/images/antsiranana.jpg' },
  { id: 'TOLIARA', name: 'Toliara', image: '/images/toliara.jpg' },
]

export default async function HomePage() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'fr'
  const featuredLieux = await getFeaturedLieux(locale)
  const stats = await getStats()

  return (
    <div className="flex flex-col">
      {/* Hero avec vidéo */}
      <div className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white">
        <VideoBackground />
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Découvrez <span className="text-red-500">Madagascar</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200">
            L'île rouge vous attend avec ses paysages uniques, sa faune exceptionnelle et sa culture fascinante.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link href="/lieux" className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full font-semibold transition shadow-lg">
              Explorer les lieux
            </Link>
            <Link href="/plan" className="border-2 border-white hover:bg-white/20 px-8 py-3 rounded-full font-semibold transition">
              Voir la carte
            </Link>
            <Link href="/contact" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3 rounded-full font-semibold transition shadow-lg">
              Planifier mon voyage
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-12">
            <div>
              <div className="text-4xl font-bold text-red-500">6</div>
              <div className="text-sm text-gray-300">Régions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500">{stats.lieuxCount}+</div>
              <div className="text-sm text-gray-300">Lieux uniques</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500">1000+</div>
              <div className="text-sm text-gray-300">Visiteurs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lieux */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Lieux incontournables</h2>
          <p className="text-gray-600 text-center mb-10">Découvrez les merveilles de Madagascar</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredLieux.slice(0, 6).map((lieu: any) => (
              <div key={lieu.id} className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">
                <img src={lieu.imagesArray?.[0] || '/images/placeholder.jpg'} alt={lieu.nom} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-xl mb-2">{lieu.nom}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lieu.description}</p>
                  <Link href={`/lieux/${lieu.id}`} className="text-red-600 font-semibold hover:underline">
                    Voir détails →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/lieux" className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-2 rounded-full inline-block transition">
              Voir tous les lieux
            </Link>
          </div>
        </div>
      </div>

      {/* Régions */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-2">Explorez par région</h2>
          <p className="text-gray-600 text-center mb-10">Chaque région a ses propres trésors</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {regions.map((region) => (
              <Link key={region.id} href={`/region/${region.id}`} className="group">
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-md transition">
                  <div className="h-32 bg-gray-200 flex items-center justify-center text-gray-400">
                    <span>📷</span>
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-bold text-gray-800">{region.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16 bg-red-600">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Restez informé</h3>
          <p className="text-red-100 mb-6">Recevez nos actualités et offres exclusives</p>
          <NewsletterForm />
        </div>
      </div>
    </div>
  )
}