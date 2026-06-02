'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin, Briefcase, GraduationCap, Languages, Award } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<'CLIENT' | 'GUIDE'>('CLIENT')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    adminKey: '',
    // Champs spécifiques guide
    guideNom: '',
    guidePrenom: '',
    guideTelephone: '',
    guideEmail: '',
    guideLangues: '',
    guideDiplomes: '',
    guideExperience: '',
    guideSpecialites: '',
    guideDescription: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide'
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit faire au moins 6 caractères'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas'
    }

    // Validation des champs guide
    if (selectedRole === 'GUIDE') {
      if (!formData.guideNom.trim()) newErrors.guideNom = 'Le nom est requis'
      if (!formData.guidePrenom.trim()) newErrors.guidePrenom = 'Le prénom est requis'
      if (!formData.guideTelephone.trim()) newErrors.guideTelephone = 'Le téléphone est requis'
      if (!formData.guideLangues.trim()) newErrors.guideLangues = 'Les langues parlées sont requises'
      if (!formData.guideDiplomes.trim()) newErrors.guideDiplomes = 'Les diplômes sont requis'
      if (!formData.guideExperience.trim()) newErrors.guideExperience = 'L\'expérience est requise'
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setApiError('')

    try {
      // Appel direct au backend Express sur le port 4000
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          adminKey: formData.adminKey,
          role: selectedRole,
          guideData: selectedRole === 'GUIDE' ? {
            nom: formData.guideNom,
            prenom: formData.guidePrenom,
            telephone: formData.guideTelephone,
            email: formData.guideEmail,
            langues: formData.guideLangues,
            diplomes: formData.guideDiplomes,
            experience: formData.guideExperience,
            specialites: formData.guideSpecialites,
            description: formData.guideDescription,
          } : null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription')
      }

      router.push('/auth/signin?registered=true')
    } catch (error: any) {
      setApiError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const isGuide = selectedRole === 'GUIDE'

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-3xl font-bold">
            <span className="text-red-600">Madagascar</span>
            <span className="text-green-600">Travel</span>
          </Link>
          <p className="text-gray-600 mt-2">
            Créez votre compte pour commencer l'aventure
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {apiError && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nom complet */}
            <div>
              <label className="block text-sm font-medium mb-1">Nom complet</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Jean Rakoto"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="votre@email.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone (optionnel)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition"
                  placeholder="+261 34 00 000 00"
                />
              </div>
            </div>

            {/* Choix du rôle */}
            <div>
              <label className="block text-sm font-medium mb-2">Je souhaite m'inscrire en tant que</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole('CLIENT')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
                    selectedRole === 'CLIENT'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">Client</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('GUIDE')}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition ${
                    selectedRole === 'GUIDE'
                      ? 'border-red-600 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Briefcase className="h-5 w-5" />
                  <span className="font-medium">Guide</span>
                </button>
              </div>
            </div>

            {/* Code administrateur (visible uniquement pour client) */}
            {!isGuide && (
              <div>
                <label className="block text-sm font-medium mb-1">Code administrateur (si vous en avez un)</label>
                <input
                  type="password"
                  name="adminKey"
                  value={formData.adminKey}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition"
                  placeholder="Laisser vide pour un compte client"
                />
              </div>
            )}

            {/* Champs spécifiques guide */}
            {isGuide && (
              <div className="border-t pt-4 mt-2">
                <h3 className="text-md font-semibold mb-3 text-gray-700 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-red-600" />
                  Informations professionnelles
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nom *</label>
                      <input
                        type="text"
                        name="guideNom"
                        value={formData.guideNom}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                          errors.guideNom ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Votre nom"
                      />
                      {errors.guideNom && <p className="mt-1 text-sm text-red-600">{errors.guideNom}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Prénom *</label>
                      <input
                        type="text"
                        name="guidePrenom"
                        value={formData.guidePrenom}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                          errors.guidePrenom ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Votre prénom"
                      />
                      {errors.guidePrenom && <p className="mt-1 text-sm text-red-600">{errors.guidePrenom}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Téléphone professionnel *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="guideTelephone"
                        value={formData.guideTelephone}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                          errors.guideTelephone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+261 34 00 000 00"
                      />
                    </div>
                    {errors.guideTelephone && <p className="mt-1 text-sm text-red-600">{errors.guideTelephone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email professionnel</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="guideEmail"
                        value={formData.guideEmail}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition"
                        placeholder="guide@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                      <Languages className="h-4 w-4" />
                      Langues parlées * (séparées par des virgules)
                    </label>
                    <input
                      type="text"
                      name="guideLangues"
                      value={formData.guideLangues}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                        errors.guideLangues ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Français, Anglais, Espagnol"
                    />
                    {errors.guideLangues && <p className="mt-1 text-sm text-red-600">{errors.guideLangues}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Diplômes / Certifications *
                    </label>
                    <textarea
                      name="guideDiplomes"
                      value={formData.guideDiplomes}
                      onChange={handleChange}
                      rows={2}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                        errors.guideDiplomes ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Licence en tourisme, Certificat de guide, etc."
                    />
                    {errors.guideDiplomes && <p className="mt-1 text-sm text-red-600">{errors.guideDiplomes}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Années d'expérience *
                    </label>
                    <input
                      type="text"
                      name="guideExperience"
                      value={formData.guideExperience}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                        errors.guideExperience ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="5 ans d'expérience comme guide"
                    />
                    {errors.guideExperience && <p className="mt-1 text-sm text-red-600">{errors.guideExperience}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Spécialités (ex: randonnée, culture, nature)</label>
                    <input
                      type="text"
                      name="guideSpecialites"
                      value={formData.guideSpecialites}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition"
                      placeholder="Randonnée, Culture, Faune, Plongée..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description / Présentation</label>
                    <textarea
                      name="guideDescription"
                      value={formData.guideDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition"
                      placeholder="Présentez-vous, vos motivations, vos circuits proposés..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Confirmer mot de passe */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Conditions */}
            <div className="flex items-start">
              <input type="checkbox" id="terms" className="mt-1 mr-2" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                J'accepte les <Link href="/terms" className="text-red-600 hover:underline">conditions d'utilisation</Link> et la <Link href="/privacy" className="text-red-600 hover:underline">politique de confidentialité</Link>
              </label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold rounded-lg">
              {isLoading ? 'Création...' : (isGuide ? 'Créer mon compte guide' : 'Créer mon compte')}
            </Button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Déjà un compte ?{' '}
            <Link href="/auth/signin" className="text-red-600 hover:text-red-700 font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p className="flex items-center justify-center gap-1">
            <MapPin className="h-4 w-4" />
            Rejoignez des milliers de voyageurs
          </p>
        </div>
      </div>
    </div>
  )
}