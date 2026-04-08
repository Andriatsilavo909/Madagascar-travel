import { Region, TypeLieu } from "@prisma/client"

export const APP_NAME = 'Madagascar Travel'
export const APP_DESCRIPTION = 'Guide touristique de Madagascar - Lieux incontournables, cartes interactives et informations de voyage'

export const REGIONS: Record<Region, { nom: string, description: string }> = {
  ANTANANARIVO: {
    nom: 'Antananarivo',
    description: 'La capitale des hautes terres'
  },
  TOAMASINA: {
    nom: 'Toamasina',
    description: 'Le principal port de l\'île'
  },
  MAHAJANGA: {
    nom: 'Mahajanga',
    description: 'La ville aux baobabs'
  },
  FIANARANTSOA: {
    nom: 'Fianarantsoa',
    description: 'La ville du vin'
  },
  ANTSIRANANA: {
    nom: 'Antsiranana',
    description: 'La baie des français'
  },
  TOLIARA: {
    nom: 'Toliara',
    description: 'La porte du sud'
  }
}

export const TYPES_LIEUX: Record<TypeLieu, { nom: string, icon: string, color: string }> = {
  PARC: {
    nom: 'Parc National',
    icon: '🌳',
    color: 'green'
  },
  PLAGE: {
    nom: 'Plage',
    icon: '🏖️',
    color: 'blue'
  },
  VILLE: {
    nom: 'Ville',
    icon: '🏙️',
    color: 'gray'
  },
  MONTAGNE: {
    nom: 'Montagne',
    icon: '⛰️',
    color: 'stone'
  },
  CULTUREL: {
    nom: 'Site Culturel',
    icon: '🏛️',
    color: 'amber'
  }
}