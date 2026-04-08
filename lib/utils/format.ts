/**
 * Formate une date en français
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
  }
  
  /**
   * Formate une date avec heure
   */
  export function formatDateTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(d)
  }
  
  /**
   * Tronque un texte à une longueur maximale
   */
  export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }
  
  /**
   * Capitalise la première lettre d'une chaîne
   */
  export function capitalize(str: string): string {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }
  
  /**
   * Formate un prix en Ariary (MGA)
   */
  export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }
  
  /**
   * Formate un nombre avec séparateurs de milliers
   */
  export function formatNumber(num: number): string {
    return new Intl.NumberFormat('fr-FR').format(num)
  }