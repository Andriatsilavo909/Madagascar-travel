'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Tentative connexion avec:', email)
      
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      console.log('Résultat complet:', result)

      if (result?.error) {
        setError(`Erreur: ${result.error}`)
      } else if (result?.ok) {
        console.log('Connexion réussie, récupération de la session...')
        
        // Récupérer la session pour connaître le rôle
        const session = await getSession()
        if (session?.user?.role === 'ADMIN') {
          router.push('/admin/lieux') // Redirection vers le dashboard admin
        } else {
          router.push('/') // Redirection vers la page d'accueil pour les clients
        }
        router.refresh() // Force le rechargement des composants serveurs
      }
    } catch (err) {
      console.error('Exception:', err)
      setError('Exception: ' + String(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-green-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center">Connexion</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium disabled:opacity-50"
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Pas de compte ?{' '}
          <Link href="/auth/register" className="text-red-600 hover:underline font-semibold">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}