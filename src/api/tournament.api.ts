import axiosInstance from '@/api/axiosConfig';
import { API_ENDPOINTS, ERROR_MESSAGES, STATUS_CODES } from '@/config/constants';
import { AxiosError } from 'axios';
import { ApiError } from './user.api';

export type TournamentStatus = 
  | "DRAFT"
  | "LISTED"
  | "LOCKED"
  | "IN_LOBBY"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface TournamentModel {
  tournamentId: string;
  tournamentName: string;
  tournamentGenre: string;
  description: string;
  game: string;
  moderators: string[];
  maxParticipantCount: number;
  status: TournamentStatus;
  createdBy: string;
  listingTime: string;  // ISO date string
  locksAtTime: string;  // ISO date string
  movesToLobbyTime: string;  // ISO date string
  startsAtTime: string;  // ISO date string
  endsAtTime: string;  // ISO date string
  completedAtTime: string;  // ISO date string
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
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

export type RegistrationStatus = 
  | "PENDING"
  | "APPROVED"
  | "REJECTED";

export interface RegistrationModel {
  tournamentId: string;
  userId: string;
  status: RegistrationStatus;
  teamId?: string;  // Optional
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
}

// Constants for RegistrationStatus
export const RegistrationStatusPending: RegistrationStatus = "PENDING";
export const RegistrationStatusApproved: RegistrationStatus = "APPROVED";
export const RegistrationStatusRejected: RegistrationStatus = "REJECTED";

// Constants for TournamentStatus
export const TournamentStatusDraft: TournamentStatus = "DRAFT";
export const TournamentStatusListed: TournamentStatus = "LISTED";
export const TournamentStatusLocked: TournamentStatus = "LOCKED";
export const TournamentStatusInLobby: TournamentStatus = "IN_LOBBY";
export const TournamentStatusInProgress: TournamentStatus = "IN_PROGRESS";
export const TournamentStatusCompleted: TournamentStatus = "COMPLETED";
export const TournamentStatusCancelled: TournamentStatus = "CANCELLED";

export const tournamentApi = {
  fetchAllTournaments: async (status?: TournamentStatus): Promise<TournamentModel[]> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.TOURNAMENT.FETCH_ALL, { params: { status } });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.TOURNAMENT.FETCH_ALL,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;;
    }
  },

  fetchTournament: async (tournamentId: string): Promise<TournamentModel> => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.TOURNAMENT.FETCH.replace(':tournamentId', tournamentId));
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.TOURNAMENT.FETCH,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;;
    }
  },

  createTournament: async (data: TournamentModel): Promise<TournamentModel> => {
    try {
      const response = await axiosInstance.post(API_ENDPOINTS.TOURNAMENT.CREATE, data);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.TOURNAMENT.CREATE,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;;
    }
  },

  updateTournament: async (tournamentId: string, data: TournamentModel): Promise<TournamentModel> => {
    try {
      const response = await axiosInstance.put(
        API_ENDPOINTS.TOURNAMENT.UPDATE.replace(':tournamentId', tournamentId),
        data
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.TOURNAMENT.UPDATE,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;;
    }
  },

  deleteTournament: async (tournamentId: string): Promise<void> => {
    try {
      await axiosInstance.delete(API_ENDPOINTS.TOURNAMENT.DELETE.replace(':tournamentId', tournamentId));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.TOURNAMENT.DELETE,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;;
    }
  },

  joinTournament: async (data: { tournamentId: string}): Promise<RegistrationModel> => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.TOURNAMENT.JOIN.replace(':tournamentId', data.tournamentId),
        {}
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.TOURNAMENT.JOIN,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;;
    }
  },

  leaveTournament: async (tournamentId: string, userId: string): Promise<void> => {
    try {
      await axiosInstance.post(
        API_ENDPOINTS.TOURNAMENT.LEAVE.replace(':tournamentId', tournamentId),
        { userId }
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.TOURNAMENT.LEAVE,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;;
    }
  },

  getParticipants: async (tournamentId: string): Promise<RegistrationModel[]> => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.TOURNAMENT.GET_PARTICIPANTS.replace(':tournamentId', tournamentId)
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.TOURNAMENT.GET_PARTICIPANTS,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;;
    }
  },

  fetchParticipatedTournaments: async (userId: string): Promise<RegistrationModel[]> => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.TOURNAMENT.FETCH_PARTICIPATED.replace(':userId', userId)
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.TOURNAMENT.FETCH_PARTICIPATED,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;;
    }
  },
};
