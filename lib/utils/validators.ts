/**
 * Valide une adresse email
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  /**
   * Valide un mot de passe (min 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre)
   */
  export function isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return passwordRegex.test(password)
  }
  
  /**
   * Valide des coordonnées GPS
   */
  export function isValidCoordinates(lat: number, lng: number): boolean {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
  }
  
  /**
   * Valide une URL d'image
   */
  export function isValidImageUrl(url: string): boolean {
    try {
      new URL(url)
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
    } catch {
      return false
    }
  }