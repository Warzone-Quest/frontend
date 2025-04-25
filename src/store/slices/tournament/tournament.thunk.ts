import { createAsyncThunk } from '@reduxjs/toolkit';
import { tournamentApi, CreateTournamentData, JoinTournamentData } from '@/api/tournament.api';

export const fetchTournamentsThunk = createAsyncThunk(
  'tournament/fetchTournaments',
  async (_, { rejectWithValue }) => {
    try {
      return await tournamentApi.fetchTournaments();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch tournaments');
    }
  }
);

export const createTournamentThunk = createAsyncThunk(
  'tournament/createTournament',
  async (data: CreateTournamentData, { rejectWithValue }) => {
    try {
      return await tournamentApi.createTournament(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create tournament');
    }
  }
);

export const joinTournamentThunk = createAsyncThunk(
  'tournament/joinTournament',
  async (data: JoinTournamentData, { rejectWithValue }) => {
    try {
      return await tournamentApi.joinTournament(data);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to join tournament');
    }
  }
); 