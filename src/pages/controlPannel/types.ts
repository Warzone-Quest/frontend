export type UserRole = 'admin' | 'moderator' | 'player';

export interface Stream {
  id: string;
  playerName: string;
  userId: string;
  tournamentId: string;
  isActive: boolean;
  quality: 'HD' | 'SD';
  viewers: number;
  startTime: string;
  endTime?: string;
  streamUrl: string;
  thumbnailUrl?: string;
  status: 'live' | 'ended' | 'scheduled';
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  type: 'suggestion' | 'alert' | 'message' | 'report';
  status: 'pending' | 'approved' | 'rejected' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category?: string;
  attachments?: string[];
}

export interface UserStats {
  userId: string;
  username: string;
  role: UserRole;
  tournamentsPlayed: number;
  tournamentsWon: number;
  totalPoints: number;
  winRate: number;
  lastActive: string;
  status: 'online' | 'offline' | 'in-game';
}

export interface TournamentStats {
  tournamentId: string;
  tournamentName: string;
  totalParticipants: number;
  activeParticipants: number;
  matchesCompleted: number;
  totalMatches: number;
  averageViewers: number;
  peakViewers: number;
  startTime: string;
  endTime?: string;
  status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled';
}

export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalTournaments: number;
  activeTournaments: number;
  totalStreams: number;
  activeStreams: number;
  totalReports: number;
  pendingReports: number;
  revenue: number;
  growth: {
    users: number;
    tournaments: number;
    revenue: number;
  };
}

export interface ModeratorDashboardStats {
  assignedTournaments: number;
  activeTournaments: number;
  pendingReports: number;
  resolvedReports: number;
  activeStreams: number;
  totalMessages: number;
  unreadMessages: number;
}

export interface PlayerDashboardStats {
  activeTournaments: number;
  completedTournaments: number;
  totalPoints: number;
  currentRank: number;
  matchesPlayed: number;
  matchesWon: number;
  winRate: number;
  nextMatch?: {
    tournamentId: string;
    tournamentName: string;
    opponent: string;
    scheduledTime: string;
  };
} 