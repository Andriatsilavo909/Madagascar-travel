import { cookies } from 'next/headers'
import Link from "next/link"
import VideoBackground from "@/components/VideoBackground"
import NewsletterForm from "@/components/NewsletterForm"

async function getFeaturedLieux(locale: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/lieux?locale=${locale}&take=6`, { cache: 'no-store' })
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function getStats() {
  try {
    const res = await fetch('http://localhost:4000/api/lieux', { cache: 'no-store' })
    const lieux = await res.json()
    return { lieuxCount: Array.isArray(lieux) ? lieux.length : 0 }
  } catch {
    return { lieuxCount: 0 }
  }
}

const regions = [
  { id: 'ANTANANARIVO', name: 'Antananarivo', image: 'https://2424.mg/wp-content/uploads/2025/08/analakely_.webp' },
  { id: 'TOAMASINA', name: 'Toamasina', image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=600&h=400&fit=crop', description: 'Port de l\'est' },
  { id: 'MAHAJANGA', name: 'Mahajanga', image: 'https://images.unsplash.com/photo-1590523278191-9edc9a3edfe3?w=600&h=400&fit=crop', description: 'Ville des baobabs' },
  { id: 'FIANARANTSOA', name: 'Fianarantsoa', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop', description: 'Route du vin' },
  { id: 'ANTSIRANANA', name: 'Antsiranana', image: 'https://images.unsplash.com/photo-1590523278191-9edc9a3edfe3?w=600&h=400&fit=crop', description: 'Baie des Français' },
  { id: 'TOLIARA', name: 'Toliara', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop', description: 'Porte du sud' },
]

export default async function HomePage() {
  const cookieStore = await cookies()
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'fr'
  const featuredLieux = await getFeaturedLieux(locale)
  const stats = await getStats()

  return (
    <div className="flex flex-col w-full">
      
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen w-full flex items-center justify-center text-white">
        <VideoBackground />
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Découvrez <span className="text-red-500">Madagascar</span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 text-gray-200 leading-relaxed">
            L'île rouge vous attend avec ses paysages uniques, sa faune exceptionnelle et sa culture fascinante.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link href="/lieux" className="group bg-red-600 hover:bg-red-700 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Explorer les lieux
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/plan" className="group border-2 border-white hover:bg-white/20 px-8 py-3.5 rounded-full font-semibold transition-all duration-300">
              Voir la carte
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link href="/contact" className="group bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Planifier mon voyage
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-2xl mx-auto pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-red-400">6</div>
              <div className="text-xs md:text-sm text-gray-300 mt-1">RÉGIONS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-red-400">{stats.lieuxCount}+</div>
              <div className="text-xs md:text-sm text-gray-300 mt-1">LIEUX UNIQUES</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-5xl font-bold text-red-400">1000+</div>
              <div className="text-xs md:text-sm text-gray-300 mt-1">VISITEURS</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== LIEUX INCONTOURNABLES ========== */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Lieux incontournables
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Découvrez les merveilles de Madagascar à travers notre sélection de lieux exceptionnels
            </p>
            <div className="w-20 h-1 bg-red-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {!featuredLieux || featuredLieux.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredLieux.slice(0, 6).map((lieu: any) => (
                <div 
                  key={lieu.id} 
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={lieu.imagesArray?.[0] || '/images/placeholder.jpg'} 
                      alt={lieu.nom} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-full font-medium shadow-lg">
                        {lieu.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{lieu.region}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-600 transition">
                      {lieu.nom}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {lieu.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <Link 
                        href={`/lieux/${lieu.id}`} 
                        className="inline-flex items-center gap-1 text-red-600 font-semibold text-sm hover:gap-2 transition-all"
                      >
                        Voir détails
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              href="/lieux" 
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border-2 border-red-600 text-red-600 rounded-full font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Voir tous les lieux
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== RÉGIONS ========== */}
      <section className="py-20 bg-white w-full">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Explorez par région</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Chaque région de Madagascar a ses propres trésors à découvrir
            </p>
            <div className="w-20 h-1 bg-red-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {regions.map((region) => (
              <Link key={region.id} href={`/region/${region.id}`} className="group">
                <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-40">
                    <img 
                      src={region.image} 
                      alt={region.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="text-sm md:text-base font-bold group-hover:text-red-400 transition">{region.name}</h3>
                    <p className="text-xs text-gray-200 truncate">{region.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-500 w-full">
        <div className="w-full max-w-2xl mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Restez informé</h3>
          <p className="text-red-100 mb-6">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et offres exclusives.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}