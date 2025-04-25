import axios from 'axios';
import { Tournament } from '@/store/slices/tournament/tournament.slice';

export interface CreateTournamentData {
  name: string;
  game: string;
  maxPlayers: number;
}

export interface JoinTournamentData {
  tournamentId: string;
  userId: string;
  role: 'moderator' | 'player';
}

export const tournamentApi = {
  fetchTournaments: async (): Promise<Tournament[]> => {
    const response = await axios.get('/api/tournaments');
    return response.data;
  },

  createTournament: async (data: CreateTournamentData): Promise<Tournament> => {
    const response = await axios.post('/api/tournaments', data);
    return response.data;
  },

  joinTournament: async (data: JoinTournamentData): Promise<Tournament> => {
    const response = await axios.post(`/api/tournaments/${data.tournamentId}/join`, {
      userId: data.userId,
      role: data.role,
    });
    return response.data;
  },
}; 