import { RootState } from '@/store';

export const selectTournaments = (state: RootState) => state.tournament.tournaments;

export const selectActiveTournament = (state: RootState) => state.tournament.activeTournament;

export const selectTournamentById = (state: RootState, tournamentId: string) =>
  state.tournament.tournaments.find((tournament) => tournament.id === tournamentId);

export const selectTournamentError = (state: RootState) => state.tournament.error;

export const selectTournamentLoading = (state: RootState) => state.tournament.isLoading; 