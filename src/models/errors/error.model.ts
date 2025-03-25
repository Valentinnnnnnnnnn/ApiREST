export enum ErrorType {
    BadRequest = 400, // Requête invalide
    Unauthorized = 401, // Non authentifié
    Forbidden = 403, // Accès refusé
    NotFound = 404, // Ressource non trouvée
    MethodNotAllowed = 405, // Méthode HTTP non autorisée
    Conflict = 409, // Conflit
    UnprocessableEntity = 422, // Données invalides
    InternalServerError = 500, // Erreur interne du serveur
}
  
export class CustomError extends Error {
    public status: number
    public errorName: string
  
    constructor(message: string, status: ErrorType) {
      const errorName = ErrorType[status] || 'Unknown Error'
      super(message)
      this.status = status
      this.errorName = errorName
      Object.setPrototypeOf(this, CustomError.prototype)
    }
  }