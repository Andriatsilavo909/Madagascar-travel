'use client';

import Link from 'next/link';  // ← AJOUTE CETTE LIGNE
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from 'next/navigation';
import { LogOut, Sun, Moon, X, User, Compass } from "lucide-react";
import { useState, useEffect } from "react";

export function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!session) return null;

  const isGuide = session?.user?.role === "GUIDE";
  const isAdmin = session?.user?.role === "ADMIN";

  const changeLanguage = (lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/`;
    router.refresh();
  };

  return (
    <>
      {/* Bouton pour ouvrir la sidebar */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center lg:flex transition-all hover:scale-105"
      >
        <User className="h-5 w-5 text-gray-600" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* En-tête */}
        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">Mon compte</h2>
          <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Profil utilisateur */}
        <div className="p-5 border-b">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center text-white text-xl font-bold">
              {session.user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{session.user?.name}</p>
              <p className="text-sm text-gray-500">{session.user?.email}</p>
              <p className="text-xs text-gray-400 mt-1 capitalize">Rôle : {session.user?.role?.toLowerCase()}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex-1 p-5 space-y-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Préférences</p>
          
          {/* Mode sombre */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition group"
            >
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-indigo-500" />}
                <span className="text-gray-700">{theme === 'dark' ? 'Mode clair' : 'Mode sombre'}</span>
              </div>
              <span className="text-xs text-gray-400">Changer</span>
            </button>
          )}

          {/* Langue */}
          <div className="p-3 rounded-xl hover:bg-gray-50 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-lg">🌐</span>
                <span className="text-gray-700">Langue</span>
              </div>
            </div>
            <div className="flex gap-2 ml-8">
              <button
                onClick={() => changeLanguage('fr')}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 transition"
              >
                Français
              </button>
              <button
                onClick={() => changeLanguage('en')}
                className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 transition"
              >
                English
              </button>
            </div>
          </div>

          <div className="border-t my-4"></div>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Navigation rapide</p>
          
          {isGuide && (
            <Link
              href="/espace-guide"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition group"
            >
              <Compass className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
              <span className="text-gray-700 group-hover:text-red-600">Espace guide</span>
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition group"
            >
              <User className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
              <span className="text-gray-700 group-hover:text-red-600">Administration</span>
            </Link>
          )}

          <Link
            href="/mon-compte"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition group"
          >
            <User className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
            <span className="text-gray-700 group-hover:text-red-600">Mon compte</span>
          </Link>
        </div>

        {/* Déconnexion */}
        <div className="p-5 border-t">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition font-medium"
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </button>
          <p className="text-center text-xs text-gray-400 mt-4">Madagascar Travel v1.0</p>
        </div>
      </aside>
    </>
  );
}