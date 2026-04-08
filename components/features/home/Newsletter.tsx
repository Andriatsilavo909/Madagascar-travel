"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { useState } from "react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-16 bg-red-600">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
          <p className="mb-8 text-red-100">
            Inscrivez-vous à notre newsletter pour recevoir les dernières actualités
            et des offres exclusives pour votre voyage à Madagascar.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              required
            />
            <Button type="submit" className="bg-white text-red-600 hover:bg-gray-100">
              S'abonner
            </Button>
          </form>

          {subscribed && (
            <p className="mt-4 text-green-200">
              ✅ Merci pour votre inscription !
            </p>
          )}
        </div>
      </div>
    </section>
  )
}