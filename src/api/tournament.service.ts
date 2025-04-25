import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { Tournament, TournamentStatus, RegistrationStatus } from '@/types/tournament';

export class TournamentService {
  static async createTournament(tournament: Omit<Tournament, 'tournamentId' | 'createdAt' | 'updatedAt'>) {
    const response = await axios.post(`${API_BASE_URL}/tournaments`, tournament);
    return response.data;
  }

  static async getTournament(tournamentId: string) {
    const response = await axios.get(`${API_BASE_URL}/tournaments/${tournamentId}`);
    return response.data;
  }

  static async updateTournament(tournamentId: string, tournament: Partial<Tournament>) {
    const response = await axios.put(`${API_BASE_URL}/tournaments/${tournamentId}`, tournament);
    return response.data;
  }

  static async deleteTournament(tournamentId: string) {
    const response = await axios.delete(`${API_BASE_URL}/tournaments/${tournamentId}`);
    return response.data;
  }

  static async registerForTournament(tournamentId: string, userId: string) {
    const response = await axios.post(`${API_BASE_URL}/tournaments/${tournamentId}/register`, { userId });
    return response.data;
  }

  static async getTournamentParticipants(tournamentId: string) {
    const response = await axios.get(`${API_BASE_URL}/tournaments/${tournamentId}/participants`);
    return response.data;
  }

  static async listTournaments(status?: TournamentStatus[]) {
    const response = await axios.get(`${API_BASE_URL}/tournaments`, {
      params: { status }
    });
    return response.data;
  }
} 