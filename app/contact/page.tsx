'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoading = status === 'loading';

  // Si l'utilisateur n'est pas connecté, on affiche un message
  if (!isLoading && !session) {
    return (
      <div className="container py-12 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Planifier mon voyage</h1>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <p className="text-yellow-800 mb-4">
            Vous devez être connecté pour effectuer une demande de voyage.
          </p>
          <Button
            onClick={() => router.push('/auth/signin')}
            className="bg-red-600 hover:bg-red-700"
          >
            Se connecter
          </Button>
          <p className="mt-4 text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <button
              onClick={() => router.push('/auth/register')}
              className="text-red-600 hover:underline"
            >
              Créer un compte
            </button>
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 5000);
      } else {
        alert(data.error || 'Erreur lors de l’envoi');
      }
    } catch (error) {
      alert('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Planifier mon voyage</h1>
      <p className="text-gray-600 mb-8">
        Remplissez ce formulaire, notre équipe vous contactera dans les 48h.
      </p>
      {sent && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          ✅ Message envoyé ! Nous vous répondrons très vite.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Nom complet *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Votre projet / demande *</label>
          <textarea
            rows={5}
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            placeholder="Dites-nous vos envies : circuits, dates, nombre de personnes, etc."
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
        >
          {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
        </Button>
      </form>
    </div>
  );
}