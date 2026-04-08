/**
 * Sauvegarde dans le localStorage
 */
export function setStorageItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    }
  }
  
  /**
   * Récupère du localStorage
   */
  export function getStorageItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error('Erreur lors de la récupération:', error)
      return defaultValue
    }
  }
  
  /**
   * Supprime du localStorage
   */
  export function removeStorageItem(key: string): void {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }