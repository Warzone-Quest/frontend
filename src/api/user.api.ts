import axiosInstance from '@/api/axiosConfig';
import { AxiosError } from 'axios';
import { API_ENDPOINTS, ERROR_MESSAGES, STATUS_CODES } from '@/config/constants';

export interface UserProfileModel {
  userId: string;
  userEmailId: string;
  password: string;
  name: string;
  profileImageUrl: string;
  isEmailVerified: boolean;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  error?: string;
  totalTournaments?: number;
  tournamentsWon?: number;
  winRate?: number;
  rank?: number;
}

export interface NotificationModel {
  notificationId: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
}

export interface ApiError {
  message: string;
  status: number;
}

export const userApi = {
  fetchProfile: async (): Promise<UserProfileModel> => {
    try {
      const response = await axiosInstance.get<UserProfileModel>(API_ENDPOINTS.USER.PROFILE);
      if (response.status >= 200 && response.status < 400) {
        localStorage.setItem("userId", response.data.userId);
        return response.data;
      } else {
        throw {
          message: response.data?.error || ERROR_MESSAGES.USER.PROFILE,
          status: response.status || STATUS_CODES.SERVER_ERROR
        } as ApiError;
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.PROFILE,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  fetchProfileById: async (userId: string): Promise<UserProfileModel> => {
    try {
      const response = await axiosInstance.get<UserProfileModel>(API_ENDPOINTS.USER.PROFILE_BY_ID.replace(':userId', userId));
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.PROFILE_BY_ID,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  updateProfile: async (data: UserProfileModel): Promise<{ url: string }> => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.USER.PROFILE_PICTURE.replace(':userId', data.userId),
        data
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.PROFILE_DETAILS,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  updateProfilePicture: async (userId: string, imageFile: File): Promise<{ url: string }> => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await axiosInstance.post(
        API_ENDPOINTS.USER.PROFILE_PICTURE.replace(':userId', userId),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.PROFILE_PICTURE,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  updateBannerImage: async (userId: string, imageFile: File): Promise<{ url: string }> => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await axiosInstance.post(
        API_ENDPOINTS.USER.PROFILE_BANNER.replace(':userId', userId),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.PROFILE_BANNER,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  followUser: async (userId: string, targetUserId: string): Promise<void> => {
    try {
      await axiosInstance.post(
        API_ENDPOINTS.USER.FOLLOW
          .replace(':userId', userId)
          .replace(':targetUserId', targetUserId)
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.FOLLOW,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  unfollowUser: async (userId: string, targetUserId: string): Promise<void> => {
    try {
      await axiosInstance.post(
        API_ENDPOINTS.USER.UNFOLLOW
          .replace(':userId', userId)
          .replace(':targetUserId', targetUserId)
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.UNFOLLOW,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  getFollowers: async (userId: string): Promise<UserProfileModel[]> => {
    try {
      const response = await axiosInstance.get<UserProfileModel[]>(
        API_ENDPOINTS.USER.FOLLOWERS.replace(':userId', userId)
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.FOLLOWERS,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  getFollowing: async (userId: string): Promise<UserProfileModel[]> => {
    try {
      const response = await axiosInstance.get<UserProfileModel[]>(
        API_ENDPOINTS.USER.FOLLOWING.replace(':userId', userId)
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.FOLLOWING,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  fetchNotifications: async (userId: string): Promise<NotificationModel[]> => {
    try {
      const response = await axiosInstance.get<NotificationModel[]>(
        API_ENDPOINTS.NOTIFICATION.FETCH.replace(':userId', userId)
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.NOTIFICATIONS,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  },

  markNotificationAsRead: async (userId: string, notificationId: string): Promise<void> => {
    try {
      await axiosInstance.post(
        API_ENDPOINTS.NOTIFICATION.MARK_AS_READ
          .replace(':userId', userId)
          .replace(':notificationId', notificationId)
      );
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw {
        message: axiosError.response?.data?.message || ERROR_MESSAGES.USER.MARK_AS_READ,
        status: axiosError.response?.status || STATUS_CODES.SERVER_ERROR
      } as ApiError;
    }
  }
}; 