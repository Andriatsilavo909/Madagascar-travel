export class AppError extends Error {
    constructor(
      message: string,
      public statusCode: number = 500,
      public code?: string
    ) {
      super(message)
      this.name = 'AppError'
    }
  }
  
  export function handleError(error: unknown): { message: string; status: number } {
    if (error instanceof AppError) {
      return {
        message: error.message,
        status: error.statusCode
      }
    }
  
    if (error instanceof Error) {
      return {
        message: error.message,
        status: 500
      }
    }
  
    return {
      message: 'Une erreur inattendue est survenue',
      status: 500
    }
  }