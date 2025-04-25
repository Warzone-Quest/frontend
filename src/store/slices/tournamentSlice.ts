import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TournamentService } from '@/api/tournament.service';
import { Tournament, TournamentParticipant } from '@/types/tournament';

export interface TournamentState {
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  participants: TournamentParticipant[];
  loading: boolean;
  error: string | null;
}

const initialState: TournamentState = {
  tournaments: [],
  currentTournament: null,
  participants: [],
  loading: false,
  error: null,
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTournaments: (state, action: PayloadAction<Tournament[]>) => {
      state.tournaments = action.payload;
    },
    setCurrentTournament: (state, action: PayloadAction<Tournament | null>) => {
      state.currentTournament = action.payload;
    },
    setParticipants: (state, action: PayloadAction<TournamentParticipant[]>) => {
      state.participants = action.payload;
    },
    addTournament: (state, action: PayloadAction<Tournament>) => {
      state.tournaments.push(action.payload);
    },
    updateTournament: (state, action: PayloadAction<Tournament>) => {
      const index = state.tournaments.findIndex((t: Tournament) => t.tournamentId === action.payload.tournamentId);
      if (index !== -1) {
        state.tournaments[index] = action.payload;
      }
      if (state.currentTournament?.tournamentId === action.payload.tournamentId) {
        state.currentTournament = action.payload;
      }
    },
    removeTournament: (state, action: PayloadAction<string>) => {
      state.tournaments = state.tournaments.filter((t: Tournament) => t.tournamentId !== action.payload);
      if (state.currentTournament?.tournamentId === action.payload) {
        state.currentTournament = null;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setTournaments,
  setCurrentTournament,
  setParticipants,
  addTournament,
  updateTournament,
  removeTournament,
} = tournamentSlice.actions;

// Thunks
export const fetchTournaments = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const tournaments = await TournamentService.listTournaments();
    dispatch(setTournaments(tournaments));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchTournament = (tournamentId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const tournament = await TournamentService.getTournament(tournamentId);
    dispatch(setCurrentTournament(tournament));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTournament = (data: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const tournament = await TournamentService.createTournament(data);
    dispatch(addTournament(tournament));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateTournamentDetails = (tournamentId: string, data: any) => 
  async (dispatch: any) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const tournament = await TournamentService.updateTournament(tournamentId, data);
      dispatch(updateTournament(tournament));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteTournamentAction = (tournamentId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await TournamentService.deleteTournament(tournamentId);
    dispatch(removeTournament(tournamentId));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchParticipants = (tournamentId: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));
    const participants = await TournamentService.getTournamentParticipants(tournamentId);
    dispatch(setParticipants(participants));
  } catch (error: any) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default tournamentSlice.reducer; 