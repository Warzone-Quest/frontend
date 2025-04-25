export interface Tournament {
  tournamentId: string;
  tournamentName: string;
  tournamentGenre: string;
  description: string;
  game: string;
  maxParticipantCount: number;
  currentParticipantCount: number;
  startTime: string;
  prizePool: number;
  bannerImage?: string;
  teamImages?: string[];
  participants?: string[];
  status: TournamentStatus;
  createdAt: string;
  updatedAt: string;
}

export enum TournamentStatus {
  DRAFT = 'DRAFT',
  LISTED = 'LISTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface TournamentParticipant {
  tournamentId: string;
  userId: string;
  status: RegistrationStatus;
  teamId?: string;
  createdAt: string;
  updatedAt: string;
}

export enum RegistrationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN'
} 