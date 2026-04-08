import { type ClassValue } from "clsx"
import { cn } from "./cn"

/**
 * Génère un slug à partir d'un nom
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

/**
 * Génère un ID unique simple
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Groupe un tableau par une clé
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

/**
 * Trie un tableau par date
 */
export function sortByDate<T extends { createdAt: Date }>(array: T[], ascending = false): T[] {
  return [...array].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime()
    const dateB = new Date(b.createdAt).getTime()
    return ascending ? dateA - dateB : dateB - dateA
  })
}