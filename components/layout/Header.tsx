"use client";

import Link from 'next/link';
import { useSession } from "next-auth/react";
import { Menu, X, Map, Home, Compass, Hotel, User } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { Sidebar } from "@/components/Sidebar";

export function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isLoading = status === "loading";
  const isAdmin = session?.user?.role === "ADMIN";
  const isGuide = session?.user?.role === "GUIDE";
  const isAuthenticated = !!session;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Accueil", icon: Home },
    { href: "/plan", label: "Carte", icon: Map },
    { href: "/lieux", label: "Lieux", icon: Compass },
    { href: "/guides", label: "Guides", icon: User },
    { href: "/hotels", label: "Hôtels", icon: Hotel },
  ];

  return (
    <>
      {/* Top bar - informations de contact */}
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
            {/* Logo */}
            <Logo />

            {/* Navigation desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    <div className="w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}

              {/* {isAuthenticated && (
                <Link
                  href="/demander-guide"
                  className="group px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium text-sm">Demander un guide</span>
                  </div>
                  <div className="w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              )} */}

              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="group px-4 py-2 rounded-lg text-gray-600 hover:text-red-600 transition-all duration-300"
                >
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
              {/* Boutons auth (uniquement si non connecté) */}
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

              {/* Menu mobile */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
              >
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
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition"
                >
                  <Icon className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">{item.label}</span>
                </Link>
              );
            })}
            {isAuthenticated && (
              <Link
                href="/demander-guide"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition"
              >
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 font-medium">Demander un guide</span>
              </Link>
            )}
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition"
              >
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

      {/* Sidebar latérale (uniquement quand connecté) */}
      {session && <Sidebar />}
    </>
  );
}