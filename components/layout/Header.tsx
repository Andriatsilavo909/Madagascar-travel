"use client";

import Link from 'next/link';
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X, Map, Home, Compass, Hotel } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoading = status === "loading";
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-red-600">Madagascar</span>
          <span className="text-2xl font-bold text-green-600">Travel</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-red-600 transition">
            <Home className="h-4 w-4 mr-1" />
            Accueil
          </Link>
          <Link href="/plan" className="flex items-center text-gray-600 hover:text-red-600 transition">
            <Map className="h-4 w-4 mr-1" />
            Carte
          </Link>
          <Link href="/lieux" className="flex items-center text-gray-600 hover:text-red-600 transition">
            <Compass className="h-4 w-4 mr-1" />
            Lieux
          </Link>
          <Link href="/guides" className="flex items-center text-gray-600 hover:text-red-600 transition">
            Guides
          </Link>
          <Link href="/hotels" className="flex items-center text-gray-600 hover:text-red-600 transition">
            <Hotel className="h-4 w-4 mr-1" />
            Hôtels
          </Link>
          {isAdmin && (
            <Link href="/admin/dashboard" className="flex items-center text-gray-600 hover:text-red-600 transition">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {!isLoading && !session ? (
            <>
              <Link href="/auth/signin" className="hidden md:block">
                <Button variant="ghost">Se connecter</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-red-600 hover:bg-red-700">S'inscrire</Button>
              </Link>
            </>
          ) : session ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-sm text-gray-600">
                {session.user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Déconnexion
              </Button>
            </div>
          ) : null}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-white">
          <nav className="flex flex-col gap-4">
            <Link href="/" className="flex items-center text-gray-600" onClick={() => setIsMenuOpen(false)}>
              <Home className="h-4 w-4 mr-2" />
              Accueil
            </Link>
            <Link href="/plan" className="flex items-center text-gray-600" onClick={() => setIsMenuOpen(false)}>
              <Map className="h-4 w-4 mr-2" />
              Carte
            </Link>
            <Link href="/lieux" className="flex items-center text-gray-600" onClick={() => setIsMenuOpen(false)}>
              <Compass className="h-4 w-4 mr-2" />
              Lieux
            </Link>
            <Link href="/guides" className="flex items-center text-gray-600" onClick={() => setIsMenuOpen(false)}>
              Guides
            </Link>
            <Link href="/hotels" className="flex items-center text-gray-600" onClick={() => setIsMenuOpen(false)}>
              <Hotel className="h-4 w-4 mr-2" />
              Hôtels
            </Link>
            {isAdmin && (
              <Link href="/admin/lieux" className="flex items-center text-gray-600" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}