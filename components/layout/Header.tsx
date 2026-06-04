"use client";

import Link from 'next/link';
import { useSession } from "next-auth/react";
import { Menu, X, Map, Home, Compass, Hotel, User, ChevronDown, Plus, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Logo from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";

export function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const guideRef = useRef<HTMLDivElement>(null);
  
  const isLoading = status === "loading";
  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (guideRef.current && !guideRef.current.contains(e.target as Node)) {
        setGuideOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/plan", label: "Carte", icon: Map },
    { href: "/lieux", label: "Lieux", icon: Compass },
    { href: "/hotels", label: "Hôtels", icon: Hotel },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-gradient-to-r from-red-600 to-green-600 text-white text-xs py-2">
        <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span>🇲🇬 Découvrez Madagascar</span>
            <span className="text-white/40">|</span>
            <span>🏝️ Voyage sur mesure</span>
          </div>
          <div className="flex items-center gap-6">
            <span>📞 +261 34 00 000 00</span>
            <span>✉️ contact@madagascar-travel.com</span>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white border-b border-gray-100 ${scrolled ? 'shadow-md py-2' : 'py-3'}`}>
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <Logo />

            {/* Navigation desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}
                    className="group px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    <div className="w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}

              {/* Dropdown Guides */}
              <div ref={guideRef} className="relative">
                <button onClick={() => setGuideOpen(!guideOpen)}
                  className="group px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium text-sm">Guides</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${guideOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <div className={`h-0.5 bg-red-500 transition-all duration-300 ${guideOpen ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>

                {guideOpen && (
                  <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-white rounded-xl border border-gray-100 shadow-lg p-1.5 w-52 z-50">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />

                    {/* Voir les guides */}
                    <Link href="/guides" onClick={() => setGuideOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-green-50 group/item transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover/item:bg-green-200 transition-colors flex-shrink-0">
                        <BookOpen className="h-4 w-4 text-green-700" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Voir les guides</p>
                        <p className="text-xs text-gray-400">Explorer tous les guides</p>
                      </div>
                    </Link>

                    <div className="h-px bg-gray-100 my-1 mx-1" />

                    {/* Créer un guide — public */}
                    <Link href="/devenir-guide" onClick={() => setGuideOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 group/item transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover/item:bg-red-200 transition-colors flex-shrink-0">
                        <Plus className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Créer un guide</p>
                        <p className="text-xs text-gray-400">Publier votre expertise</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Lien Admin */}
              {isAdmin && (
                <Link href="/admin/dashboard"
                  className="group px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium text-sm">Admin</span>
                  </div>
                  <div className="w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              )}
            </nav>

            {/* Boutons droits */}
            <div className="flex items-center gap-3">
              {!isLoading && !session && (
                <div className="flex items-center gap-2">
                  <Link href="/auth/signin">
                    <button className="hidden sm:block px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition">
                      Connexion
                    </button>
                  </Link>
                  <Link href="/auth/register">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-medium transition shadow-md">
                      Inscription
                    </button>
                  </Link>
                </div>
              )}

              {/* Menu mobile toggle */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center">
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <div className={`lg:hidden fixed inset-x-0 top-[65px] bg-white shadow-lg transition-all duration-300 z-50 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition">
                  <Icon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* Guides mobile */}
            <Link href="/guides" onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition">
              <BookOpen className="h-5 w-5 text-green-600" />
              <span className="text-gray-700 font-medium">Voir les guides</span>
            </Link>
            <Link href="/devenir-guide" onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition">
              <Plus className="h-5 w-5 text-red-500" />
              <span className="text-gray-700 font-medium">Créer un guide</span>
            </Link>

            {isAdmin && (
              <Link href="/admin/dashboard" onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 font-medium">Admin</span>
              </Link>
            )}

            {!session && (
              <div className="pt-4 border-t mt-4">
                <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full py-3 text-center text-gray-600 font-medium">Connexion</button>
                </Link>
                <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full mt-2 bg-red-600 text-white py-3 rounded-full font-medium">Inscription</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {session && <Sidebar />}
    </>
  );
}