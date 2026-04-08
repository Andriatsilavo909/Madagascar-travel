'use client'
import { Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Home, List, PlusCircle, LogOut, BookOpen } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/admin/lieux', label: 'Tous les lieux', icon: List },
    { href: '/admin/lieux/ajout', label: 'Ajouter un lieu', icon: PlusCircle },
    { href: '/admin/guides', label: 'Guides', icon: BookOpen },
    { href: '/admin/utilisateurs', label: 'Utilisateurs', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-red-600">Admin</h2>
          <p className="text-sm text-gray-500">Gestion des lieux</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 p-2 rounded-md transition ${
                      isActive
                        ? 'bg-red-100 text-red-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                Déconnexion
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  )
}