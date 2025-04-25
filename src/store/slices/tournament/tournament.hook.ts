import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { createTournamentThunk, fetchTournamentsThunk, joinTournamentThunk } from '@/store/slices/tournament/tournament.thunk';
import { setActiveTournament, updateTournamentStatus } from '@/store/slices/tournament/tournament.slice';

import {
  selectTournaments,
  selectActiveTournament,
  selectTournamentError,
  selectTournamentLoading,
} from '@/store/slices/tournament/tournament.selector';

export const useTournaments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tournaments = useSelector(selectTournaments);
  const isLoading = useSelector(selectTournamentLoading);
  const error = useSelector(selectTournamentError);

  const fetchTournaments = () => dispatch(fetchTournamentsThunk());

  return {
    tournaments,
    isLoading,
    error,
    fetchTournaments,
  };
};

export const useActiveTournament = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeTournament = useSelector(selectActiveTournament);

  const setActive = (tournament: any) => dispatch(setActiveTournament(tournament));
  const updateStatus = (tournamentId: string, status: 'open' | 'in-progress' | 'completed') =>
    dispatch(updateTournamentStatus({ tournamentId, status }));

  return {
    activeTournament,
    setActive,
    updateStatus,
  };
};

export const useCreateTournament = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectTournamentLoading);
  const error = useSelector(selectTournamentError);

  const createTournament = (data: { name: string; game: string; maxPlayers: number }) =>
    dispatch(createTournamentThunk(data));

  return {
    createTournament,
    isLoading,
    error,
  };
};

export const useJoinTournament = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectTournamentLoading);
  const error = useSelector(selectTournamentError);

  const joinTournament = (tournamentId: string, userId: string, role: 'moderator' | 'player') =>
    dispatch(joinTournamentThunk({ tournamentId, userId, role }));

  return {
    joinTournament,
    isLoading,
    error,
  };
}; 