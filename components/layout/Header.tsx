"use client";

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X, Map, Home, Compass, Hotel, User, LogOut, Globe, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { useTheme } from "next-themes";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const isLoading = status === "loading";
  const isAdmin = session?.user?.role === "ADMIN";
  const isGuide = session?.user?.role === "GUIDE";
  const isAuthenticated = !!session;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
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
      {/* Top bar */}
      <div className="hidden md:block bg-gradient-to-r from-red-600 to-green-600 text-white text-xs py-1.5">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>🇲🇬 Découvrez Madagascar</span>
            <span>✦</span>
            <span>🏝️ Voyage sur mesure</span>
          </div>
          <div className="flex items-center gap-4">
            <span>📞 +261 34 00 000 00</span>
            <span>✉️ contact@madagascar-travel.com</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          scrolled 
            ? 'bg-white/98 backdrop-blur-md shadow-lg py-2' 
            : 'bg-white/95 backdrop-blur-sm py-3'
        } border-b border-gray-100`}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="transform transition-all duration-300 hover:scale-105">
              <Logo />
            </div>

            {/* Navigation desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative px-4 py-2 rounded-xl text-gray-600 hover:text-red-600 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  </Link>
                );
              })}

              {/* Lien conditionnel guide */}
              <Link
                href="/espace-guide"
                className="group relative px-4 py-2 rounded-xl text-gray-600 hover:text-red-600 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="font-medium">{isGuide ? 'Espace guide' : 'Devenir guide'}</span>
                </div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </Link>

              {isAuthenticated && (
                <>
                  <Link
                    href="/demander-guide"
                    className="group relative px-4 py-2 rounded-xl text-gray-600 hover:text-red-600 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <span className="font-medium">Demander un guide</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  </Link>

                  <Link
                    href="/mon-compte"
                    className="group relative px-4 py-2 rounded-xl text-gray-600 hover:text-red-600 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 transition-transform group-hover:scale-110" />
                      <span className="font-medium">Mon compte</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  </Link>
                </>
              )}

              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="group relative px-4 py-2 rounded-xl text-gray-600 hover:text-red-600 transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="font-medium">Admin</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                </Link>
              )}
            </nav>

            {/* Actions droite */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Theme toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="hidden md:flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              )}

              {/* Auth buttons */}
              {!isLoading && !session ? (
                <div className="flex items-center gap-2">
                  <Link href="/auth/signin">
                    <Button variant="ghost" className="hidden sm:flex rounded-full hover:bg-red-50 hover:text-red-600 transition-all duration-300">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-full px-5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Inscription
                    </Button>
                  </Link>
                </div>
              ) : session ? (
                <div className="flex items-center gap-3">
                  <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-50 to-green-50">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center text-white text-xs font-bold">
                      {session.user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {session.user?.name}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="rounded-full border-red-200 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300"
                  >
                    <LogOut className="h-3.5 w-3.5 mr-1" />
                    Sortie
                  </Button>
                </div>
              ) : null}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
              >
                <div className={`transition-all duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
                  {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden fixed inset-x-0 top-[72px] bg-white shadow-xl transition-all duration-500 z-40 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="container py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-300 group"
                >
                  <Icon className="h-5 w-5 text-gray-500 group-hover:text-red-600 transition-colors" />
                  <span className="text-gray-700 group-hover:text-red-600 font-medium">{item.label}</span>
                </Link>
              );
            })}

            <Link
              href="/espace-guide"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-300 group"
            >
              <Compass className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
              <span className="text-gray-700 group-hover:text-red-600 font-medium">
                {isGuide ? 'Espace guide' : 'Devenir guide'}
              </span>
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  href="/demander-guide"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-300 group"
                >
                  <User className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
                  <span className="text-gray-700 group-hover:text-red-600 font-medium">Demander un guide</span>
                </Link>
                <Link
                  href="/mon-compte"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-300 group"
                >
                  <User className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
                  <span className="text-gray-700 group-hover:text-red-600 font-medium">Mon compte</span>
                </Link>
              </>
            )}

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-300 group"
              >
                <User className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
                <span className="text-gray-700 group-hover:text-red-600 font-medium">Admin</span>
              </Link>
            )}

            <div className="pt-4 mt-4 border-t border-gray-100">
              {!session ? (
                <div className="flex flex-col gap-2">
                  <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full">Connexion</Button>
                  </Link>
                  <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 rounded-full">Inscription</Button>
                  </Link>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setIsMenuOpen(false);
                  }}
                  className="w-full rounded-full border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}