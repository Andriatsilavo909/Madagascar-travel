import { prisma } from "@/lib/db/prisma"
import { parseImages } from "@/types/lieu"
import { RegionLabels, TypeLieuLabels } from "@/types/lieu"
import Link from "next/link"
import VideoBackground from "@/components/VideoBackground"
import NewsletterForm from "@/components/NewsletterForm"
import '../styles/homepage.css'

async function getFeaturedLieux() {
  try {
    const lieux = await prisma.lieu.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' }
    })
    return lieux.map(lieu => ({
      ...lieu,
      imagesArray: parseImages(lieu.images)
    }))
  } catch (error) {
    console.error('Erreur chargement lieux:', error)
    return []
  }
}

// Données statiques des régions (à adapter selon votre base)
const regions = [
  { id: 'ANTANANARIVO', name: 'Antananarivo', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkiSpEKQjvvrWXGSdB3yBT0s5nLEHXUca9Q&s', count: 15 },
  { id: 'TOAMASINA', name: 'Toamasina', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO74evcXNv5KV2uMVsy6OKiF_QTXi2VKf23g&s', count: 12 },
  { id: 'MAHAJANGA', name: 'Mahajanga', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx2fSnGwX6Q4fwtdaPXcib82ZlAshJm295vw&s', count: 10 },
  { id: 'FIANARANTSOA', name: 'Fianarantsoa', image: 'https://www.practica.org/wp-content/uploads/DJI_0096-scaled.jpg', count: 8 },
  { id: 'ANTSIRANANA', name: 'Antsiranana', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwSzMWZGn0p-gES8hGdg7fkg6L_6ruCt40fg&s', count: 14 },
  { id: 'TOLIARA', name: 'Toliara', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMLcbNEytcdOmPYiBdfOjE47eMpGIwc9aqUQ&s', count: 11 },
]

// Témoignages (statiques)
const testimonials = [
  {
    name: "Marie Dubois",
    avatar: "👩",
    location: "Paris, France",
    text: "Un site magnifique qui m'a permis de préparer mon voyage à Madagascar. Les informations sont précises et les photos sont superbes !"
  },
  {
    name: "Jean Rakoto",
    avatar: "👨",
    location: "Antananarivo, Madagascar",
    text: "En tant que guide local, je recommande ce site à tous mes clients. Les lieux sont bien présentés et les descriptions sont exactes."
  },
  {
    name: "Sophie Martin",
    avatar: "👩",
    location: "Lyon, France",
    text: "Grâce à ce site, j'ai découvert des endroits incroyables que je n'aurais pas trouvés ailleurs. Merci !"
  }
]

export default async function HomePage() {
  const featuredLieux = await getFeaturedLieux()

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <VideoBackground />
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <div>
            <h1 className="hero-title">
              Découvrez <span>Madagascar</span>
            </h1>
            <p className="hero-subtitle">
              L'île rouge vous attend avec ses paysages uniques, sa faune exceptionnelle et sa culture fascinante.
            </p>
            <div className="hero-buttons">
              <Link href="/lieux" className="btn-primary">
                Explorer les lieux
              </Link>
              <Link href="/plan" className="btn-outline">
                Voir la carte
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">6</div>
                <div className="stat-label">Régions</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Lieux uniques</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">1000+</div>
                <div className="stat-label">Visiteurs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Lieux incontournables */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Lieux incontournables</h2>
          <p className="section-subtitle">
            Découvrez les merveilles de Madagascar à travers notre sélection de lieux exceptionnels
          </p>
          <div className="places-grid">
            {featuredLieux.map((lieu) => (
              <div key={lieu.id} className="place-card">
                <img
                  src={lieu.imagesArray?.[0] || '/images/placeholder.jpg'}
                  alt={lieu.nom}
                  className="place-image"
                />
                <div className="place-content">
                  <span className="place-type">{TypeLieuLabels[lieu.type as keyof typeof TypeLieuLabels]}</span>
                  <h3 className="place-title">{lieu.nom}</h3>
                  <p className="place-desc">{lieu.description.substring(0, 120)}...</p>
                  <Link href={`/lieux/${lieu.id}`} className="btn-outline-small">
                    Voir détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/lieux" className="btn-primary">
              Voir tous les lieux
            </Link>
          </div>
        </div>
      </section>

      {/* Section Régions (carrousel) */}
      <section className="section section-dark">
        <div className="container">
          <h2 className="section-title">Explorez par région</h2>
          <p className="section-subtitle">
            Chaque région de Madagascar a ses propres trésors à découvrir
          </p>
          <div className="regions-slider">
            <div className="regions-track" id="regionsTrack">
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
            <button className="slider-button slider-left" id="sliderLeft" aria-label="Précédent">
              ❮
            </button>
            <button className="slider-button slider-right" id="sliderRight" aria-label="Suivant">
              ❯
            </button>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Ce que disent nos visiteurs</h2>
          <p className="section-subtitle">
            Des voyageurs du monde entier partagent leur expérience
          </p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <div className="author-info">{t.name}</div>
                    <div className="author-location">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Newsletter */}
      <section className="section">
        <div className="container">
          <div className="newsletter">
            <h3 className="newsletter-title">Restez informé</h3>
            <p className="section-subtitle" style={{ color: '#fef2f2' }}>
              Inscrivez-vous à notre newsletter pour recevoir les dernières actualités et offres exclusives.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}