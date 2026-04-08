"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('Hero')

  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Contenu traduit */}
      <div className="relative container h-full flex items-center justify-center">
        <div className="text-center text-white max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl">
            {t('title')}{' '}
            <span className="text-red-500">Madagascar</span>
          </h1>
          <p className="mb-8 text-xl md:text-2xl text-gray-200">
            {t('subtitle')}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/lieux">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white min-w-[200px]">
                {t('explore')}
              </Button>
            </Link>
            <Link href="/plan">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 min-w-[200px]">
                {t('viewMap')}
              </Button>
            </Link>
          </div>

          {/* Statistiques (optionnellement traduisibles) */}
          <div className="mt-16 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-red-500">6</div>
              <div className="text-sm text-gray-300">{t('regions')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">50+</div>
              <div className="text-sm text-gray-300">{t('uniquePlaces')}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-500">1000+</div>
              <div className="text-sm text-gray-300">{t('visitors')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}