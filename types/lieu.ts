// Fonction pour parser les images JSON en tableau
import { Lieu } from '@prisma/client'
export function parseImages(imagesJson: string): string[] {
  try {
    const parsed = JSON.parse(imagesJson)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Erreur parsing images:', error)
    return []
  }
}

export function stringifyImages(images: string[]): string {
  return JSON.stringify(images)
}

// Labels pour les régions (À AJOUTER)
export const RegionLabels: Record<string, string> = {
  ANTANANARIVO: "Antananarivo",
  TOAMASINA: "Toamasina",
  MAHAJANGA: "Mahajanga",
  FIANARANTSOA: "Fianarantsoa",
  ANTSIRANANA: "Antsiranana",
  TOLIARA: "Toliara",
}

// Labels pour les types de lieux (À AJOUTER)
export const TypeLieuLabels: Record<string, string> = {
  PARC: "Parc National",
  PLAGE: "Plage",
  VILLE: "Ville",
  MONTAGNE: "Montagne",
  CULTUREL: "Site Culturel",
}

// Types pour les régions
export type Region = keyof typeof RegionLabels

// Types pour les types de lieux
export type TypeLieu = keyof typeof TypeLieuLabels