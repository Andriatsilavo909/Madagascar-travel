import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Madagascar Travel</h3>
            <p className="text-sm text-gray-400">
              Votre guide complet pour découvrir les merveilles de Madagascar. 
              Des plages paradisiaques aux parcs nationaux uniques.
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/plan" className="text-gray-400 hover:text-white">
                  Carte interactive
                </Link>
              </li>
              <li>
                <Link href="/lieux" className="text-gray-400 hover:text-white">
                  Tous les lieux
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-gray-400 hover:text-white">
                  À propos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-red-500" />
                <span className="text-gray-400">contact@madagascar-travel.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-red-500" />
                <span className="text-gray-400">+261 34 00 000 00</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-red-500" />
                <span className="text-gray-400">Antananarivo, Madagascar</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Recevez nos dernières actualités et offres spéciales
            </p>
            <form className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Votre email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                S'abonner
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Madagascar Travel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}