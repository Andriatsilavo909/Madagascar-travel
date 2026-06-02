'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function CreerGuidePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: '', prenom: '', telephone: '', email: '',
    langues: '', diplomes: '', experience: '', specialites: '', description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('http://localhost:4000/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      router.push('/guides');
    } catch (err) {
      alert('Erreur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">Devenir guide</h1>
          <p className="text-gray-600 text-center mb-8">Rejoignez notre équipe de guides locaux</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-medium mb-1">Nom *</label>
                <input
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-1">Prénom *</label>
                <input
                  name="prenom"
                  value={form.prenom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Téléphone *</label>
              <input
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                required
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Langues parlées *</label>
              <input
                name="langues"
                value={form.langues}
                onChange={handleChange}
                placeholder="Français, Anglais"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Séparez les langues par des virgules</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-800 font-medium mb-1">Diplômes *</label>
                <input
                  name="diplomes"
                  value={form.diplomes}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-800 font-medium mb-1">Expérience *</label>
                <input
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="5 ans"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Spécialités</label>
              <input
                name="specialites"
                value={form.specialites}
                onChange={handleChange}
                placeholder="Randonnée, Culture, Nature"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-medium mb-1">Description</label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 resize-none"
                placeholder="Présentez-vous, parlez de votre expérience..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Envoi en cours...' : 'Postuler'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}