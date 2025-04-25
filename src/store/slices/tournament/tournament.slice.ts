import { createSlice } from '@reduxjs/toolkit';
import { createTournamentThunk, fetchTournamentsThunk, joinTournamentThunk } from '@/store/slices/tournament/tournament.thunk';

export interface Tournament {
  id: string;
  name: string;
  game: string;
  adminId: string;
  moderators: string[];
  players: string[];
  status: 'open' | 'in-progress' | 'completed';
  maxPlayers: number;
  suggestions: { moderatorId: string; playerId: string }[];
}

export interface TournamentState {
  tournaments: Tournament[];
  activeTournament: Tournament | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: TournamentState = {
  tournaments: [],
  activeTournament: null,
  error: null,
  isLoading: false,
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setActiveTournament: (state, action) => {
      state.activeTournament = action.payload;
    },
    updateTournamentStatus: (state, action) => {
      const { tournamentId, status } = action.payload;
      const tournament = state.tournaments.find(t => t.id === tournamentId);
      if (tournament) {
        tournament.status = status;
        if (state.activeTournament && state.activeTournament.id === tournamentId) {
          state.activeTournament.status = status;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tournaments
      .addCase(fetchTournamentsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTournamentsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tournaments = action.payload;
        state.error = null;
      })
      .addCase(fetchTournamentsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create Tournament
      .addCase(createTournamentThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTournamentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tournaments.push(action.payload);
        state.error = null;
      })
      .addCase(createTournamentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Join Tournament
      .addCase(joinTournamentThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(joinTournamentThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const tournament = state.tournaments.find(t => t.id === action.payload.id);
        if (tournament) {
          if (action.payload.moderators.includes(action.payload.adminId)) {
            tournament.moderators.push(action.payload.adminId);
          } else if (action.payload.players.includes(action.payload.adminId)) {
            tournament.players.push(action.payload.adminId);
          }
          if (state.activeTournament?.id === action.payload.id) {
            state.activeTournament = { ...tournament };
          }
        }
        state.error = null;
      })
      .addCase(joinTournamentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setActiveTournament, updateTournamentStatus } = tournamentSlice.actions;
export default tournamentSlice.reducer; 