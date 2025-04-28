import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TournamentStatus = 
  | "DRAFT"
  | "LISTED"
  | "LOCKED"
  | "IN_LOBBY"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface Tournament {
  tournamentId: string;
  tournamentName: string;
  tournamentGenre: string;
  description: string;
  game: string;
  moderators: string[];
  maxParticipantCount: number;
  status: TournamentStatus;
  createdBy: string;
  listingTime: string;
  locksAtTime: string;
  movesToLobbyTime: string;
  startsAtTime: string;
  endsAtTime: string;
  completedAtTime: string;
  createdAt: string;
  updatedAt: string;
  bannerImageUrl: string;
  thumbnailImageUrl: string;
  prizePool: number;
  entryFee: number;
  currentParticipants: number;
  platform: string;
  region: string;
  rules: string;
  streamUrl: string;
  isPrivate: boolean;
  tags: string[];
  customFields: Record<string, unknown>;
  metadata: Record<string, unknown>;
}

export interface TournamentState {
  tournaments: Tournament[];
  currentTournament: Tournament | null;
  loading: boolean;
  error: string | null;
}

const initialState: TournamentState = {
  tournaments: [],
  currentTournament: null,
  loading: false,
  error: null,
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    fetchTournamentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTournamentsSuccess: (state, action: PayloadAction<Tournament[]>) => {
      state.tournaments = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchTournamentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentTournament: (state, action: PayloadAction<Tournament | null>) => {
      state.currentTournament = action.payload;
    },
    updateTournament: (state, action: PayloadAction<Tournament>) => {
      const index = state.tournaments.findIndex(t => t.tournamentId === action.payload.tournamentId);
      if (index !== -1) {
        state.tournaments[index] = action.payload;
      }
      if (state.currentTournament?.tournamentId === action.payload.tournamentId) {
        state.currentTournament = action.payload;
      }
    },
    addTournament: (state, action: PayloadAction<Tournament>) => {
      state.tournaments.push(action.payload);
    },
    removeTournament: (state, action: PayloadAction<string>) => {
      state.tournaments = state.tournaments.filter(t => t.tournamentId !== action.payload);
      if (state.currentTournament?.tournamentId === action.payload) {
        state.currentTournament = null;
      }
    },
  },
});

export const {
  fetchTournamentsStart,
  fetchTournamentsSuccess,
  fetchTournamentsFailure,
  setCurrentTournament,
  updateTournament,
  addTournament,
  removeTournament,
} = tournamentSlice.actions;

export default tournamentSlice.reducer; 