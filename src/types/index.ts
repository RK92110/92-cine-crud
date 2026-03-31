export type Role = 
  | 'ADHERENT_ADULTE' 
  | 'ADHERENT_MINEUR' 
  | 'INSTRUCTEUR_FILM' 
  | 'ANIMATEUR_CINE' 
  | 'ADMIN'

export type TypeSeance = 
  | 'PROJECTION' 
  | 'AVANT_PREMIERE' 
  | 'REPRISE' 
  | 'ATELIER_CINEMA' 
  | 'CINE_DEBAT'

export type StatutSeance = 
  | 'PLANIFIEE' 
  | 'EN_COURS' 
  | 'TERMINEE' 
  | 'ANNULEE'

export type ClassificationFilm = 
  | 'TOUS_PUBLICS' 
  | 'MOINS_10' 
  | 'MOINS_12' 
  | 'MOINS_16' 
  | 'MOINS_18'

export interface Film {
  id: number
  titre: string
  synopsis?: string
  realisateur: string
  annee?: number
  duree: number
  genre: string
  classification: ClassificationFilm
  version: 'VF' | 'VO' | 'VOST' | 'VFST'
  affiche?: string
  disponible: boolean
}

export interface Session {
  id: number
  type: TypeSeance
  filmId: number
  film?: Film
  titre?: string
  description?: string
  date: string
  duree: number
  salleId?: number
  salle?: Salle
  instructeurId?: number
  instructeur?: User
  capaciteMax?: number
  statut: StatutSeance
}

export interface Salle {
  id: number
  name: string
  cinema: string
  capacity: number
  type: string
  disponible: boolean
}

// Minimal User interface to satisfy references
export interface User {
  id: number
  email: string
  name: string
  role: Role
}
